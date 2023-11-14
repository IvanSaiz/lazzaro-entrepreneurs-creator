<template lang="pug">
#signin
  .signin
    header.signin__header
      img(alt="Lazzaro logo" src="@/assets/images/logo.png" width="225")
      h1 {{ $t('auth.signin.title') }}
    .signin__form
      FormulateForm(
        v-model="signinForm"
        @submit="onSigninSubmit"
        :keep-model-data="true"
      )
        .form__row
          FormulateInput(
            type="text"
            name="email"
            :label="$t('auth.signin.form.email')"
            :label-class="['required']"
            validation="required"
            :validation-name="$t('auth.signin.form.email')"
          )
        .form__row
          FormulateInput(
            type="password"
            name="password"
            :label="$t('auth.signin.form.password')"
            :label-class="['required']"
            validation="required"
            :validation-name="$t('auth.signin.form.password')"
          )
        .form__row
        router-link(to="recover" #default="{ navigate }")
          a.remember_link(@click="navigate" href="#") {{ $t('auth.signin.rememberPassword') }}
        lz-button(
          type="primary"
          :fullWidth="true"
          :disabled="loadingPostLogin"
        ) {{ $t('common.actions.enter') }}

  .signup
    header.signup__header
      h1 {{ $t('auth.signup.title') }}
      p {{ $t('auth.signup.subtitle') }}
    router-link(to="signup" #default="{ navigate }")
      lz-button.signup__button(type="secondary" @click="navigate") {{ $t('auth.signup.createBtn') }}
    .signup__icon
      wand-icon(size=152 stroke-width=0.5)
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import { WandIcon } from "vue-tabler-icons";
  import { apiLogin } from "../api";
  import { namespace } from "vuex-class";

  const store = namespace("auth");

  @Component({
    components: { LzButton, WandIcon }
  })
  export default class Signin extends Vue {
    signinForm = {
      email: "",
      password: ""
    };
    loadingPostLogin = false;

    @store.Action
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public updateData!: (payload: any) => void;

    @store.Action
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public getWebTemplateFeatures!: (payload: any) => void;

    onSigninSubmit() {
      this.loadingPostLogin = true;

      apiLogin({
        email: this.signinForm.email,
        password: this.signinForm.password
      })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then(async (response: any) => {
          const { token, data } = response;
          if (token) {
            localStorage.setItem("accessToken", token);
            localStorage.setItem("auth", JSON.stringify(data));
            await this.getWebTemplateFeatures();

            await this.updateData(data);
            window.location.href =
              "https://lazzaro.io/en/crea-tu-web-para-empredimiento/gracias/";          }
        })
        .catch(err => {
          if (err.response.status === 401) {
            return this.$notify({
              type: "error",
              text: this.$tc("auth.signin.errors.wrongCredentials")
            });
          }
          this.$notify({
            type: "error",
            text: this.$tc("common.error.generic")
          });
        })
        .finally(() => {
          this.loadingPostLogin = false;
        });
    }
  }
</script>

<style lang="scss" scoped>
  #signin {
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

    .signup {
      text-align: center;

      &__header {
        h1 {
          font-size: 26px;
        }
      }

      &__button {
        margin-top: 32px;
      }

      &__icon {
        margin-top: 38px;

        svg {
          stroke: $color-black-04;
        }
      }
    }

    .signin {
      &__header {
        h1 {
          margin-top: 30px;
        }
      }

      &__form {
        margin-top: 60px;
        max-width: 400px;
        width: 100%;

        & .remember_link {
          margin: 10px 0;
          display: block;
        }
      }
    }
  }
</style>
