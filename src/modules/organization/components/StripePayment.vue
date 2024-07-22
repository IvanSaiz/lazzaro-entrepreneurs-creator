<template lang="pug">
.payment-stripe
    header
      p {{ $t("organization.read.paymentGateway.configureStripePayment") }}
    lz-link-icon(
      iconName='helpIcon'
      :label="$t('organization.read.paymentGateway.stripe.sixStepsToConfigureStripe')"
      link="https://lazzaro.io/como-recibir-donaciones-a-traves-de-stripe-en-tan-solo-6-pasos/"
    )
    lz-button(type="primary" @click.prevent="connect") {{enabled ?  $t('organization.read.paymentGateway.stripe.edit') : $t('organization.read.paymentGateway.stripe.connect')}}
    .messages(v-if="enabled")
      p.success(v-if="connected") {{ $t("organization.read.paymentGateway.stripe.enabled") }}
      p.error(v-if="!detailsSubmitted") {{ $t('organization.read.paymentGateway.stripe.missingInfo') }}
      p.error(v-if="!chargesEnabled") {{ $t('organization.read.paymentGateway.stripe.chargesDisabled') }}
      p.error(v-if="!payoutsEnabled") {{ $t('organization.read.paymentGateway.stripe.payoutsDisabled') }}
      
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

    enabled = false;
    connected = false;
    type: "account_onboarding" | "account_update" = "account_onboarding";
    chargesEnabled = false;
    payoutsEnabled = false;
    detailsSubmitted = false;

    async connect() {
      const { url } = await apiWallet.stripe.getConnectLink(
        this.ongId,
        this.type
      );
      window.open(url, "_blank");
    }

    async mounted() {
      await this.refreshMemberData();

      const { enabled, ...rest } = await apiWallet.stripe.getAccountStatus(
        this.ongId
      );

      if (enabled) {
        this.enabled = true;
        this.chargesEnabled = rest.charges_enabled;
        this.payoutsEnabled = rest.payouts_enabled;
        this.detailsSubmitted = rest.details_submitted;
        this.connected = rest.requirements.errors.length === 0;
        // this.type = "account_update"; // Error: Standard accounts can only update their details
      }
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

    .messages {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      p.error {
        color: red;
      }
      p.success {
        color: green;
      }
    }
  }

  .payment-stripe header p {
    font-size: 1.2rem;
    font-weight: 500;
    text-align: center;
    margin-bottom: 20px;
  }
</style>
