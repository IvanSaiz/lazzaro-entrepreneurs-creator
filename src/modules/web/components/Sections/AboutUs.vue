<template lang="pug">
section.public-whoWeAre
  .public-whoWeAre__header
    .title
      formulate-input(
        type="toggle",
        name="aboutUsEnabled",
        v-model="props.enabled"
      )
      h2.h2--dash.grow-1 {{ $t("web.public.whoWeAreForm.title") }}
    .subtitle
      h3 {{ $t("web.public.whoWeAreForm.subtitle") }}
      design-modal(section="aboutUs")
        template(#header)
          h4 {{ $t("web.public.whoWeAreForm.title") }}
        template(#form)
          h2.h2--dash {{ $t("web.public.whoWeAreForm.design.layout.tooltip") }}
          layout-select(
            name="aboutUsDesignLayout",
            v-model="props.design.layout",
            :options="layoutOptions",
            optionClass="aboutUs"
          )
            template(#tooltip)
              .item
                .heading
                  h1 {{ $t("web.public.whoWeAreForm.design.layout.title") }}
                  h2 {{ $t("web.public.whoWeAreForm.design.layout.subtitle") }}
                .grid
                  .side(v-for="item in Array.from({ length: 4 })")
                    h1 {{ $t("web.public.whoWeAreForm.design.layout.item.title") }}
                    p {{ $t("web.public.whoWeAreForm.design.layout.item.subtitle") }}
              img(src="@/assets/images/img-placeholder.svg", alt="Placeholder")
          h2.h2--dash {{ $t("web.public.whoWeAreForm.design.color") }}
          FormulateInput#primary-color(
            type="textColor",
            name="aboutUsDesignBackgroundColor",
            v-model="props.design.backgroundColor"
          )
    .form__row
      FormulateInput(
        type="image",
        :label="$t('web.public.whoWeAreForm.form.image')",
        label-position="before",
        v-model="props.imgUrl",
        name="aboutUsImgUrl",
        validation="required|mime:image/jpeg,image/png,image/svg+xml,image/webp",
        :help="$t('web.public.whoWeAreForm.form.imageHelper')"
      )
      .form-section
        .section-row
          formulate-input(
            type="text",
            name="aboutUsTitle",
            v-model="props.title",
            validation="required",
            :label="$t('web.public.whoWeAreForm.form.title')",
            :help="$t('web.public.whoWeAreForm.form.titleHelper')"
          )
          FormulateInput#primary-color(
            type="textColor",
            name="aboutUsTitleColor",
            v-model="props.titleColor"
          )
        .section-row
          formulate-input(
            type="text",
            name="aboutUsSubtitle",
            v-model="props.subTitle",
            validation="required",
            :label="$t('web.public.whoWeAreForm.form.subtitle')",
            :help="$t('web.public.whoWeAreForm.form.subtitleHelper')"
          )
          FormulateInput#primary-color(
            type="textColor",
            v-model="props.subTitleColor",
            name="aboutUsSubtitleColor"
          )
        lz-editor-input(
          :label="$t('web.public.whoWeAreForm.form.description')",
          required
          v-model="props.description"
        )
  section.public-features
    .public-whoWeAre__header
      .title
        formulate-input(
          type="toggle",
          name="aboutUsFeaturesEnabled",
          v-model="props.features.enabled"
        )
        h3.h3--dash.grow-1 {{ $t("web.public.whoWeAreForm.features.title") }}
      formulate-input.public-whoWeAre__content(
        type="group",
        v-model="props.features.icons",
        name="icons",
        validation="min:2,length|max:4,length"
        #default="{ index }"
      )
        formulate-input.text-item(
          type="image",
          name="url",
          validation="mime:image/jpeg,image/png,image/svg+xml,image/webp",
          :label="$t(`web.public.whoWeAreForm.features.icon`, { index: index + 1 })",
          :help="$t('common.helper.image', {w: 60, h: 60, size: '25MB'})"
        )
        formulate-input.text-item(
          type="text",
          name="title",
          :label="$t(`web.public.whoWeAreForm.features.titles`, { index: index + 1 })"
        )
        formulate-input.text-item(
          type="text",
          name="description",
          :label="$t(`web.public.whoWeAreForm.features.descriptions`, { index: index + 1 })"
        )
    hr.hr--dash
    .public-whoWeAre__cta
      formulate-input.public-whoWeAre__content(
        type="group",
        v-model="props.features.buttons",
        name="buttons"
      )
        formulate-input(
          type="text",
          name="text",
          :label="$t('web.public.whoWeAreForm.features.button')"
        )
        formulate-input(
          type="text",
          name="link",
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
  .public-whoWeAre {
    &__header {
      margin-bottom: 2rem;

      .title {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 0.8rem;
        margin-bottom: 1.2rem;
      }

      h2 {
        margin-bottom: auto;
        flex-grow: 1;
      }

      h3 {
        color: $color-black-03;
        margin-bottom: 4px;
        font-size: 16px;
        font-weight: 400;
        flex-grow: 1;
      }
    }

    .form__row {
      display: grid;
      grid-template-columns: 20% 80%;
    }

    .form-section {
      display: flex;
      flex-direction: column;

      .section-row {
        display: flex;
        align-items: center;
        gap: 1rem;

        > :first-child {
          width: 82%;
        }

        > :last-child {
          flex-grow: 1;
        }
      }
    }

    &__content {
      .formulate-input-grouping {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        align-items: flex-start;
        gap: 2rem;

        @media (max-width: $br-lg) {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .formulate-input-group-repeatable {
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 0;
        }

        @media (max-width: $br-md) {
          grid-template-columns: repeat(2, 1fr);
        }
        @media (max-width: $br-sm) {
          grid-template-columns: 1fr;
        }
      }

      .text-item {
        display: flex;
        flex-direction: column;

        &[data-type="image"] {
          margin-bottom: auto !important;
        }

        &:not(:last-child) {
          margin-bottom: 1rem;
        }

        formulate-input {
          width: 100%;
        }
      }
    }

    &__cta {
      display: grid;
      margin-top: 22px;

      .formulate-input-group-repeatable {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        flex-grow: 1;
      }
    }
  }

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

        .side {
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
