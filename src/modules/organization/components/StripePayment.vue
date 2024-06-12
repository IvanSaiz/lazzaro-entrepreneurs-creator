<template lang="pug">
.payment-stripe
    header
      p {{ $t("organization.read.paymentGateway.configureStripePayment") }}

    formulate-form.payment-stripe__form(@submit="onSave")

    lz-link-icon(
      iconName='helpIcon'
      :label="$t('organization.read.paymentGateway.stripe.sixStepsToConfigureStripe')"
      link="https://lazzaro.io/en/como-recibir-donaciones-a-traves-de-stripe-en-6-pasos/"
    )
    lz-button(type="primary" @click.prevent="connectToStripe" :disabled="connectedToStripe") {{stripeId ?  $t('common.actions.alreadyConnected') : $t('common.actions.connectToStripe')}}
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import LzModal from "@/components/Modal.vue";
  import LzLinkIcon from "@/components/LinkIcon.vue";
  import { namespace } from "vuex-class";
  import { apiWallet } from "../api";
  const auth = namespace("auth");

  const STRIPE_CLIENT_ID = process.env.VUE_APP_STRIPE_CLIENT_ID;

  @Component({
    components: { LzButton, LzModal, LzLinkIcon }
  })
  export default class StripePayment extends Vue {
    @auth.State("id")
    public ongId!: string;

    @Prop() paymentMethod!: PaymentMethod;

    @auth.State("stripe_account_id")
    public readonly stripeId!: string;

    @auth.Action("refreshMemberData")
    public refreshMemberData!: () => Promise<void>;

    @auth.Mutation("setData")
    public setData!: (data: unknown) => void;

    get connectedToStripe() {
      return !!this.stripeId || this.$route.params.code;
    }

    async connectToStripe() {
      const { url } = await apiWallet.stripeApi.createConnectLink(this.ongId);
      window.open(url, "_blank");
    }

    get hideSaveBtn(): boolean {
      return !!this.stripeId && this.paymentMethod !== "stripe";
    }

    async mounted() {
      if (this.$route.params.code) {
        this.setData({ stripe_client_id: this.$route.params.code });
      }
      await this.refreshMemberData();
    }

    onSave() {
      this.$emit("paymentMethodChange", "stripe");
    }
  }
</script>

<style scoped>
  .payment-stripe {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding-inline: 3rem;
  }

  .payment-stripe header p {
    font-size: 1.2rem;
    font-weight: 500;
    text-align: center;
    margin-bottom: 20px;
  }
</style>
