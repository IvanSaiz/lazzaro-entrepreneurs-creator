<template lang="pug">
.organization-read__payment-gateway
  <div class="payment-cards">
  <payment-card-view v-for="card in paymentMethodsCards" :key="card.title" :title="card.title" :features="card.features" :odds="card.odds"/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import { namespace } from "vuex-class";
  import { apiWallet as wallet } from "../api";
  import PaymentCardView from "./PaymentCardView.vue";

  const auth = namespace("auth");

  @Component({
    components: { LzButton, PaymentCardView }
  })
  export default class PaymentGateway extends Vue {
    paymentMethodsCards = [
      {
        title: "stripe",
        features: [
          this.$t("organization.read.paymentCards.Stripe.features[0]"),
          this.$t("organization.read.paymentCards.Stripe.features[1]"),
          this.$t("organization.read.paymentCards.Stripe.features[2]"),
          this.$t("organization.read.paymentCards.Stripe.features[3]")
        ]
      }
    ];

    @auth.State("id")
    private memberId!: string;

    async changePaymentToStripe(clientId: string) {
      await wallet.stripeApi
        .updateClientId(this.memberId, clientId)
        .then(() => {
          this.$notify({
            type: "success",
            text: this.$tc("organization.read.paymentGateway.stripe.connected")
          });
        })
        .catch(() => {
          this.$notify({
            type: "error",
            text: this.$tc("organization.read.paymentGateway.stripe.error")
          });
        });
    }

    async mounted() {
      const clientId = ((this.$route.query.code || "") as string).trim();
      const isStripeConnected = !!clientId.length;

      if (isStripeConnected && this.memberId) {
        this.changePaymentToStripe(clientId);
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
