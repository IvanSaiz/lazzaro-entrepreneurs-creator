<template lang="pug">
#recover(:class="{hide: !showScreen}")
  .recover
    header.recover__header
      img(alt="Lazzaro logo" src="@/assets/images/logo.png" width="225")
      h1 {{ $t(recoverCompleted ? 'auth.recover.completedTitle' : 'auth.recover.resetTitle') }}
      p {{ $t(recoverCompleted ? 'auth.recover.completedDetails' :'auth.recover.resetDetails') }}

      router-link( :to="{name: 'Signin'}")
        lz-button.back(
          type="primary"
          :hidden="!recoverCompleted"
          :fullWidth="false"
          ) {{ $t('common.actions.goToLogin') }}
  .recover__form
    FormulateForm(
      v-model="recoverForm"
      @submit="onRecoverSubmit"
      :keep-model-data="true"
      :hidden="recoverCompleted"
    )
      .form__rows
        FormulateInput(
          type="password"
          name="password"
          :label="$t('auth.recover.form.password')"
          :label-class="['required']"
          validation="required|between:6,20,length"
          :validation-name="$t('auth.recover.form.password')"
        )
      .form__row
        FormulateInput(
          type="password"
          name="password_confirm"
          :label="$t('auth.recover.form.repeatPassword')"
          :label-class="['required']"
          validation="required|between:6,20,length|confirm"
          :validation-name="$t('auth.recover.form.repeatPassword')"
        )
      lz-button(
        type="primary"
        :fullWidth="true"
        :disabled="loadingPostRecover"
      ) {{ $t('common.actions.send') }}
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import { WandIcon } from "vue-tabler-icons";
  import { apiCheckRecoverHash, apiUpdatePasswordByHash } from "../api";

  @Component({
    components: { LzButton, WandIcon }
  })
  export default class RecoverHash extends Vue {
    recoverForm = {
      password: "",
      password_confirm: ""
    };

    loadingPostRecover = false;
    showScreen = false;
    recoverCompleted = false;

    mounted() {
      if (!this.$route.params.hash) {
        return this.$router.push({ name: "Signin" });
      }
      this.showScreen = true;
      apiCheckRecoverHash({
        hash: this.$route.params.hash
      })
        .then(async (response: any) => {
          this.showScreen = true;
        })
        .catch((error: any) => this.handleError(error))
        .finally(() => (this.loadingPostRecover = false));
    }

    onRecoverSubmit() {
      this.loadingPostRecover = true;

      apiUpdatePasswordByHash({
        hash: this.$route.params.hash,
        password: this.recoverForm.password
      })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then(async (response: any) => {
          this.recoverCompleted = true;
        })
        .catch((error: any) => this.handleError(error))
        .finally(() => (this.loadingPostRecover = false));
    }

    handleError(error: any): void {
      switch (error.response.status) {
        case 400:
        default:
          this.$router.push({ name: "Signin" });
      }
    }
  }
</script>

<style lang="scss" scoped>
  #recover {
    &.hide {
      display: none;
    }

    box-sizing: border-box;
    flex-direction: column;
    padding: 75px 0;

    @include breakpoint("lg") {
      flex-direction: row;
    }

    &,
    & > div {
      height: 100%;
      width: 100%;
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
    }

    & > div {
      flex-direction: column;
      padding: 0 30px;
    }

    & > * ~ * {
      margin-top: 80px;
    }

    .recover {
      &__header {
        h1 {
          margin-top: 30px;
        }
      }

      &__form {
        margin-top: 20px;
        max-width: 400px;
        width: 100%;
      }

      .back {
        margin-top: 40px;
      }
    }
  }
</style>
