<template lang="pug">
#recover
  .recover
    header.recover__header
      img(alt="Lazzaro logo" src="@/assets/images/logo.png" width="225")
      h1 {{ $t('auth.recover.title') }}
      p {{ $t(recoverCompleted ? 'auth.recover.completed' : 'auth.recover.details') }}

      router-link( :to="{ name: 'Signin' }")
        lz-button.back(
          type="primary"
          :hidden="!recoverCompleted"
          :fullWidth="false"
        ) {{ $t('common.actions.back') }}
  .recover__form
    FormulateForm(
      v-model="recoverForm"
      @submit="onRecoverSubmit"
      :keep-model-data="true"
      :hidden="recoverCompleted"
    )
      .form__row
        FormulateInput(
          type="text"
          name="email"
          :label="$t('auth.recover.form.email')"
          validation="email"
        )
      lz-button(
        type="primary"
        :fullWidth="true"
        :disabled="loadingPostRecover"
      ) {{ $t('common.actions.send') }}

      router-link( :to="{ name: 'Signin' }")
        lz-button.back(
          type="secondary"
          :fullWidth="true"
          :hidden="recoverCompleted"
        ) {{ $t('common.actions.back') }}
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import { WandIcon } from "vue-tabler-icons";
  import { apiRecover } from "../api";

  @Component({
    components: { LzButton, WandIcon }
  })
  export default class Recover extends Vue {
    recoverForm = {
      email: ""
    };

    loadingPostRecover = false;
    recoverCompleted = false;

    onRecoverSubmit() {
      this.loadingPostRecover = true;

      apiRecover({
        email: this.recoverForm.email
      })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then(async (response: any) => {
          this.recoverCompleted = true;
        })
        .catch((error: any) => this.handleError(error))
        .finally(() => (this.loadingPostRecover = false));
    }

    handleError(error: any): void {
      let text = this.$tc("common.error.generic");
      switch (error.response.status) {
        case 404:
          text = this.$tc("auth.recover.errors.userNotFound");
      }

      this.$notify({
        type: "error",
        text: text
      });
    }
  }
</script>

<style lang="scss" scoped>
  #recover {
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

    .back {
      margin-top: 40px;
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
