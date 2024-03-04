<template lang="pug">
section.public-reviews
  .public-reviews__header
    h2.h2--dash {{ $t('web.public.reviewsForm.title') }}
    h3 {{ $t('web.public.reviewsForm.subtitle') }}
  .public-reviews__title
    .reviews-section
      formulate-input(
        type="text"
        name="reviewsTitle"
        v-model="props.title"
        :label="$t('web.public.reviewsForm.formTitle')"
        :help="$t('web.public.reviewsForm.titleHelper')"
      )
      FormulateInput#primary-color(
        type="textColor"
        name="reviewsTitleColor"
        v-model="props.titleColor"
      )
    .reviews-section
      formulate-input(
        type="text"
        name="reviewsSubtitle"
        v-model="props.subtitle"
        :label="$t('web.public.reviewsForm.formSubtitle')"
        :help="$t('web.public.reviewsForm.subtitleHelper')"
      )
      FormulateInput#primary-color(
        type="textColor"
        name="reviewsSubtitleColor"
        v-model="props.subtitleColor"
      )
  .form__row
    formulate-input(
      type="text"
      name="reviewsUrl"
      v-model="props.url"
      :label="$t('web.public.reviewsForm.link')"
    )
</template>

<script lang="ts">
  import { Component, Vue, VModel } from "vue-property-decorator";

  type ReviewsProps = WebProps["reviews"];

  @Component({ name: "Reviews" })
  export default class Reviews extends Vue {
    @VModel() props!: ReviewsProps; // TODO: Map to inputs
  }
</script>
