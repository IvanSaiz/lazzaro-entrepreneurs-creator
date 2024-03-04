<template lang="pug">
section.public-footer
  .public-footer__header
    h2.h2--dash {{$t('web.public.footer.title')}}
    .subtitle
      h4 {{ $t('web.public.footer.subtitle') }}
      design-modal(section="footer")
  section.-public-footer__subSection
    .public-footer__header
      h3.h3--dash {{ $t('web.public.footer.socialForm.title') }}
    .public-networks__urls
      .form__row
        formulate-input(
          type="text"
          name="footerSocialFacebook"
          v-model="props.social.facebook"
          :label="$t('web.public.footer.socialForm.facebook')"
        )
        formulate-input(
          type="text"
          name="footerSocialTwitter"
          v-model="props.social.twitter"
          :label="$t('web.public.footer.socialForm.twitter')"
        )
      .form__row  
        formulate-input(
          type="text"
          name="footerSocialLinkedIn"
          v-model="props.social.linkedIn"
          :label="$t('web.public.footer.socialForm.linkedin')"
        )
        formulate-input(
          type="text"
          name="footerSocialWhatsapp"
          v-model="props.social.whatsapp"
          :label="$t('web.public.footer.socialForm.whatsapp')"
        )
      .form__row  
        formulate-input(
          type="text"
          name="footerSocialSecondaryWeb"
          v-model="props.social.secondaryWeb"
          :label="$t('web.public.footer.socialForm.web')"
        )
        formulate-input(
          type="text"
          name="footerSocialInstagram"
          v-model="props.social.instagram"
          :label="$t('web.public.footer.socialForm.instagram')"
        )
  section.public-footer__subSection 
    .public-footer__header
      h3.h3--dash {{ $t('web.public.footer.termsForm.title') }}
    .form__row
      lz-editor-input(
        :label="$t('web.public.footer.termsForm.terms')"
        v-model="props.info.terms"
      )
    .form__row
      lz-editor-input(
        :label="$t('web.public.footer.termsForm.transparencyDescription')"
        v-model="props.info.transparency.description"
      )
    .form__row
      formulate-input(
        type="file"
        name="footerTransparencyAccountability"
        v-model="props.info.transparency.accountability"
        :label="$t('web.public.footer.termsForm.accountability')"
        :add-label="$t('web.public.footer.termsForm.add')"
        :multiple="true"
      )
</template>

<script lang="ts">
  import { Component, Vue, VModel } from "vue-property-decorator";
  import DesignModal from "@/components/DesignModal.vue";
  import LzEditorInput from "@/components/EditorInput.vue";

  type FooterProps = WebProps["footer"];

  @Component({ name: "Footer", components: { DesignModal, LzEditorInput } })
  export default class Footer extends Vue {
    @VModel() props!: FooterProps;
  }
</script>
