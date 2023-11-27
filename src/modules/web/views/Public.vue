<template lang="pug">
#public
    lz-modal(v-if="showModal" @close="onModalClose")
      h2.changeTemplateModal__title {{ modalText.title }}
      p.changeTemplateModal__subtitle(v-html="modalText.subtitle")

      .changeTemplateModal__actions
        lz-button(type="secondary" @click="onModalClose") {{ $t('common.actions.cancel') }}
        
    header
      h1 {{ $t('web.public.title') }}
      p {{ $t('web.public.subtitle') }}

    formulate-form(
      v-model="publicWebForm"
      @submit="onPublicWebSubmit"
      :keep-model-data="true"
      v-if="loaded"
    )
      section.public-general
        .public-general__header
          h2.h2--dash {{ $t('web.public.generalForm.title') }}
        .public-general__publish
          .form__row
            formulate-input(
              type="toggle"
              :label="$t('web.public.generalForm.publicate')"
              :under-label="$t('web.public.generalForm.status.label')"
              name="active"
            )
            .public-general__view-btn
              a(:href="'https://' + publicWebForm.url" target="_blank")
                span {{ $t('web.public.generalForm.seeWeb') }}
                ArrowUpRightIcon
          .form__row
            formulate-input(
              type="url"
              :label="$t('web.public.generalForm.url')"
              name="url"
              disabled
            )            

      <choose-template :chosenTemplateId='publicWebForm.chosenTemplateId' :handleChooseTemplate='handleChooseTemplate' />

      section.public-personalizeWeb
        .public-personalizeWeb__header
          h2.h2--dash {{ $t('web.public.personalizeWebForm.title') }}
          h3 {{ $t('web.public.personalizeWebForm.subtitle') }}

        .form__row
          FormulateInput(
            type="image"
            :label="$t('web.public.personalizeWebForm.form.logo')"
            label-position="before"
            name="styleLogo"
            :help="$t('web.public.personalizeWebForm.form.logoHelper')"
          )
          .form-section
            FormulateInput(
              type="select"
              name="styleMainTypography"
              :label="$t('web.public.personalizeWebForm.form.mainTypography')"
              :label-class="['required']"
              :options="fontOptions"
              validation="required"
              :validation-name="$t('web.public.personalizeWebForm.form.fonts.label')"
              :placeholder="$t('auth.signup.form.choose')"
            )  
            FormulateInput(
              type="select"
              name="styleSecondaryTypography"
              :label="$t('web.public.personalizeWebForm.form.secondTypography')"
              :label-class="['required']"
              :options="fontOptions"
              validation="required"
              :validation-name="$t('auth.onboarding.stepStyle.form.style')"
              :placeholder="$t('auth.signup.form.choose')"
            )
            .form-colors
              FormulateInput#primary-color(
                type="textColor"
                name="styleButtonColor"
                :label="$t('web.public.personalizeWebForm.form.buttonsColor')"
                value="#1081F2"
                )
              FormulateInput#primary-color(
                type="textColor"
                name="styleMenuColor"
                :label="$t('web.public.personalizeWebForm.form.menuColor')"
                value="#1081F2"
                )
              FormulateInput#primary-color(
                type="textColor"
                name="styleFooterColor"
                :label="$t('web.public.personalizeWebForm.form.footerColor')"
                value="#1081F2"
                )

          


      section.public-homepage
        .public-homepage__header
          h2.h2--dash {{ $t('web.public.homepageForm.title') }}
          h3 {{ $t('web.public.homepageForm.subtitle') }}
          .form__row
            FormulateInput(
              type="image"
              :label="$t('web.public.homepageForm.form.image')"
              label-position="before"
              name="homepageMainImage"
              :help="$t('web.public.homepageForm.form.imageHelper')"
            )
            .form-section
              .section-row
                formulate-input(
                    type="text"
                    name="homepageTitle"
                    :label="$t('web.public.homepageForm.form.title')"
                    :help="$t('web.public.homepageForm.form.titleHelper')"
                  )
                FormulateInput#primary-color(
                  type="textColor"
                  name="homepageTitleColor"
                  :label="$t('auth.onboarding.stepStyle.form.textColour')"
                  value="#1081F2"
                  )
              .section-row
                formulate-input(
                    type="text"
                    name="homepageSubtitle"
                    :label="$t('web.public.homepageForm.form.subtitle')"
                    :help="$t('web.public.homepageForm.form.subtitleHelper')"
                  )
                FormulateInput#primary-color(
                  type="textColor"
                  name="homepageSubtitleColor"
                  :label="$t('auth.onboarding.stepStyle.form.textColour')"
                  value="#1081F2"
                  )
              .form-section__cta(v-for="index in 2" :key="index")            
                formulate-input(
                  type="text"
                  :name="`homepageButton[${index}]Text`"
                  :label="$t(`web.public.homepageForm.form.buttons.${index}`)"
                )
                formulate-input(
                  type="text"
                  :name="`homepageButton${index}Link`"
                  :label="$t(`web.public.homepageForm.form.links.${index}`)"
                )

      section.public-whoWeAre
        .public-whoWeAre__header
          h2.h2--dash {{ $t('web.public.whoWeAreForm.title') }}
          h3 {{ $t('web.public.whoWeAreForm.subtitle') }}
          .form__row
            FormulateInput(
              type="image"
              :label="$t('web.public.whoWeAreForm.form.image')"
              label-position="before"
              name="aboutUsImgUrl"
              :help="$t('web.public.whoWeAreForm.form.imageHelper')"
            )
            .form-section
              .section-row
                formulate-input(
                    type="text"
                    name="aboutUsTitle"
                    :label="$t('web.public.whoWeAreForm.form.title')"
                    :help="$t('web.public.whoWeAreForm.form.titleHelper')"
                  )
                FormulateInput#primary-color(
                  type="textColor"
                  name="aboutUs.titleColor"
                  :label="$t('auth.onboarding.stepStyle.form.textColour')"
                  value="#1081F2"
                  )
              .section-row
                formulate-input(
                    type="text"
                    name="aboutUsSubtitle"
                    :label="$t('web.public.whoWeAreForm.form.subtitle')"
                    :help="$t('web.public.whoWeAreForm.form.subtitleHelper')"
                  )
                FormulateInput#primary-color(
                  type="textColor"
                  name="aboutUsSubtitleColor"
                  :label="$t('auth.onboarding.stepStyle.form.textColour')"
                  value="#1081F2"
                  )
              lz-editor-input(
              :label="$t('web.public.whoWeAreForm.form.description')"
              v-model="publicWebForm.aboutUsDescription"
              )
        section.public-whoWeAre
          .public-whoWeAre__header
            h3.h3--dash {{ $t('web.public.whoWeAreForm.features.title') }}


          .public-whoWeAre__content
            .text-item(v-for="featureIndex in 4" :key="`feature-${featureIndex}`")
              formulate-input(
                type="image"
                :name="`aboutUsFeature${featureIndex}Url`"
                :label="$t(`web.public.whoWeAreForm.features.icon.${featureIndex}`)"
                :help="$t('web.public.whoWeAreForm.features.icon.help')"
              )
              formulate-input(
                type="text"
                :name="`aboutUsFeature${featureIndex}Title`"
                :label="$t(`web.public.whoWeAreForm.features.titles.${featureIndex}`)"
              )
              formulate-input(
                type="text"
                :name="`aboutUsFeature${featureIndex}Description`"
                :label="$t(`web.public.whoWeAreForm.features.descriptions.${featureIndex}`)"
              )

        hr.hr--dash
      
        .public-whoWeAre__cta
          formulate-input(
            type="text"
            name="aboutUsReadMoreButtonText"
            :label="$t('web.public.whoWeAreForm.features.button')"
          )
          formulate-input(
            type="text"
            name="aboutUsReadMoreButtonLnk"
            :label="$t('web.public.whoWeAreForm.features.link')"
          )

      section.public-whyUs
        .public-whyUs__header
          h2.h2--dash {{ $t('web.public.whyChooseUsForm.title') }}
          h3 {{ $t('web.public.whyChooseUsForm.subtitle') }}
          .form__row
            FormulateInput(
              type="image"
              :label="$t('web.public.whyChooseUsForm.image')"
              label-position="before"
              name="whyChooseUsImgUrl"
              :help="$t('web.public.whyChooseUsForm.imageHelperText')"
            )
            .form-section
              .section-row
                formulate-input(
                    type="text"
                    name="whyChooseUsTitle"
                    :label="$t('web.public.whyChooseUsForm.formTitle')"
                    :help="$t('web.public.whyChooseUsForm.titleHelperText')"
                  )
                FormulateInput#primary-color(
                  type="textColor"
                  name="whyChooseUsTitleColor"
                  :label="$t('auth.onboarding.stepStyle.form.textColour')"
                  value="#1081F2"
                  )
              lz-editor-input(
              :label="$t('web.public.whyChooseUsForm.description')"
              v-model="publicWebForm.whyChooseUsDescription"
              )
          .public-whyUs__content
            .text-item(v-for="index in 4" :key="`whyChooseUsSubtitle${index}Id`")
              formulate-input(
                type="text"
                :name="`whyChooseUsSubtitle${index}Title`"
                :label="$t(`web.public.whyChooseUsForm.titles.${index}`)"
              )
              formulate-input(
                type="text"
                :name="`whyChooseUsSubtitle${index}Description`"
                :label="$t(`web.public.whyChooseUsForm.descriptions.${index}`)"
              )


      section.public-bookings
        .public-bookings__header
          h2.h2--dash {{ $t('web.public.bookingsForm.title') }}
          h3 {{ $t('web.public.bookingsForm.subtitle') }}
          .form__row
            FormulateInput(
              type="image"
              :label="$t('web.public.brandForm.logo.label')"
              label-position="before"
              name="bookingsImgUrl"
              :help="$t('web.public.brandForm.logo.help')"
            )
            .form-section
              .section-row
                formulate-input(
                    type="text"
                    name="bookingsTitle"
                    :label="$t('web.public.bookingsForm.formTitle')"
                    :help="$t('web.public.bookingsForm.titleHelper')"
                  )
                FormulateInput#primary-color(
                  type="textColor"
                  name="bookingsTitleColor"
                  :label="$t('auth.onboarding.stepStyle.form.textColour')"
                  value="#1081F2"
                  )
              .section-row
                formulate-input(
                    type="text"
                    name="bookingsSubtitle"
                    :label="$t('web.public.bookingsForm.formSubtitle')"
                    :help="$t('web.public.bookingsForm.subtitleHelper')"
                  )
                FormulateInput#primary-color(
                  type="textColor"
                  name="bookingsSubtitleColor"
                  :label="$t('auth.onboarding.stepStyle.form.textColour')"
                  value="#1081F2"
                  )
              .links-row
                formulate-input(
                  type="text"
                  name="bookingsButtonText"
                  :label="$t('web.public.bookingsForm.button')"
                )
                formulate-input(
                  type="text"
                  name="bookingsButtonUrl"
                  :label="$t('web.public.bookingsForm.link')"
                )
      
      section.public-reviews
        .public-reviews__header
          h2.h2--dash {{ $t('web.public.reviewsForm.title') }}
          h3 {{ $t('web.public.reviewsForm.subtitle') }}
        .public-reviews__title
          .reviews-section
            formulate-input(
              type="text"
              name="reviewsTitle"
              :label="$t('web.public.reviewsForm.formTitle')"
              :help="$t('web.public.reviewsForm.titleHelper')"
            )
            FormulateInput#primary-color(
              type="textColor"
              name="reviewsTitleColor"
              :label="$t('auth.onboarding.stepStyle.form.textColour')"
              value="#1081F2"
              )

          .reviews-section
            formulate-input(
              type="text"
              name="reviewsSubtitle"
              :label="$t('web.public.reviewsForm.formSubtitle')"
              :help="$t('web.public.reviewsForm.subtitleHelper')"
            )
            FormulateInput#primary-color(
              type="textColor"
              name="reviewsSubtitleColor"
              :label="$t('auth.onboarding.stepStyle.form.textColour')"
              value="#1081F2"
              )
        .form__row
          formulate-input(
            type="text"
            name="reviewsUrl"
            :label="$t('web.public.reviewsForm.link')"
          )

      section.public-impact
        .public-impact__header
          h2.h2--dash {{ $t('web.public.impactForm.title') }}
          p {{ $t('web.public.impactForm.subtitle') }}
          .public-impact__content
            .impact-item(v-for="index in 4" :key="`impactData${index}Id`")
              formulate-input(
                type="image"
                :name="`impactData${index}]Url`"
                :label="$t(`web.public.impactForm.icon.${index}`)"
                :help="$t('web.public.impactForm.icon.help')"
              )
              formulate-input(
                type="text"
                :name="`impactData${index}Text`"
                :label="$t(`web.public.impactForm.text.${index}`)"
              )
              formulate-input(
                type="text"
                :name="`impactData${index}Amount`"
                :label="$t(`web.public.impactForm.amount.${index}`)"
              )

      section.public-team
        .public-team__header
          h2.h2--dash {{ $t('web.public.teamForm.title') }}
          h4 {{ $t('web.public.teamForm.subtitle') }}
          .public-team__title
            .team-section
              formulate-input(
                type="text"
                name="teamTitle"
                :label="$t('web.public.teamForm.header.title')"
                :help="$t('web.public.teamForm.header.titleHelperText')"
              )
              FormulateInput#primary-color(
                  type="textColor"
                  name="teamTitleColor"
                  :label="$t('auth.onboarding.stepStyle.form.textColour')"
                  value="#1081F2"
                )
            .team-section
              formulate-input(
                type="text"
                name="teamSubtitle"
                :label="$t('web.public.teamForm.header.subtitle')"
                :help="$t('web.public.teamForm.header.subtitleHelperText')"
              )
              FormulateInput#primary-color(
                  type="textColor"
                  name="teamSubtitleColor"
                  :label="$t('auth.onboarding.stepStyle.form.textColour')"
                  value="#1081F2"
                )

        .public-team__header
          h3.h3--dash {{ $t('web.public.teamForm.teamMembers.title') }}
          h4 {{ $t('web.public.teamForm.teamMembers.subtitle') }}
        FormulateForm.public-team__form(
          v-model="teamForm"
          @submit="onTeamSubmit"
          :keep-model-data="true"
        )
          .public-team__image
            formulate-input(
              type="image"
              name="picture"
              :label="$t('web.public.teamForm.photo.label')"
              :help="$t('web.public.teamForm.photo.help')"
            )
          .public-team__texts
            .form__row
              formulate-input(
                type="text"
                name="name"
                :label="$t('web.public.teamForm.name')"
              )
              formulate-input(
                type="text"
                name="position"
                :label="$t('web.public.teamForm.position')"
              )
            .form__row
              formulate-input(
                type="text"
                name="linkedin"
                :label="$t('web.public.teamForm.linkedin')"
              )
            .form__row  
              lz-button(type="secondary") {{ $t('web.public.teamForm.newMember') }}

        hr.hr--dash
        transition(name="fade")
          .title-table-container   
            lz-table(
              class="lz-table"
              v-if="publicWebForm.teamMembers.length > 0"
              :fields="teamFields"
              :items="publicWebForm.teamMembers"
              :title="$t('web.public.teamForm.table')"
            )
              template(#dot="{ row }")
                DotsIcon        
              template(#name="{ row: { name } }") {{ name }}
              template(#position="{ row: { position } }") {{ position }}
              template(#linkedin="{ row: { linkedin } }") {{ linkedin }}
              template(#delete="{ row }")
                XIcon(@click="removeTeamMember(row)")

      section.public-contact
        .public-contact__header
          h2.h2--dash {{ $t('web.public.contactForm.title') }}
          h4 {{ $t('web.public.contactForm.subtitle') }}
          .public-contact__content
            formulate-input(
              type="text"
              name="contactTitle"
              :label="$t('web.public.contactForm.phone')"
            )
            formulate-input(
              type="text"
              name="contactSubTitle"
              :label="$t('web.public.contactForm.location')"
            )

      section.public-footer
        .public-footer__header
          h2.h2--dash {{$t('web.public.footer.title')}}
          h4 {{ $t('web.public.footer.subtitle') }}
        section.-public-footer__subSection
          .public-footer__header
            h3.h3--dash {{ $t('web.public.footer.socialForm.title') }}

          .public-networks__urls
            .form__row
              formulate-input(
                type="text"
                name="footerSocialFacebook"
                :label="$t('web.public.footer.socialForm.facebook')"
              )
              formulate-input(
                type="text"
                name="footerSocialTwitter"
                :label="$t('web.public.footer.socialForm.twitter')"
              )
            .form__row  
              formulate-input(
                type="text"
                name="footerSocialLinkedIn"
                :label="$t('web.public.footer.socialForm.linkedin')"
              )
              formulate-input(
                type="text"
                name="footerSocialWhatsapp"
                :label="$t('web.public.footer.socialForm.whatsapp')"
              )
            .form__row  
              formulate-input(
                type="text"
                name="footerSocialSecondaryWeb"
                :label="$t('web.public.footer.socialForm.web')"
              )
              formulate-input(
                type="text"
                name="footerSocialInstagram"
                :label="$t('web.public.footer.socialForm.instagram')"
              )


        section.public-footer__subSection 
          .public-footer__header
            h3.h3--dash {{ $t('web.public.footer.termsForm.title') }}

          .form__row
            lz-editor-input(
              :label="$t('web.public.footer.termsForm.terms')"
              v-model="publicWebForm.footerTerms"
            )
          .form__row
            lz-editor-input(
              :label="$t('web.public.footer.termsForm.transparencyDescription')"
              v-model="publicWebForm.footerTransparencyDescription"
            )
          .form__row
            formulate-input(
              type="file"
              name="footerTransparencyAccountability"
              :label="$t('web.public.footer.termsForm.accountability')"
              :add-label="$t('web.public.footer.termsForm.add')"
              :multiple="true"
            )

  
    .public-buttons
      lz-button(
        type="secondary"
        class='cancel-btn'
        @click.prevent="$router.push({ name: 'Home' })"
      ) {{ $t('common.actions.cancel') }}
      
      lz-button(type="primary" class="save-btn" @click.prevent="onPublicWebSubmit" :disabled='!isFormChanged') {{ $t('common.actions.save') }}
</template>

<script lang="ts">
  /* eslint-disable */

  import { Component, Vue } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import cloneDeep from "lodash/cloneDeep";
  import isObjectEmpty from "lodash/isEmpty";
  import isEqual from "lodash/isEqual";
  import LzButton from "@/components/Button.vue";
  import LzTable from "@/components/Table.vue";
  import LzEditorInput from "@/components/EditorInput.vue";
  import LzModal from "@/components/Modal.vue";
  import { DotsIcon } from "@/components";
  import { checkSubscriptionPlan } from "@/utils";
  import { parseFile } from "@/utils/parseFile";
  import { apiBrand, apiWebsite } from "../api";
  import { ChooseTemplate } from "../components";

  const auth = namespace("auth");

  @Component({
    components: {
      LzButton,
      LzTable,
      LzEditorInput,
      ChooseTemplate,
      LzModal,
      DotsIcon
    }
  })
  export default class Public extends Vue {
    showModal = false;
    modalText = {
      title: "",
      subtitle: ""
    };

    prevForm: PublicWebForm | {} = {};

    publicWebForm: PublicWebForm = {
      active: false,
      url: "",
      chosenTemplateId: "9bdd56dc-edf8-432a-bff4-fb5f2fc0e90c",

      // style properties
      styleLogo: [] as any,
      styleMainTypography: "",
      styleSecondaryTypography: "",
      styleButtonColor: "#FF5733",
      styleMenuColor: "#0055A5",
      styleFooterColor: "#008000",

      // homepage properties
      homepageMainImage: [] as any,
      homepageMoreImages: [] as any,
      homepageTitle: "Welcome to Our Website",
      homepageTitleColor: "#FF5733",
      homepageSubtitle: "Discover Our Services",
      homepageSubtitleColor: "#3366FF",
      homepageButton1Text: "Learn More",
      homepageButton1Link: "https://www.example.com/more-info",
      homepageButton2Text: "Contact Us",
      homepageButton2Link: "https://www.example.com/contact-us",
      homepageDesignLayout: "left",
      homepageDesignBackgroundColor: "#EFEFEF",

      // aboutUs properties
      aboutUsImgUrl: [] as any,
      aboutUsTitle: "About Us",
      aboutUsTitleColor: "#FF5733",
      aboutUsSubtitle: "Our Story",
      aboutUsSubtitleColor: "#3366FF",
      aboutUsDescription:
        "Learn about our journey and how we make a difference.",
      aboutUsFeature1Id: 1,
      aboutUsFeature1Url: [] as any,
      aboutUsFeature1Title: "Feature 1",
      aboutUsFeature1Description: "Description for Feature 1",
      aboutUsFeature2Id: 2,
      aboutUsFeature2Url: [] as any,
      aboutUsFeature2Title: "Feature 2",
      aboutUsFeature2Description: "Description for Feature 2",
      aboutUsFeature3Id: 3,
      aboutUsFeature3Url: [] as any,
      aboutUsFeature3Title: "Feature 3",
      aboutUsFeature3Description: "Description for Feature 3",
      aboutUsFeature4Id: 4,
      aboutUsFeature4Url: [] as any,
      aboutUsFeature4Title: "Feature 4",
      aboutUsFeature4Description: "Description for Feature 4",
      aboutUsReadMoreButtonId: 1,
      aboutUsReadMoreButtonText: "Read More",
      aboutUsReadMoreButtonLink: "https://www.example.com/feature1",

      // whyChooseUs properties
      whyChooseUsImgUrl: [] as any,
      whyChooseUsTitle: "Why Choose Us",
      whyChooseUsTitleColor: "#FFFFFF",
      whyChooseUsDescription:
        "Discover the reasons to choose our company for your needs.",
      whyChooseUsSubtitle1Id: 1,
      whyChooseUsSubtitle1Title: "Quality Services",
      whyChooseUsSubtitle1Description:
        "We offer top-notch services with a focus on client satisfaction.",
      whyChooseUsSubtitle2Id: 2,
      whyChooseUsSubtitle2Title: "Experienced Team",
      whyChooseUsSubtitle2Description: "Our team consists of experienced professionals in the industry.",
      whyChooseUsSubtitle3Id: 3,
      whyChooseUsSubtitle3Title: "Innovative Solutions",
      whyChooseUsSubtitle3Description: "We provide innovative solutions to complex challenges.",
      whyChooseUsSubtitle4Id: 4,
      whyChooseUsSubtitle4Title: "Customer Focus",
      whyChooseUsSubtitle4Description: "Dedicated to meeting and exceeding customer expectations.",

      // ... similarly for other subtitles
      whyChooseUsDesignLayout: "right",
      whyChooseUsDesignBackgroundColor: "#F0F0F0",

      // bookings properties
      bookingsImgUrl: [] as any,
      bookingsTitle: "Book a Consultation",
      bookingsTitleColor: "#3366FF",
      bookingsSubtitle: "Reserve Your Spot",
      bookingsSubtitleColor: "#FFFFFF",
      bookingsButtonUrl: "https://www.example.com/book-now",
      bookingsButtonText: "Book Now",
      bookingsDesignLayout: "center",
      bookingsDesignBackgroundColor: "#F0F0F0",

      // reviews properties
      reviewsTitle: "What Our Clients Say",
      reviewsTitleColor: "#FFFFFF",
      reviewsSubtitle: "Client Testimonials",
      reviewsSubtitleColor: "#3366FF",
      reviewsUrl: "https://lazzaro.io/en/",

      // impact properties
      impactData1Id: 1,
      impactData1Url: [] as any,
      impactData1Text: "Positive Impact One",
      impactData1Amount: "$1000",
      impactData2Id: 2,
      impactData2Url: [] as any,
      impactData2Text: "Positive Impact Two",
      impactData2Amount: "$2000",
      impactData3Id: 3,
      impactData3Url: [] as any,
      impactData3Text: "Positive Impact Three",
      impactData3Amount: "$3000",
      impactData4Id: 4,
      impactData4Url: [] as any,
      impactData4Text: "Positive Impact Four",
      impactData4Amount: "$4000",
      impactDesignBackgroundColor: "#FFF0F0",
      impactDesignBackgroundImage:
        "https://dummyimage.com/600x400/000/fff&text=Impact+Background",

      // team properties
      teamTitle: "Our Dynamic Team",
      teamSubtitle: "Meet the Innovators Behind Our Success",
      teamTitleColor: "#333333",
      teamSubtitleColor: "#666666",
      teamMembers: [  {
            id: 1,
            picture: [] as any,
            name: "Jane Doe",
            linkedin: "https://www.linkedin.com/in/janedoe",
            position: "Chief Technology Officer"
          },
          {
            id: 2,
            picture: [] as any,
            name: "John Smith",
            linkedin: "https://www.linkedin.com/in/johnsmith",
            position: "Marketing Director"
          }],
      teamDesignBackgroundColor: "#F0F0F0",
      
      // contact properties
      contactTitle: "Get in Touch",
      contactDesignBackgroundColor: "#EFEFEF",
      contactSubTitle: "We're Here to Help",
      contactTitleColor: "#333333",
      contactSubtitleColor: "#666666",

      // footer properties
      footerTerms: "Terms of Service: All rights reserved.",
      footerTransparencyAccountability: [] as any,
      footerTransparencyDescription: "We value transparency and openness.",
      footerSocialFacebook: "https://facebook.com/example",
      footerSocialTwitter: "https://twitter.com/example",
      footerSocialLinkedIn: "https://www.linkedin.com/company/example",
      footerSocialWhatsapp: "+123456789",
      footerSocialSecondaryWeb: "https://example-secondary.com",
      footerSocialInstagram: "https://instagram.com/example",
      footerDesignBackgroundColor: "#333333",
      footerDesignBackgroundImage:
        "https://dummyimage.com/600x200/000/fff&text=Footer+Background",
    };

    fontOptions = {
      roboto: this.$t("web.public.personalizeWebForm.form.fonts.roboto"),
      arial: this.$t("web.public.personalizeWebForm.form.fonts.arial")
    };

    teamForm = {
      id: "",
      picture: null,
      name: "",
      position: "",
      linkedin: ""
    };

    teamFields = [
      { id: "dot", label: this.$t("web.public.teamForm.delete") },
      { id: "name", label: this.$t("web.public.teamForm.name") },
      { id: "position", label: this.$t("web.public.teamForm.position") },
      { id: "linkedin", label: this.$t("web.public.teamForm.linkedin") },
      { id: "delete", label: this.$t("web.public.teamForm.delete") }
    ];

    loaded = false;

    @auth.State("id")
    public memberId!: string;

    @auth.State("email")
    public email!: string;

    @auth.State("websiteId")
    public websiteId!: string;

    @auth.State("templateId")
    public templateId!: string;

    @auth.State("isActive")
    public isActive!: string;

    @auth.State("ongConfiguration")
    public ongConfiguration!: any;

    handleChooseTemplate(e: Event & { target: HTMLInputElement }) {
      if (isObjectEmpty(this.prevForm)) return;
      this.publicWebForm.chosenTemplateId = e.target.value;
    }

    onModalClose(): void {
      this.showModal = false;
    }

    onModalOpen(): void {
      this.showModal = true;
    }

    get isFormChanged(): boolean {
      if (isObjectEmpty(this.prevForm)) return false;
      return !isEqual(this.prevForm, this.publicWebForm);
    }

    async handlePublishWebsite(active: boolean, websiteId: string) {
      try {
        //TODO: update the member to be active
        // if (active === this.isActive) return;

        if (active) {
          this.modalText = {
            title: this.$tc("web.public.websiteStatus.publishWebsite.title"),
            subtitle: this.$tc(
              "web.public.websiteStatus.publishWebsite.subtitle"
            )
          };

          this.onModalOpen();
          await apiWebsite.publishWebsite(websiteId);
        } else {
          this.modalText = {
            title: this.$tc("web.public.websiteStatus.unpublishWebsite.title"),
            subtitle: this.$tc(
              "web.public.websiteStatus.unpublishWebsite.subtitle"
            )
          };

          this.onModalOpen();

          await apiWebsite.unpublishWebsite(websiteId);
        }

        this.onModalClose();
      } catch (err) {
        this.$notify({
          type: "error",
          text: this.$tc("web.public.notify.error")
        });
        this.onModalClose();
      }
    }

    removeTeamMember(e: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const teamArr = this.publicWebForm.teamMembers as any[];
      const memberIdx = teamArr.findIndex(el => el === e);
      teamArr.splice(memberIdx, 1);
    }

    onTeamSubmit() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const teamArr = this.publicWebForm.teamMembers as any[];

      teamArr.push({
        id: this.publicWebForm.teamMembers.length + 1,
        name: this.teamForm.name,
        position: this.teamForm.position,
        linkedin: this.teamForm.linkedin,
        picture: this.teamForm.picture
      });

      this.teamForm = {
        id: "",
        picture: null,
        name: "",
        position: "",
        linkedin: ""
      };
    }

    async mounted() {
      try {
        const data = await apiWebsite.getWebsiteSections(this.websiteId, "web");

        this.publicWebForm.chosenTemplateId = data.templateId;
        this.publicWebForm.url = data.properties.general.url;
        this.loaded = true;
      } catch (error) {
        console.error("Error fetching data:", error);
        this.$notify({
          type: "error",
          text: this.$tc("web.public.notify.error"),
          ignoreDuplicates: true
        });
      }

      // not perfect but it works for now
      setTimeout(() => {
        this.prevForm = cloneDeep(this.publicWebForm);
      }, 1000);
    }

    async onPublicWebSubmit() {
      console.log(this.publicWebForm);
      console.log(this.publicWebForm.footer.info.transparency.accountability);
      const accountability = (
        await parseFile(
          this.publicWebForm.footer.info.transparency.accountability
        )
      ).map((file: any, key: any) => {
        return {
          file,
          title: this.publicWebForm.footer.info.transparency.accountability
            .files[key].name
        };
      });

      console.log(accountability);

      // const team = [];
      // for await (const member of this.publicWebForm.team.members) {
      //   if (member.picture && member.picture.files) {
      //     let photo = await parseFile(member.picture);
      //     photo = photo[0];
      //     team.push({ ...member, photo });
      //   } else {
      //     team.push({ ...member });
      //   }
      // }

      const imagesToRemove = [];

      const hasTemplateChanged =
        this.publicWebForm.chosenTemplateId !== this.templateId;

      if (hasTemplateChanged) {
        this.modalText = {
          title: this.$tc(
            "web.public.chooseTemplate.templateChangeModal.title"
          ),
          subtitle: this.$tc(
            "web.public.chooseTemplate.templateChangeModal.subtitle"
          )
        };

        this.onModalOpen();
      }

      // to disable submit button
      this.prevForm = {};

      // Promise.all([
      // apiOngs.postPlatformConfig(this.ongId, {
      //   ...this.ongConfiguration,
      //   isActive: this.publicWebForm.isActive,
      //   powered_by_lazzaro: this.publicWebForm.powered_by_lazzaro,
      //   url: this.publicWebForm.url,
      //   template_id: this.publicWebForm.chosenTemplateId
      // }),

      // this.handlePublishWebsite(this.publicWebForm.active, this.websiteId)
      // ])
      //   .then(async () => {
      //     this.$notify({
      //       type: "success",
      //       text: this.$tc("web.public.notify.success"),
      //       ignoreDuplicates: true
      //     } as NotificationOptions);

      // await this.updateFeatures();
      // })
      // .catch(() => {
      //   this.$notify({
      //     type: "error",
      //     text: this.$tc("web.public.notify.error"),
      //     ignoreDuplicates: true
      //   } as NotificationOptions);
      // });
      this.prevForm = cloneDeep(this.publicWebForm);
    }
  }
</script>

<style lang="scss">
  #public {
    section {
      margin-top: 40px;
    }

    .public {
      &-general {
        & > * {
          margin-bottom: 20px;
        }

        &__view-btn {
          text-align: right;
          span {
            color: $color-black-01;
            font-size: 16px;
            text-decoration: underline;

            &:hover {
              cursor: pointer;
            }
          }

          svg {
            stroke: $color-black-01;
          }
          a {
            display: flex;
            justify-content: end;
            align-items: center;
          }
        }
      }
      &-logos {
        &__header {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        &__subtitle {
          font-size: 16px;
          color: $color-black-04;
        }

        &__content {
          .public-logos__images {
            display: flex;
            gap: 0.8rem;
            margin-top: 1.2rem;
            align-items: center;
            flex-wrap: wrap;
            .public-logos__images__image {
              position: relative;
              cursor: pointer;
              padding-block: 2rem;
              flex-basis: 8%;
              margin-right: 34px;
              button:not(.public-logos__images__image--delete) {
                width: 100%;
                height: 11rem;
                border-radius: 10px;
                background-color: white;
                justify-content: center;
                align-items: center;
                font-size: 3.2rem;
                border: $color-black-05 dashed 1px;

                span {
                  padding: 0.3rem 1.3rem;
                  border: $color-black-05 solid 4px;
                  color: $color-black-05;
                  border-radius: 50%;
                }
                &:hover:not([disabled]),
                &:hover:not([disabled]) span {
                  color: $color-green-01;
                  border-color: $color-green-01;
                }

                &:disabled {
                  opacity: 0.5;
                  cursor: not-allowed;
                }

                &:disabled span {
                  color: $color-black-02;
                  border-color: $color-black-02;
                  opacity: 0.5;
                }
              }
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 10px;
                cursor: pointer;
              }
            }
            button:not(.public-logos__images__image--delete) {
              width: 8rem;
              height: 8rem;
              display: flex;
              align-content: center;
              justify-content: center;

              & font {
                color: white !important;
                font-weight: 100 !important;
                font-size: 7rem;
                margin-bottom: 1.5rem;
              }
            }

            .public-logos__images__image--delete {
              position: absolute;
              border: none;
              outline: none;
              position: absolute;
              border: none;
              outline: none;
              top: -3px;
              cursor: pointer;
              right: -11px;

              transition: scale 0.2s ease-in-out;

              &:hover font {
                scale: 1.3;
              }

              font {
                color: $color-green-01;
                font-size: 1.3rem;
              }
            }
          }
        }
      }

      &-brand {
        &__content {
          display: flex;
          justify-content: space-between;

          .public-brand__images {
            display: flex;
            flex-grow: 0;

            .formulate-input {
              width: 137px;
              margin-right: 34px;
            }
          }

          .public-brand__details {
            flex-grow: 1;
            height: 180px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .public-brand__colors {
              display: flex;
              justify-content: space-between;

              .formulate-input {
                width: calc(50% - 12px);
              }
            }
          }
        }
      }

      &-personalizeWeb {
        &__header {
          h3 {
            color: $color-black-03;
            font-size: 16px;
            font-weight: 400;
          }
        }

        .form__row {
          > :first-child {
            flex-basis: 16.2%;
            .formulate-input-element {
              height: 148px;
            }
          }
        }
        .form-section {
          display: flex;
          flex-direction: column;
          gap: 18px;

          .form-colors {
            display: flex;
            gap: 42px;
            flex-wrap: wrap;
          }
        }
      }

      &-homepage {
        &__header {
          h3 {
            color: $color-black-03;
            font-size: 16px;
            font-weight: 400;
          }
        }
        .form__row {
          gap: 10px;
          > :first-child {
            min-width: 140px;
            .formulate-input-element {
              height: 148px;
              width: 140px;
            }
          }
        }
        .form-section {
          display: flex;
          flex-direction: column;
          .section-row {
            display: flex;
            width: 970px;

            > :first-child {
              width: 82%;
            }

            > :last-child {
              flex-grow: 1;
              margin-left: 18px;
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

      &-whoWeAre {
        &__header {
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
            .formulate-input-element {
              height: 148px;
              width: 140px;
            }
          }
        }
        .form-section {
          display: flex;
          flex-direction: column;
          .section-row {
            display: flex;
            width: 970px;

            > :first-child {
              width: 82%;
            }

            > :last-child {
              flex-grow: 1;
              margin-left: 18px;
            }
          }
        }

        &__content {
          display: inline-flex;
          align-items: flex-start;
          gap: 44px;
          margin-top: 4px;
          margin-bottom: 43px;

          .text-item {
            display: flex;
            flex-direction: column;
            width: 256px;
            gap: 24px;

            formulate-input {
              width: 100%;
            }
          }
        }
        &__cta {
          display: flex;
          margin-top: 22px;
          > :first-child {
            width: 24%;
          }
          > :last-child {
            flex-grow: 1;
            margin-left: 18px;
          }
        }
      }

      &-whyUs {
        &__header {
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
            .formulate-input-element {
              height: 148px;
              width: 140px;
            }
          }
        }
        .form-section {
          display: flex;
          flex-direction: column;
          .section-row {
            display: flex;
            width: 970px;

            > :first-child {
              width: 82%;
            }

            > :last-child {
              flex-grow: 1;
              margin-left: 18px;
            }
          }
        }

        &__content {
          display: inline-flex;
          align-items: flex-start;
          gap: 44px;
          margin-top: 4px;

          .text-item {
            display: flex;
            flex-direction: column;
            width: 256px;
            gap: 24px;

            formulate-input {
              width: 100%;
            }
          }
        }
      }

      &-bookings {
        &__header {
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
            .formulate-input-element {
              height: 148px;
              width: 140px;
            }
          }
        }
        .form-section {
          display: flex;
          flex-direction: column;
          .section-row {
            display: flex;
            width: 970px;

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
      &-reviews {
        &__header {
          h3 {
            color: $color-black-03;
            font-size: 16px;
            font-weight: 400;
          }
        }

        &__title {
          display: flex;
          align-items: flex-start;
          gap: 30px;
          width: 100%;

          .reviews-section {
            display: flex;
            width: 563px;
            gap: 18px;

            .formulate-input-element--text {
              width: 382px;
            }
            .formulate-input[data-classification="text-color"] {
              width: 153px;
            }
          }
        }
      }
      &-impact {
        &__content {
          display: inline-flex;
          align-items: flex-start;
          gap: 43px;
          margin-top: 42px;

          .impact-item {
            display: flex;
            flex-direction: column;
            width: 256px;
            gap: 24px;

            formulate-input {
              width: 100%;
            }
          }
        }
      }

      &-contact {
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

      &-content {
        &__group {
          margin: 0 16px;
        }

        &__header {
          margin-bottom: 20px;
        }

        &__toggles {
          display: flex;
          flex-wrap: wrap;
          margin: 0 -16px;
        }
      }

      &-networks {
        &__urls {
          .formulate-input {
            margin-bottom: 20px;
          }
        }
      }

      &-footer {
        margin-bottom: 20px;

        &__header {
          margin-bottom: 20px;
          h4 {
            color: $color-black-03;
            font-size: 16px;
          }
          h3 {
            font-size: 18px;
            font-weight: 400;
            line-height: normal;
          }
        }

        &__subSection {
          flex-grow: 1;
          .formulate-input-label {
            color: $color-black-03;
            font-size: 15px;
          }
        }
      }

      &-team {
        &__title {
          display: flex;
          align-items: flex-start;
          gap: 30px;
          width: 100%;

          .team-section {
            display: flex;
            width: 563px;
            gap: 18px;

            .formulate-input-element--text {
              width: 382px;
            }
            .formulate-input[data-classification="text-color"] {
              width: 153px;
            }
          }
        }
        h3 {
          color: $color-black-03;
          font-size: 16px;
          font-weight: 400;
        }
        .title-table-container {
          display: flex;
          flex-direction: column;
          h3 {
            margin-bottom: 35px;
          }
        }

        &__form {
          display: flex;
          row {
            gap: 30px;
          }
        }

        &__image {
          width: 137px;
          margin-right: 34px;
        }

        &__texts {
          flex-grow: 1;
          &:last-child {
            button {
              margin-left: auto;
              margin-right: 15px;
            }
          }
        }
        .lz-table__tools {
          display: none;
        }

        .lz-table__th--delete {
          text-align: right;

          svg:hover {
            cursor: pointer;
            stroke: $color-black-01;
          }
        }
      }

      &-team,
      &-description {
        &__header {
          margin-bottom: 20px;
          p {
            font-size: 16px;
            color: $color-black-04;
          }
        }
      }

      &-buttons {
        text-align: right;
      }
    }

    h2.changeTemplateModal__title {
      font-size: 2.3rem;
      width: 50ch;
      line-height: 1.5;
      font-weight: bold;
    }

    p.changeTemplateModal__subtitle {
      font-size: 1.4rem;
      width: 70ch;
      line-height: 1.5;
      margin-top: 2rem;
    }

    .changeTemplateModal__actions {
      margin-top: 2rem;
      display: grid;
    }

    .public-buttons {
      margin-top: 5.6rem;
    }

    .public-buttons .save-btn {
      right: 8.7rem;
    }

    .public-buttons .cancel-btn {
      right: 30.7rem;
    }
  }
</style>
