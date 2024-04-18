<template lang="pug">
section.public-bookings
  .public-bookings__header
    .title
      formulate-input(
        type="toggle"
        name="bookingsEnabled"
        v-model="props.enabled"
      )
      h2.h2--dash.grow-1 {{ $t('web.public.bookingsForm.title') }}
    .subtitle
      h3 {{ $t('web.public.bookingsForm.subtitle') }}
      design-modal(section="bookings")
        template(#header)
          h4 {{ $t('web.public.bookingsForm.title') }}
        template(#form)
          h2.h2--dash {{ $t('web.public.bookingsForm.design.layout.tooltip') }}
          layout-select(
            name="bookingsDesignLayout"
            v-model="props.design.layout"
            :options="layoutOptions"
            optionClass="bookings"
          )
            template(#tooltip)
              .side
                .heading
                  h1 {{ $t("web.public.bookingsForm.design.layout.title") }}
                  h2 {{ $t("web.public.bookingsForm.design.layout.subtitle") }}
              img(src="@/assets/images/img-placeholder.svg" alt="Placeholder")
          h2.h2--dash {{ $t('web.public.bookingsForm.design.color') }}
          FormulateInput#primary-color(
            type="textColor"
            name="bookingsDesignBackgroundColor"
            v-model="props.design.backgroundColor"
          )
    .form__row
      FormulateInput(
        type="image"
        :label="$t('web.public.brandForm.logo.label')"
        label-position="before"
        name="bookingsImgUrl"
        v-model="props.imgUrl"
        :help="$t('web.public.brandForm.logo.help')"
      )
      .form-section
        .section-row
          formulate-input(
            type="text"
            name="bookingsTitle"
            v-model="props.title"
            :label="$t('web.public.bookingsForm.formTitle')"
            :help="$t('web.public.bookingsForm.titleHelper')"
          )
          FormulateInput#primary-color(
            type="textColor"
            name="bookingsTitleColor"
            v-model="props.titleColor"
          )
        .section-row
          formulate-input(
            type="text"
            name="bookingsSubtitle"
            v-model="props.subtitle"
            :label="$t('web.public.bookingsForm.formSubtitle')"
            :help="$t('web.public.bookingsForm.subtitleHelper')"
          )
          FormulateInput#primary-color(
            type="textColor"
            v-model="props.subtitleColor"
            name="bookingsSubtitleColor"
          )
        .links-row
          formulate-input(
            type="text"
            name="bookingsButtonText"
            v-model="props.buttonText"
            :label="$t('web.public.bookingsForm.button')"
          )
          formulate-input(
            type="text"
            name="bookingsButtonUrl"
            v-model="props.buttonUrl"
            :label="$t('web.public.bookingsForm.link')"
          )
</template>

<script lang="ts">
  import { Component, Vue, VModel } from "vue-property-decorator";
  import DesignModal from "@/components/DesignModal.vue";
  import LayoutSelect from "@/components/LayoutSelect.vue";

  type BookingsProps = WebProps["bookings"];

  @Component({ name: "Bookings", components: { DesignModal, LayoutSelect } })
  export default class Bookings extends Vue {
    @VModel() props!: BookingsProps; // TODO: Map to inputs

    layoutOptions = [
      {
        value: "left",
        label: this.$t("common.design.layout.options.left")
      },
      {
        value: "center",
        label: this.$t("common.design.layout.options.center")
      },
      {
        value: "right",
        label: this.$t("common.design.layout.options.right")
      }
    ];
  }
</script>

<style lang="scss">
  .public-bookings {
    &__header {
      h2 {
        margin-bottom: auto;
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
        min-width: 140px;
      }
    }

    .form-section {
      display: flex;
      flex-direction: column;

      .section-row {
        display: flex;
        width: 970px;
        align-items: center;

        > :first-child {
          width: 82%;
        }

        > :last-child {
          flex-grow: 1;
          margin-left: 18px;
        }
      }

      .links-row {
        display: flex;
        width: 970px;
        gap: 22px;

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
    &:has(.bookings) {
      display: grid;
      gap: 2rem;
      grid-template-columns: repeat(3, 1fr);
    }

    .option .bookings.layout {
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

      .heading {
        margin-bottom: 1rem;

        h1 {
          font-size: 16px;
          font-weight: 400;
          line-height: 15px;
          margin: 0 0 0.5rem 0;
        }
        h2 {
          font-size: 10px;
          font-weight: 400;
          line-height: 12.55px;
          margin: 0 0 0.2rem 0;
        }
      }

      &.right {
        flex-direction: row-reverse;
      }

      &.center {
        position: relative;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background-color: $color-black-06;

        .side {
          z-index: 2;

          .heading {
            margin: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        }

        img {
          z-index: 1;
          position: absolute;
        }
      }
    }
  }
</style>
