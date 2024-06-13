<template lang="pug">
.payment-stripe
    header
      p {{ $t("organization.read.paymentGateway.configureStripePayment") }}
    lz-link-icon(
      iconName='helpIcon'
      :label="$t('organization.read.paymentGateway.stripe.sixStepsToConfigureStripe')"
      link="https://lazzaro.io/en/como-recibir-donaciones-a-traves-de-stripe-en-6-pasos/"
    )
    lz-button(type="primary" @click.prevent="connect") {{stripeId ?  $t('organization.read.paymentGateway.stripe.edit') : $t('common.actions.connectToStripe.connect')}}
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import LzModal from "@/components/Modal.vue";
  import LzLinkIcon from "@/components/LinkIcon.vue";
  import { namespace } from "vuex-class";
  import { apiWallet } from "../api";
  const auth = namespace("auth");

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

    async connect() {
      const { url } = await apiWallet.stripe.getConnectLink(this.ongId);
      window.open(url, "_blank");
    }

    async mounted() {
      await this.refreshMemberData();
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
