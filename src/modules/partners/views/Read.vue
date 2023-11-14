<template lang="pug">
.partners-read
    header
      h1 {{ $t('partners.read.title') }}
      p {{ $t('partners.read.subtitle') }}

    .partners-read__stepper
      lz-stepper(
        :steps="['partners', 'types']"
        :active="active"
        @click="(step) => { this.active = step; }"
      )
        template(#default="{ step }") {{ $t('partners.read.steps.' + step) }}

    transition(name="fade" mode="out-in")
      section.partners-read__partners(v-if="active === 'partners'")
        lz-table(title="" :fields="partnersFields" :items="partners")
          template(#name="{ row: { name }}") {{ name }}
          template(#email="{ row: { email }}") {{ email }}
          template(#amount="{ row: { amount }}") {{ amount }}
          template(#status="{ row: { status }}") {{ status }}
          template(#date="{ row: { date }}") {{ date }}
          template(#actions="{ row }")
            eye-icon(@click="viewEntry(row)")

      section.partners-read__types(v-else-if="active === 'types'")
        lz-confirm(
          v-if="showDeleteModal"
          @close='cancelDeleteType'
          @confirm='deleteType(typeToDelete)'
        )
        .form__row.form__row--flex-end
          formulate-input(
            type="text"
            :label="$t('partners.read.form.category')"
            :label-class="['required']"
            validation="required"
            :validation-name="$t('partners.read.form.category')"
            v-model="types.nameQuery"
          )
          formulate-input(
            type="select"
            v-model="types.typeQuery"
            :options="billingPeriods"
            :label="$t('partners.read.form.partnerType.label')"

          )
          formulate-input(
            type="text"
            :label="$t('partners.read.form.partnerType.annualAmount')"
            :label-class="['required']"
            v-model="types.amountQuery"
            validation="required|number"
            :validation-name="$t('partners.read.form.partnerType.annualAmount')"
          )
          lz-button.lz-button--form-inline(type="primary" @click="onCreate") {{ $t('common.actions.create') }}

        lz-table.partners-read__types-table(
          v-if="donationOptions.length > 0"
          :title="$t('partners.read.donations.title')"
          :fields="donationsFields"
          :items="donationOptions"
        )
          template(#name="{ row: { name } }") {{ name }}
          template(#period="{ row: { period } }") {{ period }}
          template(#price="{ row: { price } }") {{ price }}
          template(#actions="{ row }")
            trash-icon(@click="confirmDeleteType(row)")

          //XIcon(@click="removeDonationOption(row)")

</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import LzTable from "@/components/Table.vue";
  import LzStepper from "@/components/Stepper.vue";
  import LzConfirm from "@/components/Confirm.vue";
  import { namespace } from "vuex-class";
  import { apiPartners } from "../api";

  const auth = namespace("auth");
  type DeleteType = { id: string; stripePlanId: string | null };

  @Component({ components: { LzButton, LzTable, LzStepper, LzConfirm } })
  export default class Read extends Vue {
    showDeleteModal = false;
    typeToDelete: DeleteType = { id: "", stripePlanId: null };
    active = "partners";
    types: {
      nameQuery: string;
      typeQuery: "1 month" | "12 months";
      amountQuery: number;
    } = {
      nameQuery: "",
      typeQuery: "1 month",
      amountQuery: 0
    };

    billingPeriods = [
      {
        label: this.$t("partners.read.form.partnerType.period.oneMonth"),
        value: "1 month"
      },
      {
        label: this.$t("partners.read.form.partnerType.period.oneYear"),
        value: "12 months"
      }
    ];

    @auth.State("id")
    public ongId!: string;

    partnersFields = Array.from(
      ["name", "email", "amount", "status", "date", "actions"],
      columnName => ({
        id: columnName,
        label: this.$t(`partners.read.partnersFields.form.${columnName}`)
      })
    );

    partnerTypeOptions = {
      partner: this.$t("partners.read.form.partnerType.options.partner")
    };

    partners: {
      id: string;
      name: string;
      email: string;
      amount: string;
      date: string;
      status: string;
    }[] = [];

    donationOptions: {
      name: string;
      id: string;
      price: number;
      period: string;
      stripePlanId: string | null;
    }[] = [];

    donationsFields = [
      {
        id: "name",
        label: this.$t("partners.read.donations.form.name")
      },
      {
        id: "period",
        label: this.$t("partners.read.donations.form.period")
      },
      {
        id: "price",
        label: this.$t("partners.read.donations.form.price")
      },
      {
        id: "actions",
        label: this.$t("partners.read.donations.form.actions")
      }
    ];

    mounted() {
      Promise.allSettled([this.getPartners(), this.getDonationOptions()]);
    }

    async getPartners() {
      const { data: partners } = await apiPartners.getPartners(this.ongId);

      this.partners = partners.map(({ id, User, amount, createdAt }) => ({
        id,
        name: `${User.firstName} ${User.lastName}`,
        email: User.email,
        amount: `${amount}€`,
        date: this.formatDate(createdAt),
        status: this.$t("partners.read.donations.status") as string
      }));
    }

    async getDonationOptions() {
      const { data: donationOptions } = await apiPartners.getDonationOptions(
        this.ongId
      );

      this.donationOptions = [];

      for (const {
        name,
        id,
        amount,
        type,
        stripe_plan_id
      } of donationOptions) {
        if (name === "other") {
          continue;
        }

        this.donationOptions.push({
          id,
          price: amount,
          period:
            type === "1 month"
              ? this.$tc("partners.read.form.partnerType.period.oneMonth")
              : this.$tc("partners.read.form.partnerType.period.oneYear"),
          name,
          stripePlanId: stripe_plan_id
        });
      }
    }

    formatDate(date: string): string {
      const newDate = new Date(date);
      return `${newDate.getUTCDate()}/${newDate.getUTCMonth() +
        1}/${newDate.getFullYear()}`;
    }

    viewEntry(row: { id: string }) {
      this.$router.push({
        name: "partnerDetail",
        params: { subscriptionId: row.id }
      });
    }

    confirmDeleteType({ id, stripePlanId }: DeleteType) {
      this.typeToDelete = { id, stripePlanId };
      this.showDeleteModal = true;
    }

    cancelDeleteType() {
      this.typeToDelete = { id: "", stripePlanId: null };
      this.showDeleteModal = false;
    }

    async deleteType({ id, stripePlanId }: DeleteType): Promise<void> {
      try {
        await apiPartners.deleteDonationOption(this.ongId, id, stripePlanId);
        this.getDonationOptions();
        this.$notify({
          type: "success",
          text: this.$tc("partners.read.notifications.deleteDonation")
        });
      } catch (error) {
        this.$notify({
          type: "error",
          text: this.$tc("common.error.generic")
        });
      } finally {
        this.showDeleteModal = false;
      }
    }

    async onSubmit(payload: TPayload): Promise<void> {
      try {
        await apiPartners.postDonationOption(this.ongId, payload);

        this.$notify({
          type: "success",
          text: this.$tc("partners.read.notifications.createDonation")
        });
        this.getDonationOptions();
      } catch (error) {
        this.$notify({
          type: "error",
          text: this.$tc("common.error.generic")
        });
      }
    }

    onCreate() {
      const payload: TPayload = {
        type: this.types.typeQuery,
        name: this.types.nameQuery,
        amount: this.types.amountQuery
      };

      this.onSubmit(payload);
    }
  }
</script>

<style lang="scss">
  .partners-read {
    .lz-table {
      &__th--actions {
        display: flex;
        justify-content: space-around;
        text-align: center;

        svg:hover {
          cursor: pointer;
          stroke: $color-black-01;
        }
      }
    }

    &__table-actions {
      display: flex;
      justify-content: flex-end;
      margin: 20px 0;

      .formulate-input {
        margin-right: 20px;
      }
    }

    &__create-btn {
      text-align: right;
    }

    &__stepper {
      margin: 40px 0;
    }

    &__types-table {
      margin: 40px 0;
    }
  }
</style>
