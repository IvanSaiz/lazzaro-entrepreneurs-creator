<template lang="pug">
section.public-bookings
  .public-bookings__header
    h2.h2--dash {{ $t('web.public.bookingsForm.title') }}
    .subtitle
      h3 {{ $t('web.public.bookingsForm.subtitle') }}
      design-modal(section="bookings")
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

  type BookingsProps = WebProps["bookings"];

  @Component({ name: "Bookings", components: { DesignModal } })
  export default class Bookings extends Vue {
    @VModel() props!: BookingsProps; // TODO: Map to inputs
  }
</script>
