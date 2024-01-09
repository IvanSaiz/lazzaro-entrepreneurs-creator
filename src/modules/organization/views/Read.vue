<template lang="pug">
  .organization-read(v-if="loaded")
    lz-modal(v-if="showBlockedModal" @close="showBlockedModal = false")
      .organization-read__modal
        h3 {{ $t('organization.read.blockAdvise') }}
        lz-button(@click="showBlockedModal = false") {{ $t('common.actions.close') }}

    header
      h1 {{ $t('organization.read.title') }}
      p {{ $t('organization.read.subtitle') }}

    .organization-read__stepper
      lz-stepper(
        :steps="['general', 'paymentGateway', 'subscription']"
        :active="active"
        @click="(step) => { if (!this.blockedBySubscriptionPlan) { this.active = step; }}"
      )
        template(#default="{ step }") {{ $t('organization.read.steps.' + step) }}

    transition(name="fade" mode="out-in")
      section.organization-read__general(v-if="active === 'general'")
        formulate-form(
          v-model="generalForm"
          @submit="membereneralSubmit"
          :keep-model-data="true"
        )
        .form__row
          formulate-input(
            type="text"
            name="name"
            :label="$t('organization.read.generalForm.name')"
            v-model="generalForm.name"
          )
          formulate-input(
            type="text"
            name="NIF"
            :label="$t('organization.read.generalForm.nif')"
            v-model="generalForm.nif"
          )
        .form__row
          formulate-input(
            type="text"
            name="phone"
            :label="$t('organization.read.generalForm.phone')"
            v-model="generalForm.mobilePhone"
          )
          formulate-input(
            type="select"
            name="currency"
            :options="currencyOptions"
            :label="$t('organization.read.generalForm.currency')"
            v-model="generalForm.currency"
          )
          div

        .organization-read__actions
          lz-button(type="secondary" @click="() => { this.$router.push({ name: 'Home' }) }" ) {{ $t('common.actions.cancel') }}
          lz-button(type="primary" @click="membereneralSubmit") {{ $t('common.actions.save') }}

      section.organization-read__payment-gateway(v-if="active === 'paymentGateway'")
        lz-payment-gateway

      section.organization-read__account(v-else-if="active === 'subscription'")
        p.organization-read__help {{ $t('organization.read.subscriptionForm.description') }}
          lz-subscription(:member-id="memberId" :currency-symbol="generalForm.currencySymbol")
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import LzBox from "@/components/Box.vue";
  import LzModal from "@/components/Modal.vue";
  import LzStepper from "@/components/Stepper.vue";
  import LzSubscription from "@/components/Subscription.vue";
  import { namespace } from "vuex-class";
  import { apiOrganizations } from "../api";
  import LzPaymentGateway from "./PaymentGateway.vue";

  const store = namespace("organization");
  const auth = namespace("auth");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  declare const ZFWidget: any;

  Component.registerHooks(["beforeRouteLeave"]);

  @Component({
    components: {
      LzButton,
      LzStepper,
      LzBox,
      LzPaymentGateway,
      LzModal,
      LzSubscription
    }
  })
  export default class Read extends Vue {
    @store.Action
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public updatePlan!: (planId: string) => void;

    loaded = false;

    @auth.State("id")
    public memberId!: string;

    @auth.State("blockedBySubscriptionPlan")
    public blockedBySubscriptionPlan!: boolean;

    @store.State("planId")
    public planId!: string;

    @Prop({ default: "general" })
    step!: string;

    active = window.location.search.trim() ? "paymentGateway" : this.step;
    showBlockedModal = false;

    categoryOptions = {
      children: this.$t(
        "organization.read.generalForm.sector.options.children"
      ),
      education: this.$t(
        "organization.read.generalForm.sector.options.education"
      ),
      health: this.$t("organization.read.generalForm.sector.options.health"),
      animals: this.$t("organization.read.generalForm.sector.options.animals"),
      environment: this.$t(
        "organization.read.generalForm.sector.options.environment"
      ),
      naturalDisaster: this.$t(
        "organization.read.generalForm.sector.options.naturalDisaster"
      ),
      economicDev: this.$t(
        "organization.read.generalForm.sector.options.economicDev"
      ),
      other: this.$t("organization.read.generalForm.sector.options.other")
    };

    typeOptions = {
      member: this.$t("organization.read.generalForm.orgType.options.member"),
      fundation: this.$t(
        "organization.read.generalForm.orgType.options.foundation"
      ),
      company: this.$t("organization.read.generalForm.orgType.options.company"),
      other: this.$t("organization.read.generalForm.orgType.options.other")
    };

    payMethodOptions = {
      card: this.$t("organization.read.subscriptionForm.payMethod.options.card")
    };

    // generalForm
    generalForm = {
      name: "",
      nif: "",
      mobilePhone: "",
      address: "",
      type: "",
      ambit: "",
      currency: "EUR",
      currency_symbol: "€"
    };

    // organization
    organizationPlan = {
      id: "",
      PlatformSubscription: "",
      payment_type: ""
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    // suscription
    suscriptionForm = {
      payMethod: "",
      number: ""
    };

    SYMBOLS_CURRENCY: object = { EUR: "€", USD: "$" };
    currencyOptions: object = { EUR: "EUR", USD: "USD" };

    async mounted() {
      const { payment, planId } = this.$route.query;
      if (typeof payment === "string" && typeof planId === "string") {
        const sanitizedPlanId = planId.split(":")[1].trim();
        await this.onSubscriptionSubmit(sanitizedPlanId);
        this.active = "subscription";
      }

      await Promise.all([
        apiOrganizations.getOrganization(this.memberId).then(response => {
          const member = response;
          this.generalForm.name = member.companyName;
          this.generalForm.nif = member.cif;
          this.generalForm.mobilePhone = member.mobilePhone;
          this.generalForm.type = member.type;
          this.generalForm.ambit = member.ambit;
          this.generalForm.address = member.address;
        }),

        apiOrganizations.getOrganizationPlan(this.memberId).then(({ data }) => {
          this.organizationPlan.id = data?.id;
          this.organizationPlan.PlatformSubscription =
            data?.PlatformSubscription;
          this.organizationPlan.payment_type = data?.payment_type;
        })

        // apiOrganizations.getPlatformConfig(this.memberId).then(({ data }) => {
        //   this.generalForm.currency = data.platformConfig.currency;
        //   this.generalForm.currency_symbol =
        //     data.platformConfig.currency_symbol;
        // })
      ]);

      this.loaded = true;
    }

    getSymbolCurrency(value: string): string {
      if (!value) {
        return "€";
      }

      return this.SYMBOLS_CURRENCY[value];
    }

    async membereneralSubmit() {
      this.generalForm.currency_symbol = this.getSymbolCurrency(
        this.generalForm.currency
      );
      apiOrganizations
        .putOrganization(this.memberId, this.generalForm)
        .then(this.showSuccessNotification)
        .catch(this.showErrorNotification);

      apiOrganizations
        .postCurrencyUpdate(this.memberId, {
          currency: this.generalForm.currency,
          currency_symbol: this.generalForm.currency_symbol
        })
        .then(() => {
          this.showSuccessNotification();
        })
        .catch(this.showErrorNotification);

      return;
    }

    onSubscriptionSubmit(planId: string) {
      return apiOrganizations
        .postOrganizationPlan(this.memberId, {
          platform_subscription_id: planId
          //payment_type: this.organizationPlan.payment_type // todo ?
        })
        .then(this.showSuccessNotification)
        .catch(this.showErrorNotification);
    }

    showSuccessNotification() {
      this.$notify({
        type: "success",
        text: this.$tc("common.notifications.changeSuccess")
      });
    }
    showErrorNotification() {
      this.$notify({
        type: "error",
        text: this.$tc("common.error.generic")
      });
    }

    setSelectedPlan(plan: string) {
      this.organizationPlan.PlatformSubscription.id = plan;
      this.updatePlan(plan);
    }
    setPaymentType(type: string) {
      this.organizationPlan.payment_type = type;
    }

    beforeRouteLeave(_to: any, _from: any, next: any) {
      if (this.blockedBySubscriptionPlan) {
        return false;
      }
      next();
    }

    @Watch("blockedBySubscriptionPlan", { immediate: true })
    onBlockedBySubscriptionPlanChanged(newVal: boolean) {
      if (newVal) {
        this.showBlockedModal = true;
        this.active = "subscription";
      }
    }
  }
</script>

<style lang="scss">
  .organization-read {
    &__modal {
      margin: 20px 0 0 0;
      text-align: center;
    }

    &__stepper {
      margin: 40px 0;
    }

    &__actions {
      text-align: right;
      margin-top: 40px;
    }

    &__help {
      color: $color-black-03;
      font-size: 16px;
      margin-bottom: 30px;
    }
  }
</style>
