<template>
  <div
    class="payment-gateway-card"
    :class="title === paymentMethod && 'selected-payment-method'"
  >
    <div class="payment-gateway-card__header">
      <h2>{{ capitalizedTitle }}</h2>
    </div>
    <div class="payment-gateway-card__body">
      <p
        class="payment-gateway-card__line"
        v-for="feature in features"
        :key="feature"
      >
        <span>
          <img
            src="../../../../public/assets/images/check.svg"
            alt="true icon"
            loading="lazy"
          />
        </span>
        {{ feature }}
      </p>
      <p class="payment-gateway-card__line" v-for="odd in odds" :key="odd">
        <span>
          <img
            src="../../../../public/assets/images/x.svg"
            alt="false icon"
            loading="lazy"
          />
        </span>
        {{ odd }}
      </p>
    </div>

    <component
      :is="paymentComponents[title]"
      @paymentMethodChange="changePaymentMethod"
      :paymentMethod="paymentMethod"
    />
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import StripePayment from "../components/StripePayment.vue";
  import PaymentPaypal from "../components/PaymentPaypal.vue";
  import MolliePayment from "../components/MolliePayment.vue";
  import { namespace } from "vuex-class";

  const auth = namespace("auth");

  @Component({
    components: {
      StripePayment,
      PaymentPaypal,
      MolliePayment
    }
  })
  export default class PaymentCardView extends Vue {
    public paymentComponents = {
      stripe: StripePayment,
      paypal: PaymentPaypal,
      mollie: MolliePayment
    };

    @auth.State("id")
    public ongId!: string;

    @Prop() title!: string;
    @Prop() features!: string[];
    @Prop() odds!: string[];
    @Prop() paymentMethod!: PaymentMethod;

    get capitalizedTitle() {
      if (this.title) {
        return this.title.charAt(0).toUpperCase() + this.title.slice(1);
      }
      return "";
    }

    async changePaymentMethod(paymentMethod: PaymentMethod) {
      this.$emit("save", paymentMethod);
    }

    mounted() {
      this.$forceUpdate();
    }
  }
</script>

<style lang="scss">
  .payment-gateway-card {
    background-color: #fff;
    max-width: 390px;
    border-radius: 15px;
    padding-block: 40px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex: 1;

    button {
      background-color: #0093a7;
      color: white;
      border: none;
      border-radius: 12px;
      padding: 10px 20px;
      font-size: 1.2rem;
      width: 75%;
      align-self: center;
      cursor: pointer;
      margin-left: 0 !important;
    }
    button:hover {
      filter: brightness(1.2);
      transition: all 0.2s ease-in-out;
    }
  }

  .selected-payment-method {
    border: 1px solid #0093a7;
  }
  .payment-gateway-card__header {
    width: 100%;
    padding-left: 10%;
  }

  .payment-gateway-card__body {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-left: 10%;
    margin-top: 1.8rem;
    gap: 2.4rem;
    min-height: 240px;
  }
  .payment-gateway-card__header h2 {
    font-size: 2rem;
  }
  .payment-gateway-card__line {
    color: #000;
    display: flex;
    align-items: center;
    gap: 1.2rem;
    width: 80%;
    line-height: 1.2rem;
  }
  .payment-gateway-card__line span {
    font-size: 1.6rem;
    font-weight: bolder;
    color: #ff5f6d;
  }
  .payment-gateway-card__footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .payment-gateway-card__button {
    color: white;
    border: none;
    border-radius: 12px;
    padding: 10px 20px;
    font-size: 1.2rem;
    width: 50%;
    cursor: pointer;
  }

  .payment-gateway-card__button:hover {
    filter: brightness(1.2);
    transition: all 0.2s ease-in-out;
  }
</style>
