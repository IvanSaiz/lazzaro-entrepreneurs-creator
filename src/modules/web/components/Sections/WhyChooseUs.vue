<template lang="pug">
section.public-whyUs
  .public-whyUs__header
    h2.h2--dash {{ $t('web.public.whyChooseUsForm.title') }}
    .subtitle
      h3 {{ $t('web.public.whyChooseUsForm.subtitle') }}
      design-modal(section="whyUs")
    .form__row
      FormulateInput(
        type="image"
        :label="$t('web.public.whyChooseUsForm.image')"
        label-position="before"
        name="whyChooseUsImgUrl"
        v-model="props.imgUrl"
        :help="$t('web.public.whyChooseUsForm.imageHelperText')"
      )
      .form-section
        .section-row
          formulate-input(
            type="text"
            name="whyChooseUsTitle"
            v-model="props.title"
            :label="$t('web.public.whyChooseUsForm.formTitle')"
            :help="$t('web.public.whyChooseUsForm.titleHelperText')"
          )
          FormulateInput#primary-color(
            type="textColor"
            name="whyChooseUsTitleColor"
            v-model="props.titleColor"
          )
        lz-editor-input(
          :label="$t('web.public.whyChooseUsForm.description')"
          v-model="props.description"
        )
    .public-whyUs__content
      formulate-input(
        type="group"
        name="whyChooseUsSubTitles"
        v-model="props.subtitles"
        #default="{index}"
      )
        formulate-input.text-item(
          type="text"
          name="title"
          :label="$t(`web.public.whyChooseUsForm.titles.${index + 1}`)"
        )
        formulate-input.text-item(
          type="text"
          name="description"
          :label="$t(`web.public.whyChooseUsForm.descriptions.${index + 1}`)"
        )
</template>

<script lang="ts">
  import { Component, Vue, VModel } from "vue-property-decorator";
  import LzEditorInput from "@/components/EditorInput.vue";
  import DesignModal from "@/components/DesignModal.vue";

  type WhyChooseUsProps = WebProps["whyChooseUs"];

  @Component({
    name: "WhyChooseUs",
    components: { LzEditorInput, DesignModal }
  })
  export default class WhyChooseUs extends Vue {
    @VModel() props!: WhyChooseUsProps;
  }
</script>
