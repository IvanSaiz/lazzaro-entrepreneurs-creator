<template lang="pug">
section.public-homepage
  .public-homepage__header
    h2.h2--dash {{ $t('web.public.homepageForm.title') }}
    .subtitle
      h3 {{ $t('web.public.homepageForm.subtitle') }}
      design-modal(section="homepage")
        template(#header)
          h4 {{ $t('web.public.homepageForm.title') }}
        template(#form)
          h2.h2--dash {{ $t('web.public.homepageForm.design.layout') }}
          layout-select(
            name="homepageDesignLayout"
            v-model="props.design.layout"
          )
          h2.h2--dash {{ $t('web.public.homepageForm.design.color') }}
          FormulateInput#primary-color(
            type="textColor"
            name="homepageDesignBackgroundColor"
            v-model="props.design.backgroundColor"
          )
  .form__row
      FormulateInput(
        type="image"
        :label="$t('web.public.homepageForm.form.image')"
        label-position="before"
        name="homepageMainImage"
        v-model="props.mainImage"
        :help="$t('web.public.homepageForm.form.imageHelper')"
      )
      .form-section
        .text-color-row
          formulate-input(
              type="text"
              name="homepageTitle"
              v-model="props.title"
              :label="$t('web.public.homepageForm.form.title')"
              :help="$t('web.public.homepageForm.form.titleHelper')"
            )
          formulate-input#primary-color(
            type="textColor"
            name="homepageTitleColor"
            v-model="props.titleColor"
            )
        .text-color-row
          formulate-input(
              type="text"
              name="homepageSubtitle"
              v-model="props.subTitle"
              :label="$t('web.public.homepageForm.form.subtitle')"
              :help="$t('web.public.homepageForm.form.subtitleHelper')"
              )
          FormulateInput#primary-color(
            type="textColor"
            name="homepageSubtitleColor"
            v-model="props.subTitleColor"
            )
        .button-row
          formulate-input(
              type="text"
              name="homepageFirstButtonText"
              v-model="props.firstButtonText"
              :label="$t(`web.public.homepageForm.form.buttons.1`)"
            )
          formulate-input(
              type="text"
              name="homepageFirstButtonLink"
              v-model="props.firstButtonLink"
              :label="$t(`web.public.homepageForm.form.links.1`)"
            )
        .button-row
            formulate-input(
              type="text"
              name="homepageSecondButtonText"
              v-model="props.secondButtonText"
              :label="$t(`web.public.homepageForm.form.buttons.2`)"
            )
            formulate-input(
              type="text"
              name="homepageSecondButtonLink"
              v-model="props.secondButtonLink"
              :label="$t(`web.public.homepageForm.form.links.2`)"
            )
</template>

<script lang="ts">
  import { Component, Vue, VModel } from "vue-property-decorator";
  import DesignModal from "@/components/DesignModal.vue";
  import LayoutSelect from "@/components/LayoutSelect.vue";

  type HomepageProps = WebProps["homePage"];

  @Component({ name: "Homepage", components: { DesignModal, LayoutSelect } })
  export default class Homepage extends Vue {
    @VModel() props!: HomepageProps;
  }
</script>
