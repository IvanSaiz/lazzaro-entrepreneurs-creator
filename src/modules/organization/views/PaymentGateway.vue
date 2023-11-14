<template lang="pug">
.organization-read__payment-gateway
  <div class="payment-cards">
  <payment-card-view v-for="card in paymentMethodsCards" :key="card.title" :title="card.title" :features="card.features" :odds="card.odds" @save="onSave" :paymentMethod="ongConfiguration.payment_method"/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import { namespace } from "vuex-class";
  import { apiOngs } from "@/modules/web/api";
  import { apiWallet } from "../api";
  import PaymentCardView from "./PaymentCardView.vue";

  const auth = namespace("auth");

  @Component({
    components: { LzButton, PaymentCardView }
  })
  export default class PaymentGateway extends Vue {
    paymentMethodsCards = [
      {
        title: "paypal",
        features: [
          this.$t("organization.read.paymentCards.Paypal.features[0]"),
          this.$t("organization.read.paymentCards.Paypal.features[1]")
        ],
        odds: [
          this.$t("organization.read.paymentCards.Paypal.odds[0]"),
          this.$t("organization.read.paymentCards.Paypal.odds[1]"),
          this.$t("organization.read.paymentCards.Paypal.odds[2]")
        ]
      },
      {
        title: "stripe",
        features: [
          this.$t("organization.read.paymentCards.Stripe.features[0]"),
          this.$t("organization.read.paymentCards.Stripe.features[1]"),
          this.$t("organization.read.paymentCards.Stripe.features[2]"),
          this.$t("organization.read.paymentCards.Stripe.features[3]")
        ]
      },
      {
        title: "mollie",
        features: [
          this.$t("organization.read.paymentCards.Mollie.features[0]"),
          this.$t("organization.read.paymentCards.Mollie.features[1]"),
          this.$t("organization.read.paymentCards.Mollie.features[2]"),
          this.$t("organization.read.paymentCards.Mollie.features[3]")
        ],
        odds: []
      }
    ];

    @auth.State("id")
    public ongId!: string;

    @auth.State("ongConfiguration")
    public ongConfiguration!: any;

    @auth.State("walletId")
    public walletId!: string;

    async onSave(paymentMethod: PaymentMethod) {
      try {
        this.$notify({
          type: "success",
          text: this.$tc("common.notifications.changeSuccess")
        });

        await apiOngs.postPlatformConfig(this.ongId, {
          ...this.ongConfiguration,
          payment_method: paymentMethod
        });

        this.$store.commit("auth/setOngConfig", {
          payment_method: paymentMethod
        });

        this.$forceUpdate();
      } catch (error) {
        this.$notify({
          type: "error",
          text: this.$tc("common.error.generic")
        });
      }
    }

    async changePaymentToStripe(stripeAuthCode: string) {
      await apiWallet.stripeApi.postConfig(this.ongId, stripeAuthCode);

      await apiOngs.postPlatformConfig(this.ongId, {
        ...this.ongConfiguration,
        payment_method: "stripe"
      });
    }

    async mounted() {
      const stripeAuthCode = ((this.$route.query.code || "") as string).trim();
      const isStripeConnected = !!stripeAuthCode.length;
      if (this.$route.query.code && this.$route.query.state) return; // this for mollie connect
      if (!isStripeConnected) return;

      try {
        this.changePaymentToStripe(stripeAuthCode);
        this.$store.commit("auth/setOngConfig", {
          payment_method: "stripe"
        });
        this.$store.commit("auth/setData", { stripeId: stripeAuthCode });
      } catch (error) {
        this.$notify({
          type: "error",
          text: this.$tc("common.error.generic")
        });
      }
    }
  }
</script>

<style lang="scss">
  .payment-cards {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    gap: 2.4rem;
  }
  .payment-gateway {
    margin-top: 36px;

    &--inactive {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__apologies {
      font-size: 16px;
      margin: 16px 0;
      text-align: center;
    }

    &__active-btn {
      margin: 0 auto;
    }
  }

  .selectPaymentInput {
    margin-top: 36px;
    width: 50%;
  }
</style>
