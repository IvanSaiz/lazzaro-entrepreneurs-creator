<template lang="pug">
div(v-if="loaded")
  .form__row
    formulate-form(:keep-model-data="true")
      formulate-input(
        type="radio"
        :options="subscriptionOptions"
        v-model="organizationPlan.payment_type"
        @input="loadSubscriptionPlans"
      )
  .form__row
    ul.organization-read__plans
      li.organization-read__plan(
        v-for="plan in subscriptionPlansList"
        :class="{ 'organization-read__plan--selected': isSelectedPlan(plan.id) }"
      )
        lz-box
          h2 {{ plan.name }}
          .organization-read__items
            p.organization-read__item(
              v-for="item in plan.description"
              :class="{ 'organization-read__item--disabled': !item.status }"
            )
              | {{ item.text }}
          lz-button.organization-read__btn(type="primary" @click="redirectToPlan(plan.url)")
            | {{ plan.priceText }}
            .organization-read__tax {{ $t('organization.read.subscriptionForm.tax' )}}
  .form__row(v-if="false")
    formulate-input(
      type="select"
      name="payMethod"
      :label="$t('organization.read.subscriptionForm.payMethod.label')"
      :options="payMethodOptions"
    )
    formulate-input(
      type="text"
      name="number"
      :label="$t('organization.read.subscriptionForm.cardNumber')"
    )
</template>

<script lang="ts">
  import LzBox from "@/components/Box.vue";
  import LzButton from "@/components/Button.vue";
  import LzLinkIcon from "@/components/LinkIcon.vue";
  import LzModal from "@/components/Modal.vue";
  import { Component, Vue } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import { apiOrganizations } from "../modules/organization/api";

  const auth = namespace("auth");
  const periods = ["monthly", "semiannual", "yearly"] as const;
  type Period = typeof periods[number];
  type Planes = Record<Period, SubscriptionPlan[]>;
  type SubscriptionPlansList = {
    id: string;
    name: SubscriptionPlan["name"];
    priceText: string;
    url: string;
    description: PlanDescription[];
  }[];

  type PlanDescription = {
    text: string;
    status: boolean;
  };

  type OrganizationPlan = {
    id: string;
    SubscriptionPlan: SubscriptionPlan;
    payment_type: Period;
  };

  @Component({
    components: { LzButton, LzModal, LzLinkIcon, LzBox }
  })
  export default class Subscription extends Vue {
    loaded = false;

    subscriptionOptions = {
      monthly: this.$t("organization.read.subscriptionForm.options.monthly"),
      semiannual: this.$t(
        "organization.read.subscriptionForm.options.semiannual"
      ),
      yearly: this.$t("organization.read.subscriptionForm.options.yearly")
    };

    subscriptionPlans = {} as Planes;

    subscriptionPlansList: SubscriptionPlansList = [];

    organizationPlan = {} as OrganizationPlan;

    @auth.State("id")
    public memberId?: string;

    @auth.State("currencySymbol")
    currencySymbol?: string;

    redirectToPlan(url: string) {
      if (url) {
        window.location.href = url;
      }
    }

    loadSubscriptionPlans(period: Period): void {
      const currency_text = this.$t("organization.read.priceText", {
        currency: this.currencySymbol ?? "€"
      });

      this.subscriptionPlansList = this.subscriptionPlans[period]
        ?.map(({ id, name, price, description, payment_url }) => {
          const formattedDescription = description
            .split(".")
            .reduce((acc, current) => {
              if (!current) return acc;

              const [text, status] = current.replace(/\\n/g, "").split(", ");
              return acc.concat({
                text: this.$t(`${text}`) as string,
                status: status === "true"
              });
            }, [] as PlanDescription[]);

          return {
            id,
            name: this.$t(
              `organization.read.planNames.${name}`
            ) as SubscriptionPlan["name"],
            priceText: `${price} ${currency_text}`,
            url: payment_url,
            description: formattedDescription
          };
        })
        .sort(a => {
          if (a.name.includes("Basic") || a.name.includes("Básico")) return -1;
          else return 0;
        }); // sort to make basic planes on the left side
    }

    isSelectedPlan(plan: string) {
      return plan === this.organizationPlan?.SubscriptionPlan?.id;
    }

    async getSubscriptionPlans() {
      const { data: plans } = await apiOrganizations.getSubscriptionPlans();

      this.subscriptionPlans = periods.reduce((acc, period) => {
        acc[period] = plans.filter(
          plan => plan.period === period // @todo - Quitar cuando el backend lo quite de la db
        );
        return acc;
      }, {} as Planes);
    }

    async getOrganizationPlan(): Promise<Period> {
      if (!this.memberId || this.$route.path === "/auth/onboarding")
        return "monthly";

      const {
        data: { id, payment_type, SubscriptionPlan }
      } = await apiOrganizations.getOrganizationPlan(this.memberId);

      this.organizationPlan.id = id;
      this.organizationPlan.SubscriptionPlan = SubscriptionPlan;
      this.organizationPlan.payment_type = payment_type ?? "monthly";

      return this.organizationPlan.payment_type;
    }

    async mounted() {
      try {
        await this.getSubscriptionPlans();
        const planPeriod = await this.getOrganizationPlan();

        this.loadSubscriptionPlans(planPeriod);
      } catch (error) {
        this.$notify({
          type: "error",
          text: this.$tc("common.error.generic")
        });
      } finally {
        this.loaded = true;
      }
    }
  }
</script>

<style lang="scss">
  .organization-read {
    &__btn {
      display: block;
      margin: 0 auto !important;
    }

    &__plans {
      display: flex;
      padding: 0;
      margin-bottom: 30px;
    }

    &__plan {
      flex: 1;
      padding: 0 10px;

      &--selected {
        .lz-box {
          border: 2px solid $color-green-01;
        }
      }
    }

    &__items {
      margin: 30px 0;
    }

    &__item {
      color: $color-black-01;
      font-family: Jost;
      font-size: 16px;
      line-height: 30px;

      &--disabled {
        color: $color-black-05;
        text-decoration: line-through;
      }
    }

    &__tax {
      color: $color-white;
      font-size: 10px;
    }
  }
</style>
