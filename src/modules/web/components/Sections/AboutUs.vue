<template lang="pug">
section.public-whoWeAre
  .public-whoWeAre__header
    h2.h2--dash {{ $t('web.public.whoWeAreForm.title') }}
    .subtitle
      h3 {{ $t('web.public.whoWeAreForm.subtitle') }}
      design-modal(section="aboutUs")
    .form__row
      FormulateInput(
        type="image"
        :label="$t('web.public.whoWeAreForm.form.image')"
        label-position="before"
        v-model="props.imgUrl"
        name="aboutUsImgUrl"
        :help="$t('web.public.whoWeAreForm.form.imageHelper')"
      )
      .form-section
        .section-row
          formulate-input(
            type="text"
            name="aboutUsTitle"
            v-model="props.title"
            :label="$t('web.public.whoWeAreForm.form.title')"
            :help="$t('web.public.whoWeAreForm.form.titleHelper')"
            )
          FormulateInput#primary-color(
            type="textColor"
            name="aboutUsTitleColor"
            v-model="props.titleColor"
            )
        .section-row
          formulate-input(
            type="text"
            name="aboutUsSubtitle"
            v-model="props.subTitle"
            :label="$t('web.public.whoWeAreForm.form.subtitle')"
            :help="$t('web.public.whoWeAreForm.form.subtitleHelper')"
            )
          FormulateInput#primary-color(
            type="textColor"
            v-model="props.subTitleColor"
            name="aboutUsSubtitleColor"
            )
        lz-editor-input(
        :label="$t('web.public.whoWeAreForm.form.description')"
        v-model="props.description"
        )
        section.public-features
  section.public-features
    .public-whoWeAre__header
      h3.h3--dash {{ $t('web.public.whoWeAreForm.features.title') }}
      formulate-input.public-whoWeAre__content(
        type="group"
        v-model="props.features.icons"
        name="icons"
        #default="{index}"
      )
        formulate-input.text-item(
          type="image"
          name="url"
          :label="$t(`web.public.whoWeAreForm.features.icon.${index + 1}`)"
          :help="$t('web.public.whoWeAreForm.features.icon.help')"
        )
        formulate-input.text-item(
          type="text"
          name="title"
          :label="$t(`web.public.whoWeAreForm.features.titles.${index + 1}`)"
        )
        formulate-input.text-item(
          type="text"
          name="description"
          :label="$t(`web.public.whoWeAreForm.features.descriptions.${index+1}`)"
        )
    hr.hr--dash
    .public-whoWeAre__cta
      formulate-input.public-whoWeAre__content(
        type="group"
        v-model="props.features.buttons"
        name="buttons"
      )
        formulate-input(
          type="text"
          name="text"
          :label="$t('web.public.whoWeAreForm.features.button')"
        )
        formulate-input(
          type="text"
          name="link"
          :label="$t('web.public.whoWeAreForm.features.link')"
        )
</template>

<script lang="ts">
  import { Component, Vue, VModel } from "vue-property-decorator";
  import DesignModal from "@/components/DesignModal.vue";
  import LzEditorInput from "@/components/EditorInput.vue";

  type AboutUsProps = WebProps["aboutUs"];

  @Component({ name: "AboutUs", components: { DesignModal, LzEditorInput } })
  export default class AboutUs extends Vue {
    @VModel() props!: AboutUsProps;
  }
</script>
