<template lang="pug">
section.public-whoWeAre
  .public-whoWeAre__header
    h2.h2--dash {{ $t('web.public.whoWeAreForm.title') }}
    .subtitle
      h3 {{ $t('web.public.whoWeAreForm.subtitle') }}
      design-modal(section="aboutUs")
        template(#header)
          h4 {{ $t('web.public.whoWeAreForm.title') }}
        template(#form)
          h2.h2--dash {{ $t('web.public.whoWeAreForm.design.layout.tooltip') }}
          layout-select(
            name="aboutUsDesignLayout"
            v-model="props.design.layout"
            :options="layoutOptions"
            optionClass="aboutUs"
          )
            template(#tooltip)
              .side
                .heading
                  h1 {{ $t("web.public.whoWeAreForm.design.layout.title") }}
                  h2 {{ $t("web.public.whoWeAreForm.design.layout.subtitle") }}
                .grid
                  .item(v-for="item in Array.from({length: 4})")
                    h1 {{ $t("web.public.whoWeAreForm.design.layout.item.title") }}
                    p {{ $t("web.public.whoWeAreForm.design.layout.item.subtitle") }}
              img(src="@/assets/images/img-placeholder.svg" alt="Placeholder")
          h2.h2--dash {{ $t('web.public.whoWeAreForm.design.color') }}
          FormulateInput#primary-color(
            type="textColor"
            name="aboutUsDesignBackgroundColor"
            v-model="props.design.backgroundColor"
          )
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
  import LayoutSelect from "@/components/LayoutSelect.vue";

  type AboutUsProps = WebProps["aboutUs"];

  @Component({
    name: "AboutUs",
    components: { DesignModal, LzEditorInput, LayoutSelect }
  })
  export default class AboutUs extends Vue {
    @VModel() props!: AboutUsProps;

    layoutOptions = [
      {
        value: "left",
        label: this.$t("common.design.layout.options.left")
      },
      {
        value: "right",
        label: this.$t("common.design.layout.options.right")
      }
    ];
  }
</script>

<style lang="scss">
  .layout-select {
    &:has(.aboutUs) {
      display: grid;
      gap: 2rem;
      grid-template-columns: repeat(2, 1fr);
    }

    .option .aboutUs.layout {
      width: 100%;
      display: flex;
      background-color: $color-white;
      border-radius: 10px;
      padding: 2rem;
      gap: 2rem;
      align-items: center;
      justify-content: space-between;
      pointer-events: none;
      border: 2px solid transparent;

      .heading {
        margin-bottom: 1rem;

        h1 {
          font-size: 16px;
          font-weight: 400;
          line-height: 15px;
          margin: 0 0 0.5rem 0;
        }
        h2 {
          font-size: 12px;
          font-weight: 400;
          line-height: 12.55px;
          margin: 0 0 0.2rem 0;
        }
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;

        .item {
          display: flex;
          flex-direction: column;
          h1 {
            font-size: 10px;
            font-weight: 400;
            line-height: 12.55px;
            margin: 0;
          }
          p {
            font-size: 8px;
            font-weight: 400;
            line-height: 10px;
            margin: 0;
          }
        }
      }

      &.right {
        flex-direction: row-reverse;
      }
    }
  }
</style>
