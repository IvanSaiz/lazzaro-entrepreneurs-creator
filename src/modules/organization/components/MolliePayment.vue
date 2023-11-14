<template>
  <div class="mollie-payment">
    <formulate-form
      class="mollie-payment__form"
      v-model="form"
      @submit="connectToMollie"
    >
      <div class="form__column">
        <formulate-input
          name="orgApiKey"
          label="API Key"
          :label-class="['required']"
          validation="required"
        >
        </formulate-input>
      </div>

      <lz-link-icon
        iconName="helpIcon"
        :label="
          $t('organization.read.paymentGateway.mollie.howToCreateAnAccount')
        "
        link="https://my.mollie.com/dashboard/signup?lang=en"
      >
      </lz-link-icon>

      <lz-link-icon
        iconName="helpIcon"
        :label="$t('organization.read.paymentGateway.mollie.howToGetApiKey')"
        link="https://docs.mollie.com/overview/authentication"
      >
      </lz-link-icon>

      <div class="payment-gateway-card__footer">
        <lz-button class="payment-gateway-card__button" type="submit">
          {{
            mollieOrgApiKey
              ? $t("common.actions.alreadyConnected")
              : $t("organization.read.paymentCards.button")
          }}
        </lz-button>

        <lz-button
          class="payment-gateway-card__button"
          @click.prevent="onSave"
          v-if="hideSaveBtn"
          style="margin-left: 0;"
        >
          {{ $t("common.actions.save") }}
        </lz-button>
      </div>
    </formulate-form>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import LzLinkIcon from "@/components/LinkIcon.vue";
  import { apiWallet } from "../api";

  import LzButton from "@/components/Button.vue";

  const auth = namespace("auth");

  @Component({
    components: { LzButton, LzLinkIcon }
  })
  export default class MolliePayment extends Vue {
    form = {
      orgApiKey: ""
    };

    @auth.State("id")
    public ongId!: string;

    @Prop() paymentMethod!: PaymentMethod;

    get hideSaveBtn(): boolean {
      return !!(this.mollieOrgApiKey && this.paymentMethod !== "mollie");
    }

    @auth.State("mollieOrgApiKey")
    public readonly mollieOrgApiKey!: string;

    async connectToMollie() {
      try {
        await apiWallet.mollieApi.postConfig(this.ongId, this.form.orgApiKey);
        this.$store.commit("auth/setOngConfig", { payment_method: "mollie" });
        this.$store.commit("auth/setData", {
          mollieOrgApiKey: this.form.orgApiKey
        });

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
      this.$emit("paymentMethodChange", "mollie");
    }

    mounted() {
      this.form.orgApiKey = this.mollieOrgApiKey;
    }
  }
</script>

<style lang="scss" scoped>
  .mollie-payment {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    padding-inline: 3rem;
    font-size: 1.2rem;

    p {
      font-size: 1rem;
      text-align: center;
    }
  }

  .form__column {
    width: 100%;
  }
</style>
