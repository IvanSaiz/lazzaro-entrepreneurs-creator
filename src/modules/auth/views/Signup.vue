<template lang="pug">
#signup
  .signin
    header.signin__header
      h1 {{ $t('auth.signin.haveAccount') }}
      p {{ $t('auth.signin.accessWebsite') }}
    router-link(to="signin" #default="{ navigate }")
      lz-button.signin__button(type="secondary" @click="navigate") {{ $t('auth.signin.access') }}
    .signin__icon
      moon-stars-icon(size=152 stroke-width=0.5)

  .signup
    header.signup__header
      img(alt="Lazzaro logo" src="@/assets/images/logo.png" width="225")
      h1 {{ $t('auth.signup.createWeb') }}
    .signup__form
      FormulateForm(
        v-model="signupForm"
        @submit="onSignupSubmit"
        :keep-model-data="true"
      )
        .form__row
          FormulateInput(
            type="text"
            name="firstName"
            :label="$t('auth.signup.form.firstName')"
            :label-class="['required']"
            validation="required"
            :validation-name="$t('auth.signup.form.firstName')"
          )
          FormulateInput(
            type="text"
            name="lastName"
            :label="$t('auth.signup.form.lastName')"
            :label-class="['required']"
            validation="required"
            :validation-name="$t('auth.signup.form.lastName')"
          )
          
        .form__row
          FormulateInput(
            type="text"
            name="companyName"
            :label="$t('auth.signup.form.name')"
            :label-class="['required']"
            validation="required"
            :validation-name="$t('auth.signup.form.name')"
          )
          FormulateInput(
            type="text"
            name="cif"
            :label="$t('auth.signup.form.cif')"
            :label-class="['required']"
            validation="required"
          )
        .form__row
          FormulateInput(
            type="text"
            name="email"
            :label="$t('auth.signup.form.email')"
            :label-class="['required']"
            validation="required"
            :validation-name="$t('auth.signup.form.email')"
          )
          FormulateInput(
              type="select"
              name="gender"
              :label="$t('auth.signup.form.gender.label')"
              :label-class="['required']"
              :options="genderOptions"
              validation="required"
              :validation-name="$t('auth.signup.form.gender.label')"
              :placeholder="$t('auth.signup.form.choose')"
            )  
      
  
        .form__row
          FormulateInput(
              type="select"
              name="organization",
              :label="$t('auth.signup.form.organizations.label')"
              :label-class="['required']"
              :options="organizationOptions"
              validation="required"
              :validation-name="$t('auth.signup.form.organizations.label')"
              :placeholder="$t('auth.signup.form.choose')"
            )  
          FormulateInput(
            type="text"
            name="dni"
            :label-class="['required']"
            :label="$t('auth.signup.form.dni')"
          )

        .form__row
          FormulateInput(
            type="text"
            name="mobilePhone"
            :label-class="['required']"
            :label="$t('auth.signup.form.mobilePhone')"
          )

        .form__row
          FormulateInput(
            type="password"
            name="password"
            :label="$t('auth.signup.form.password')"
            validation="required"
            :validation-name="$t('auth.signup.form.password')"
          )
          FormulateInput(
            type="password"
            name="password_confirm"
            :label="$t('auth.signup.form.repeatPW')"
            :label-class="['required']"
            validation="required|confirm"
            :validation-name="$t('auth.signup.form.repeatPW')"
          )

        .form__row
          FormulateInput(
            type="checkbox"
            name="terms"
            :label="$t('auth.signup.form.acceptTerms')"
            label-position="after"
            validation="accepted"
            :validation-name="$t('auth.signup.form.terms')"
          )
            template(#label="{ label }")
              label.formulate-input-label.formulate-input-label--after
                a(
                  href="https://lazzaro.io/politica-de-condiciones-de-uso/"
                  target="_blank"
                ) {{ label }}

        lz-button(
          type="primary"
          :fullWidth="true"
          :disabled="loadingPostMember"
        ) {{ $t('auth.signup.createBtn') }}
</template>

<script lang="ts">
  import LzButton from "@/components/Button.vue";
  import LzModal from "@/components/Modal.vue";
  import { Component, Vue, Watch } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import { apiMembers } from "../api";

  const auth = namespace("auth");

  const store = namespace("auth");

  @Component({
    components: { LzButton, LzModal }
  })
  export default class Signup extends Vue {
    signupForm = {
      firstName: "",
      lastName: "",
      companyName: "",
      mobilePhone: "",
      cif: "",
      email: "",
      gender: "",
      dni: "",
      organization: "",
      password: ""
    };

    hasORG = false;

    @Watch("signupForm.organization")
    onHasYBSChange(newVal: string, oldVal: string) {
      this.hasORG =
        newVal !== this.$t("auth.signup.form.organizations.none")
          ? true
          : false;
    }

    genderOptions = {
      man: this.$t("auth.signup.form.gender.man"),
      woman: this.$t("auth.signup.form.gender.woman"),
      other: this.$t("auth.signup.form.gender.other")
    };

    organizationOptions = [
      "Asociación Arrabal",
      "Afedes",
      "F.Autoocupación",
      "Aprofem",
      "F.Ronsel",
      "Gaztenpresa",
      this.$t("auth.signup.form.organizations.none")
    ];

    loadingPostMember = false;

    @store.Action
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public updateData!: (payload: any) => void;

    @store.Action
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public updateFeatures!: (payload: any) => void;

    @auth.State("ioCashUserId")
    public ioCashUserId!: string;

    onSignupSubmit() {
      this.loadingPostMember = true;

      if (
        this.signupForm.organization === "None" ||
        this.signupForm.organization === "Ninguno"
      ) {
        this.signupForm.organization = "none";
      }

      apiMembers({
        firstName: this.signupForm.firstName,
        lastName: this.signupForm.lastName,
        companyName: this.signupForm.companyName,
        mobilePhone: this.signupForm.mobilePhone,
        cif: this.signupForm.cif,
        email: this.signupForm.email,
        gender: this.signupForm.gender,
        dni: this.signupForm.dni,
        organization: this.signupForm.organization,
        password: this.signupForm.password
      })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((response: any) => {
          this.$notify({
            type: "success",
            text: this.$tc("auth.signup.notifications.success")
          });
          const { token, data } = response;
          if (token) {
            localStorage.setItem("accessToken", token);
            localStorage.setItem("auth", JSON.stringify(data));
            this.updateData(data);
            //this.updateFeatures(data.features);
            this.$router.push({ name: "Onboarding" });
          } else {
            throw new Error("No token included in the response");
          }
        })
        .catch(err => {
          let error = "";
          switch (err.response.data.message) {
            case "EXISTS_EMAIL":
              error = "common.error.accountAlreadyExists";
              break;
            case "EXISTS_COMPANY":
              error = "common.error.companyAlreadyExists";
              break;
            case "Validation error":
              error = "common.error.validationError";
              break;
            default:
              error = "common.error.generic";
              break;
          }
          this.$notify({
            type: "error",
            text: this.$tc(error)
          });
          console.error(err);
        })
        .finally(() => {
          this.loadingPostMember = false;
        });
    }
  }
</script>

<style lang="scss">
  #signup {
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

    .signin {
      flex: 1;

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

    .signup {
      flex: 2;

      &__modal {
        .lz-box {
          max-width: 400px;
        }
      }

      &__header {
        h1 {
          margin-top: 30px;
        }
      }

      &__form {
        margin-top: 60px;
        width: 100%;

        &__FormulateInput {
        }
      }
    }

    .inactive-field {
      label {
        color: $color-black-04;
      }
      select {
        color: $color-black-04;
      }
    }

    .formulate-input-wrapper {
      flex-basis: 50%;
    }
  }
</style>
