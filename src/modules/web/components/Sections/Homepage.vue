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
            :options="designOptions"
            optionClass="homepage"
          )
            template(#tooltip)
              div
                <h1>{{ $t("common.design.layout.heading") }}</h1>
                <h2>{{ $t("common.design.layout.subtitle") }}</h2>
              img(src="@/assets/images/img-placeholder.svg" alt="Placeholder")
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
              validation="required"
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
              validation="required"
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

    designOptions = [
      {
        value: "left",
        label: this.$t("common.design.layout.options.left")
      },
      {
        value: "right",
        label: this.$t("common.design.layout.options.right")
      },
      {
        value: "center",
        label: this.$t("common.design.layout.options.center")
      },
      {
        value: "left-fill",
        label: this.$t("common.design.layout.options.left-fill")
      },
      {
        value: "right-fill",
        label: this.$t("common.design.layout.options.right-fill")
      }
    ];
  }
</script>

<style lang="scss">
  .public-homepage {
    &__header {
      h3 {
        color: $color-black-03;
        font-size: 16px;
        font-weight: 400;
      }
    }

    .form__row {
      display: grid;
      grid-template-columns: min-content auto;
      gap: 10px;

      > :first-child {
        min-width: 140px;
      }
    }

    .form-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .section-row {
        display: flex;

        > :first-child {
          width: 82%;
        }

        > :last-child {
          flex-grow: 1;
          margin-left: 18px;
        }
      }

      .button-row {
        display: flex;
        flex-direction: row;
        gap: 1rem;

        .formulate-input {
          flex-grow: 1;
        }
      }

      .text-color-row {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 1rem;

        > :first-child {
          flex-grow: 1;
        }

        > :last-child {
          max-width: fit-content;
        }
      }

      &__cta {
        display: flex;
        margin-top: 10px;

        > :first-child {
          width: 24%;
        }

        > :last-child {
          flex-grow: 1;
          margin-left: 18px;
        }
      }
    }
  }

  .layout-select {
    &:has(.homepage) {
      display: grid;
      gap: 2rem;
      grid-template-columns: repeat(3, 1fr);

      overflow-x: auto;

      @media screen and (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
      }

      @media screen and (max-width: 480px) {
        grid-template-columns: 1fr;
      }
    }

    .option .homepage.layout {
      width: 100%;
      height: 10rem;
      display: flex;
      background-color: $color-white;
      border-radius: 10px;
      padding: 2rem;
      gap: 2rem;
      align-items: center;
      justify-content: space-between;
      pointer-events: none;
      border: 2px solid transparent;

      h1 {
        font-size: 12px;
        font-weight: 400;
        line-height: 15px;
        margin: 0;
      }
      h2 {
        font-size: 10px;
        font-weight: 400;
        line-height: 12.55px;
        margin: 0;
      }

      &.right,
      &.right-fill {
        flex-direction: row-reverse;
      }

      &.center {
        justify-content: center;
        align-items: center;
        position: relative;
        background-color: $color-black-06;

        img {
          position: absolute;
          z-index: 1;
        }
        div {
          z-index: 2;
        }
      }

      &.left-fill,
      &.right-fill {
        position: relative;
        background-color: $color-black-06;

        img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
        }
        div {
          z-index: 2;
        }
      }
    }
  }
</style>
