<template lang="pug">
  .partner
    lz-confirm(
      v-if="showDeleteModal"
      @close='showDeleteModal = false'
      @confirm='deletePartner'
    )

    header
      h1 {{ $t('partners.detail.title') }}
      p {{ $t('partners.detail.subtitle') }}

    section.partner__content
      formulate-form.partner__form(
        v-model="partnerForm"
        @submit="onSave"
        :keep-model-data="true"
      )

        .form__row
          formulate-input(
            type="text"
            name="name"
            :label="$t('partners.detail.form.name')"
            :label-class="['required']"
            validation="required"
          )
          formulate-input(
            type="text"
            name="surname"
            :label="$t('partners.detail.form.surname')"
            :label-class="['required']"
            validation="required"
          )
        .form__row
          formulate-input(
            type="text"
            name="mail"
            :label="$t('partners.detail.form.email')"
            :label-class="['required']"
            validation="required|email"
          )
          formulate-input(
            type="text"
            name="phone"
            :label="$t('partners.detail.form.phone.label')"
            :label-class="['required']"
            validation="required|matches:/^[679]{1}[0-9]{8}$/"
            :validation-messages="{ matches: this.$t('partners.detail.form.phone.message') }"
          )
        .form__row
          formulate-input(
            type="text"
            name="address"
            :label="$t('partners.detail.form.address')"
            :label-class="['required']"
            validation="required"
          )
          formulate-input(
            type="text"
            name="dni"
            :label="$t('partners.detail.form.dni')"
          )
        .form__row
          formulate-input(
            type="text"
            name="birthDay"
            :label="$t('partners.detail.form.birthDay')"
          )
          formulate-input(
            type="text"
            name="date"
            :label="$t('partners.detail.form.date')"
            :label-class="['required']"
            validation="required"
          )
        .form__row
          formulate-input(
            type="select"
            name="status"
            :label="$t('partners.detail.form.status.label')"
            :options="statusOptions"
          )
          formulate-input(
            type="text"
            name="amount"
            :label="$t('partners.detail.form.amount')"
            :label-class="['required']"
            validation="required"
          )
        .form__row
          formulate-input(
            type="text"
            name="comunications"
            :label="$t('partners.detail.form.comunications')"
            :label-class="['required']"
            validation="required"
          )

        .partner__actions
          lz-button(type="tertiary" @click.prevent="confirmDeletePartner") {{$t('common.actions.delete')}}
          lz-button(type="secondary" @click.prevent="onCancel") {{ $t('common.actions.back') }}
          //- lz-button(type="primary" @click="onSave") {{ $t('common.actions.save') }}
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import LzTable from "@/components/Table.vue";
  import LzConfirm from "@/components/Confirm.vue";
  import { namespace } from "vuex-class";
  import { apiPartners } from "../api";

  const auth = namespace("auth");

  @Component({ components: { LzButton, LzTable, LzConfirm } })
  export default class ShopCreate extends Vue {
    productId: string | null = null;
    showDeleteModal = false;

    partnerForm = {
      name: "",
      birthDay: "",
      surname: "",
      mail: "",
      dni: "",
      phone: "",
      address: "",
      status: "",
      date: "",
      amount: 0,
      comunications: ""
    };

    statusOptions = {
      active: this.$t("partners.detail.form.status.options.active"),
      inactive: this.$t("partners.detail.form.status.options.inactive")
    };

    @auth.State("id")
    public ongId!: string;

    @Prop({ required: true })
    protected subscriptionId!: string;

    mounted() {
      if (this.subscriptionId) {
        apiPartners.getPartner(this.subscriptionId).then(({ data }) => {
          this.partnerForm.name = data.User.firstName;
          this.partnerForm.birthDay = data.User.birthDay;
          this.partnerForm.surname = data.User.lastName;
          this.partnerForm.mail = data.User.email;
          this.partnerForm.dni = data.User.nif;
          this.partnerForm.phone = data.User.mobilePhone;
          this.partnerForm.address = data.User.home_address;
          this.partnerForm.date = data.createdAt;
          this.partnerForm.amount = data.amount;
          this.partnerForm.comunications = data.comunications
            ? this.$t("partners.detail.yes").toString()
            : this.$t("partners.detail.no").toString();
          this.partnerForm.status = data.status
            ? data.status
            : this.$tc("partners.detail.form.status.options.active");
        });
      }
    }

    confirmDeletePartner() {
      this.showDeleteModal = true;
    }

    deletePartner() {
      apiPartners
        .deletePartner(this.ongId, this.subscriptionId)
        .then(() => {
          this.$notify({
            type: "success",
            text: this.$tc("partners.detail.notifications.projectRemoved")
          });
          this.$router.push({ name: "partnersRead" });
        })
        .catch(() => {
          this.$notify({
            type: "error",
            text: this.$tc("common.error.generic")
          });
          this.showDeleteModal = false;
        });
    }

    onCancel() {
      this.$router.push({ name: "partnersRead" });
    }
  }
</script>

<style lang="scss">
  .partner {
    font-size: 1rem;

    &__form {
      margin-top: 40px;
    }

    &__actions {
      text-align: right;
      margin-top: 100px;
      width: 100%;
    }

    &__image {
      max-width: 160px;
      margin-bottom: 20px;
    }
  }
</style>
