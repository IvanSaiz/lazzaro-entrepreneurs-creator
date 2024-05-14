<template lang="pug">
div(v-if="loaded")
  .form__row
    ul.organization-read__plans
      li.organization-read__plan(
        v-for="plan in subscriptionPlans"
        :class="{ 'organization-read__plan--selected': isSelectedPlan(plan.id) }"
      )
        lz-box
          h2 {{ plan.name }}
          .organization-read__items
            p.organization-read__item(
              v-for="(active,description) in plan.description"
              :class="{ 'organization-read__item--disabled': !active }"
            )
              | {{ description }}
          lz-button.organization-read__btn(type="primary" @click="goToPayment(plan.payment_url)")
            | {{ plan.price }} {{ $t('organization.read.priceText', {currency: currencySymbol}) }}
            .organization-read__tax {{ $t('organization.read.subscriptionForm.tax' )}}
</template>

<script lang="ts">
  import LzBox from "@/components/Box.vue";
  import LzButton from "@/components/Button.vue";
  import LzLinkIcon from "@/components/LinkIcon.vue";
  import LzModal from "@/components/Modal.vue";
  import { Component, Vue } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import { apiOrganizations } from "../modules/organization/api";
  import { apiOngs } from "@/modules/user/api";

  const auth = namespace("auth");
  type OrganizationPlan = {
    id: string;
    SubscriptionPlan: SubscriptionPlan;
  };

  @Component({
    components: { LzButton, LzModal, LzLinkIcon, LzBox }
  })
  export default class Subscription extends Vue {
    loaded = false;

    subscriptionPlans: SubscriptionPlan[] = [];
    organizationPlan = {} as OrganizationPlan;

    @auth.State("id")
    public memberId?: string;

    member: Member;

    @auth.State("currencySymbol")
    currencySymbol?: string;

    redirectToPlan(url: string) {
      if (url) {
        window.location.href = url;
      }
    }

    isSelectedPlan(plan: string) {
      return plan === this.organizationPlan?.SubscriptionPlan?.id;
    }

    async getSubscriptionPlans() {
      await apiOrganizations
        .getSubscriptionPlans()
        .then(({ data: plans }) => {
          this.subscriptionPlans = plans;
        })
        .catch(() => {
          this.$notify({
            type: "error",
            text: this.$tc("common.error.subscription.plans")
          });
        });
    }

    async getOrganizationPlan() {
      if (!this.memberId || this.$route.path === "/auth/onboarding") return;

      await apiOrganizations
        .getOrganizationPlan(this.memberId)
        .then(({ data }) => {
          if (!data) return;

          const { id, SubscriptionPlan } = data;
          this.organizationPlan.id = id;
          this.organizationPlan.SubscriptionPlan = SubscriptionPlan;
        })
        .catch(() => {
          this.$notify({
            type: "error",
            text: this.$tc("common.error.generic")
          });
        });
    }

    async mounted() {
      try {
        await this.getSubscriptionPlans();
        await this.getOrganizationPlan();
        await apiOngs
          .getMember(this.memberId)
          .then(data => (this.member = data));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      } finally {
        this.loaded = true;
      }
    }

    goToPayment(url: string) {
      const params = new URLSearchParams({
        first_name: this.member.firstName,
        last_name: this.member.lastName,
        email: this.member.email,
        cf_memberid: this.memberId,
        company_name: this.member.companyName
      });

      window.location.href = `${url}?${params}`;
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
