<template lang="pug">
.payment-paypal
    header
      p {{ $t("organization.read.paymentGateway.configurePayment") }}

    formulate-form.payment-paypal__form(
      v-model="form"
      @submit="submitForm"
    )
      .form__column
        formulate-input(
          type="text"
          name="id"
          label="Paypal ID"
          :label-class="['required']"
          validation="required"
        )

        formulate-input(
          type="text"
          name="secret"
          label="Paypal Secret"
          :label-class="['required']"
          validation="required"
        )

    lz-link-icon(
      iconName='helpIcon'
      :label="$t('organization.read.paymentGateway.paypal.howToOpenAnAccount')"
      link="https://innovaslab.com/como-abrir-una-cuenta-de-paypal-si-eres-ong/"
    )

    lz-link-icon(
      iconName='helpIcon'
      :label="$t('organization.read.paymentGateway.paypal.howToGetPaypalCredentials')"
      link="https://innovaslab.com/como-obtener-el-id-de-cliente-y-la-clave-secreta-de-paypal/"
    )

    lz-button(type="primary" @click.prevent="submitForm") {{ !!(paypalClientId && paypalClientSecret) ? $t("common.actions.alreadyConnected") : $t("organization.read.paymentCards.button") }}
    lz-button(type="primary" @click.prevent="onSave" v-if="hideSaveBtn" style='margin-left:0;') {{ $t('common.actions.save') }}

</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import LzModal from "@/components/Modal.vue";
  import LzLinkIcon from "@/components/LinkIcon.vue";
  import { namespace } from "vuex-class";

  const auth = namespace("auth");

  @Component({
    components: { LzButton, LzModal, LzLinkIcon }
  })
  export default class PaymentPaypal extends Vue {
    form = {
      id: "",
      secret: ""
    };

    get hideSaveBtn(): boolean {
      return (
        !!this.paypalClientId &&
        !!this.paypalClientSecret &&
        this.paymentMethod !== "paypal"
      );
    }

    @Prop() paymentMethod!: PaymentMethod;

    @auth.State("id")
    public ongId!: string;

    @auth.State("paypalClientId")
    public paypalClientId?: string;

    @auth.State("ongConfiguration")
    public ongConfiguration!: any;

    @auth.State("paypalClientSecret")
    public paypalClientSecret?: string;

    @auth.Mutation
    public setPaypalConfig!: (payload: Record<"id" | "secret", string>) => void;

    async submitForm() {
      try {
        // await apiWallet.paypalApi.postConfig(
        //   this.ongId,
        //   this.form.id,
        //   this.form.secret
        // );
        this.setPaypalConfig({ id: this.form.id, secret: this.form.secret });

        // await apiOngs.postPlatformConfig(this.ongId, {
        //   ...this.ongConfiguration,
        //   payment_method: "paypal"
        // });

        this.$store.commit("auth/setOngConfig", { payment_method: "paypal" });

        this.$notify({
          type: "success",
          text: this.$tc("common.notifications.changeSuccess")
        });
      } catch (error) {
        this.$notify({
          type: "error",
          text: this.$tc("common.error.generic")
        });
      }
    }

    onSave() {
      this.$emit("paymentMethodChange", "paypal");
    }
    async mounted() {
      this.form.id = this.paypalClientId || "";
      this.form.secret = this.paypalClientSecret || "";
    }
  }
</script>

<style scoped>
  .payment-paypal {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    padding-inline: 3rem;
    font-size: 1.2rem;
  }
  .payment-paypal p {
    font-size: 1rem;
    text-align: center;
  }
  .form__column {
    width: 100%;
  }

  .formulate-input {
    margin-top: 1.2rem;
  }
</style>
