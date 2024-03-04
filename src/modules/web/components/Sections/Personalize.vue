<template lang="pug">
section.public-personalizeWeb
  .public-personalizeWeb__header
    h2.h2--dash {{ $t('web.public.personalizeWebForm.title') }}
    h3 {{ $t('web.public.personalizeWebForm.subtitle') }}
  .form__row
    FormulateInput(
      type="image"
      :label="$t('web.public.personalizeWebForm.form.logo')"
      label-position="before"
      name="styleLogo"
      v-model="props.logo"
      :help="$t('web.public.personalizeWebForm.form.logoHelper')"
    )
    .form-section
      FormulateInput(
        type="select"
        name="styleMainTypography"
        :label="$t('web.public.personalizeWebForm.form.mainTypography')"
        :label-class="['required']"
        :options="fontOptions"
        v-model="props.mainTypography"
        validation="required"
        :validation-name="$t('web.public.personalizeWebForm.form.fonts.label')"
        :placeholder="$t('auth.signup.form.choose')"
      )  
      FormulateInput(
        type="select"
        name="styleSecondaryTypography"
        :label="$t('web.public.personalizeWebForm.form.secondTypography')"
        :label-class="['required']"
        :options="fontOptions"
        v-model="props.secondaryTypography"
        validation="required"
        :validation-name="$t('auth.onboarding.stepStyle.form.style')"
        :placeholder="$t('auth.signup.form.choose')"
      )
      .form-colors
        FormulateInput#primary-color(
          type="textColor"
          name="styleButtonColor"
          :label="$t('web.public.personalizeWebForm.form.buttonsColor')"
          v-model="props.buttonColor"
          )
        FormulateInput#primary-color(
          type="textColor"
          name="styleMenuColor"
          :label="$t('web.public.personalizeWebForm.form.menuColor')"
          v-model="props.menuColor"
          )
        FormulateInput#primary-color(
          type="textColor"
          name="styleFooterColor"
          :label="$t('web.public.personalizeWebForm.form.footerColor')"
          v-model="props.footerColor"
          )
</template>

<script lang="ts">
  import { Vue, Component, VModel } from "vue-property-decorator";

  type StyleProps = WebProps["style"];

  @Component({ name: "Personalize" })
  export default class Personalize extends Vue {
    @VModel() props!: StyleProps;

    fontOptions = {
      roboto: this.$t("web.public.personalizeWebForm.form.fonts.roboto")
      //TODO: uncomment it when the template project is adopted to that feature
      // arial: this.$t("web.public.personalizeWebForm.form.fonts.arial")
    };
  }
</script>

<style lang="scss">
  section.public-personalizeWeb {
    &__header {
      h3 {
        color: $color-black-03;
        font-size: 16px;
        font-weight: 400;
      }
    }

    .form__row {
      > :first-child {
        flex-basis: 16.2%;

        .formulate-input-element {
          height: 148px;
        }
      }
    }

    .form-section {
      display: flex;
      flex-direction: column;
      gap: 18px;

      .form-colors {
        display: flex;
        gap: 42px;
        flex-wrap: wrap;
      }
    }
  }
</style>
