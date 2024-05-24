<template lang="pug">
section.public-contact
  .public-contact__header
    h2.h2--dash {{ $t('web.public.contactForm.title') }}
    .subtitle
      h3 {{ $t('web.public.contactForm.subtitle') }}
      design-modal(section="contact")
        template(#header)
          h4 {{ $t('web.public.contactForm.title') }}
        template(#form)
          h2.h2--dash {{ $t('web.public.contactForm.design.color') }}
          FormulateInput(
            type="textColor"
            name="contactDesignBackgroundColor"
            v-model="props.design.backgroundColor"
          )
    .public-contact__content
      .form__row
        formulate-input(
          type="text"
          name="contactTitle"
          v-model="props.title"
          validation="required"
          :label="$t('web.public.contactForm.form.title')"
        )
        formulate-input(
          type="textColor"
          name="contactTitleColor"
          v-model="props.titleColor"
          :label="$t('web.public.contactForm.form.titleColor')"
        )
      .form__row
        formulate-input(
          type="text"
          name="contactSubTitle"
          v-model="props.subTitle"
          validation="required"
          :label="$t('web.public.contactForm.form.subtitle')"
        )
        formulate-input(
          type="textColor"
          name="contactSubTitleColor"
          v-model="props.subTitleColor"
          :label="$t('web.public.contactForm.form.subtitleColor')"
        )
</template>

<script lang="ts">
  import Vue from "vue";
  import { Component, VModel } from "vue-property-decorator";
  import DesignModal from "@/components/DesignModal.vue";

  type ContactProps = WebProps["contact"];

  @Component({
    components: {
      DesignModal
    }
  })
  export default class Contact extends Vue {
    @VModel() props!: ContactProps;
  }
</script>

<style lang="scss">
  section.public-contact {
    h4 {
      margin: 1.8rem 0;
      font-size: 16px;
      color: $color-black-03;
    }

    &__content {
      display: flex;
      width: 100%;

      .formulate-input:first-child {
        flex-grow: 0;
        margin-right: 32px;
      }

      .formulate-input:last-child {
        flex-grow: 1;
      }
    }
  }
</style>
