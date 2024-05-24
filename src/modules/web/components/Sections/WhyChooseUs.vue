<template lang="pug">
section.public-whyUs
  .public-whyUs__header
    .title
      FormulateInput(
        type="toggle"
        name="whyChooseUsEnabled"
        v-model="props.enabled"
      )
      h2.h2--dash.grow-1 {{ $t('web.public.whyChooseUsForm.title') }}
    .subtitle
      h3 {{ $t('web.public.whyChooseUsForm.subtitle') }}
      design-modal(section="whyUs")
        template(#header)
            h4 {{ $t('web.public.whyChooseUsForm.title') }}
        template(#form)
          h2.h2--dash {{ $t('web.public.whyChooseUsForm.design.layout.tooltip') }}
          layout-select(
            name="aboutUsDesignLayout"
            v-model="props.design.layout"
            :options="layoutOptions"
            optionClass="whyChooseUs"
          )
            template(#tooltip)
              .side
                .heading
                  h1 {{ $t("web.public.whyChooseUsForm.design.layout.title") }}
                  h2 {{ $t("web.public.whyChooseUsForm.design.layout.subtitle") }}
                ol
                  li(v-for="item in Array.from({length: 3})")
                    h1 {{ $t("web.public.whyChooseUsForm.design.layout.item.title") }}
                    p {{ $t("web.public.whyChooseUsForm.design.layout.item.subtitle") }}
              img(src="@/assets/images/img-placeholder.svg" alt="Placeholder")
          h2.h2--dash {{ $t('web.public.whyChooseUsForm.design.color') }}
          FormulateInput#primary-color(
            type="textColor"
            name="aboutUsDesignBackgroundColor"
            v-model="props.design.backgroundColor"
          )
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
        class="reasons"
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
  import LayoutSelect from "@/components/LayoutSelect.vue";

  type WhyChooseUsProps = WebProps["whyChooseUs"];

  @Component({
    name: "WhyChooseUs",
    components: { LzEditorInput, DesignModal, LayoutSelect }
  })
  export default class WhyChooseUs extends Vue {
    @VModel() props!: WhyChooseUsProps;

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
  .public-whyUs {
    &__header {
      .title {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        margin-bottom: 1.2rem;

        h2 {
          flex-grow: 1;
          margin-bottom: auto;
        }
      }
      h3 {
        color: $color-black-03;
        font-size: 16px;
        font-weight: 400;
      }
    }

    .form__row {
      gap: 22px;

      > :first-child {
        flex-basis: 0;
      }
    }

    .form-section {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .section-row {
        display: flex;
        width: 100%;
        align-items: center;

        > :first-child {
          width: 90%;
        }

        > :last-child {
          flex-shrink: 1;
          margin-left: 1rem;
        }
      }

      .lz-editor-input {
        width: 100%;
      }
    }

    &__content {
      margin-top: 4px;

      .formulate-input-grouping {
        width: 100%;
        display: grid;
        gap: 2em;
        grid-template-columns: repeat(4, minmax(0, 1fr));

        @media screen and (max-width: 768px) {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      .formulate-input-group-repeatable {
        flex-grow: 1;

        display: flex;
        flex-direction: column;
        gap: 0.6em;
      }
    }
  }

  .layout-select {
    &:has(.whyChooseUs) {
      display: grid;
      gap: 2rem;
      grid-template-columns: repeat(2, 1fr);
    }

    .option .whyChooseUs.layout {
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
          margin: 0;
        }
        h2 {
          font-size: 12px;
          font-weight: 400;
          line-height: 12.55px;
          margin: 0;
        }
      }

      ol li {
        position: relative;
        counter-increment: item;

        &:not(:last-child) {
          margin-bottom: 1rem;
        }

        &::before {
          position: absolute;
          content: counter(item) ".";
          font-size: 1.4rem;
        }

        h1,
        p {
          width: fit-content;
          margin-left: 2rem !important;
        }

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

      &.right {
        flex-direction: row-reverse;
      }
    }
  }
</style>
