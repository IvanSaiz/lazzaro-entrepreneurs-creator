<template lang="pug">
#step-style
  .step-style__img
    img(src="./assets/estilo_paso3.svg" height=379)
  .step-style__title {{ $t('auth.onboarding.stepStyle.title') }}
  .step-style__description {{ $t('auth.onboarding.stepStyle.subtitle') }}
  .step-style__form
    FormulateForm(
      v-model="styleForm"
      :keep-model-data="true"
    )
      .form__container
        .form__row
          .form__logo
            FormulateInput(
              type="image"
              name="logo"
              :label="$t('auth.onboarding.stepStyle.form.logo.label')"
              :help="$t('auth.onboarding.stepStyle.form.logo.help')"
              validation="mime:image/jpeg,image/png,image/webp,image/svg+xml"
            )
        .form__colors
          .form__row
            FormulateInput#primary-color(
              type="textColor"
              name="textColor"
              :label="$t('auth.onboarding.stepStyle.form.textColour')"
              value="#1081F2"
            )
            FormulateInput#secondary-color(
              type="textColor"
              name="buttonColor"
              :label="$t('auth.onboarding.stepStyle.form.buttonColour')"
              value="#AD00FF"
            )
          .form__row
            FormulateInput(
              type="select"
              name="template"
              :label="$t('auth.onboarding.stepStyle.form.style')"
              :label-class="['required']"
              :options="styleOptions"
              validation="required"
              :validation-name="$t('auth.onboarding.stepStyle.form.style')"
              :placeholder="$t('auth.signup.form.choose')"
            )  
  .step-style__actions
    slot(name="actions" :click="onStyleSubmit" :disabled="disableStepStyleButton")
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import { namespace } from "vuex-class";
  import { getImgURL } from "@/utils/getFormulateImageUrl";

  const auth = namespace("auth");

  @Component({
    components: { LzButton }
  })
  export default class StepStyle extends Vue {
    @auth.State("style")
    public style!: any;

    @auth.Action
    public setTemplateFeatures!: () => Promise<void>;

    styleForm = {
      logo: this.style?.logo ?? {
        files: [{ file: null, name: "" }]
      },
      textColor: this.style?.textColor ?? "#1081F2",
      buttonColor: this.style?.buttonColor ?? "#AD00FF",
      template: this.style?.template ?? "modern"
    };

    loadingPostStyle = false;

    //TODO: show the styles but disable them
    styleOptions = {
      // classic: this.$t("auth.onboarding.stepStyle.form.styleOptions.classic"),
      modern: this.$t("auth.onboarding.stepStyle.form.styleOptions.modern")
      // minimalist: this.$t(
      //   "auth.onboarding.stepStyle.form.styleOptions.minimalist"
      // )
    };

    get disableStepStyleButton(): boolean {
      return !this.styleForm.template || this.loadingPostStyle;
    }

    @auth.State("id")
    public ongId!: string;

    @auth.Mutation
    public setStyle!: (payload: any) => void;

    async onStyleSubmit() {
      this.loadingPostStyle = true;
      const uploadedImage = await getImgURL(this.styleForm.logo.files[0].file);

      this.setStyle({
        logo: uploadedImage,
        textColor: this.styleForm.textColor,
        buttonColor: this.styleForm.buttonColor,
        template: this.styleForm.template
      });

      await this.setTemplateFeatures();

      this.loadingPostStyle = false;
    }
  }
</script>

<style lang="scss">
  #step-style {
    .step-style {
      &__title {
        color: $color-black-02;
        font-family: Jost;
        font-size: 30px;
        font-weight: 600;
        line-height: 1.4;
        text-align: center;
      }

      &__img {
        margin-bottom: 50px;
        text-align: center;
      }

      &__description {
        color: $color-black-03;
        font-family: Muli;
        font-weight: 400;
        font-size: 18px;
        line-height: 1.5;
        text-align: center;
      }

      &__form {
        margin-top: 40px;
        display: flex;
        justify-content: center;
      }

      &__button {
        margin-top: 18px;
        text-align: center;
      }

      &__actions {
        position: absolute;
        bottom: -40px;
        width: calc(100% - 80px);
      }
    }

    .form__container {
      display: flex;
      justify-content: center;
      gap: 20px;
    }
    .form__logo {
      width: 200px;
    }
    .form__colors {
      flex: 0 0 480px;
      padding-left: 25px;
      padding-top: 0;
    }
    .form__row {
      margin-top: 0;
    }
  }
</style>
