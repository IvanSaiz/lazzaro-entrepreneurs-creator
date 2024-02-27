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
            a(:href="publicWebForm.url" target="_blank")
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
          @change="handleImageUpload($event, 'publicWebForm.styleLogo')"
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
        .subtitle
          h3 {{ $t('web.public.homepageForm.subtitle') }}
          design-modal(section="homepage")
            template(#header)
              h4 {{ $t('web.public.homepageForm.title') }}
            template(#form)
              h2.h2--dash {{ $t('web.public.homepageForm.design.layout') }}
              layout-select(
                name="homepageDesignLayout"
                v-model="publicWebForm.homepageDesignLayout"
              )
              h2.h2--dash {{ $t('web.public.homepageForm.design.color') }}
              FormulateInput#primary-color(
                type="textColor"
                name="homepageDesignBackgroundColor"
                :value="publicWebForm.homepageDesignBackgroundColor"
              )
      .form__row
          FormulateInput(
            type="image"
            :label="$t('web.public.homepageForm.form.image')"
            label-position="before"
            name="homepageMainImage"
            :help="$t('web.public.homepageForm.form.imageHelper')"
          )
          .form-section
            .text-color-row
              formulate-input(
                  type="text"
                  name="homepageTitle"
                  :label="$t('web.public.homepageForm.form.title')"
                  :help="$t('web.public.homepageForm.form.titleHelper')"
                )
              formulate-input#primary-color(
                type="textColor"
                name="homepageTitleColor"
                value="#1081F2"
                )
            .text-color-row
              formulate-input(
                  type="text"
                  name="homepageSubtitle"
                  :label="$t('web.public.homepageForm.form.subtitle')"
                  :help="$t('web.public.homepageForm.form.subtitleHelper')"
                  )
              FormulateInput#primary-color(
                type="textColor"
                name="homepageSubtitleColor"
                value="#1081F2"
                )
            .button-row
              formulate-input(
                  type="text"
                  name="homepageFirstButtonText"
                  :label="$t(`web.public.homepageForm.form.buttons.1`)"
                )
              formulate-input(
                  type="text"
                  name="homepageFirstButtonLink"
                  :label="$t(`web.public.homepageForm.form.links.1`)"
                )
            .button-row
                formulate-input(
                  type="text"
                  name="homepageSecondButtonText"
                  :label="$t(`web.public.homepageForm.form.buttons.2`)"
                )
                formulate-input(
                  type="text"
                  name="homepageSecondButtonLink"
                  :label="$t(`web.public.homepageForm.form.links.2`)"
                )
    section.public-whoWeAre
      .public-whoWeAre__header
        h2.h2--dash {{ $t('web.public.whoWeAreForm.title') }}
        .subtitle
          h3 {{ $t('web.public.whoWeAreForm.subtitle') }}
          design-modal(section="aboutUs")
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
                name="aboutUsTitleColor"
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
                value="#1081F2"
                )
            lz-editor-input(
            :label="$t('web.public.whoWeAreForm.form.description')"
            v-model="publicWebForm.aboutUsDescription"
            )
    section.public-features
      .public-whoWeAre__header
        h3.h3--dash {{ $t('web.public.whoWeAreForm.features.title') }}
        formulate-input.public-whoWeAre__content(
          type="group"
          name="aboutUs"
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
        formulate-input(
          type="text"
          name="aboutUsReadMoreButtonText"
          :label="$t('web.public.whoWeAreForm.features.button')"
        )
        formulate-input(
          type="text"
          name="aboutUsReadMoreButtonLink"
          :label="$t('web.public.whoWeAreForm.features.link')"
        )
    section.public-whyUs
      .public-whyUs__header
        h2.h2--dash {{ $t('web.public.whyChooseUsForm.title') }}
        .subtitle
          h3 {{ $t('web.public.whyChooseUsForm.subtitle') }}
          design-modal(section="whyUs")
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
                value="#1081F2"
                )
            lz-editor-input(
            :label="$t('web.public.whyChooseUsForm.description')"
            v-model="publicWebForm.whyChooseUsDescription"
            )
        .public-whyUs__content
          formulate-input(
            type="group"
            name="whyChooseUsSubTitles"
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
        .subtitle
          p {{ $t('web.public.impactForm.subtitle') }}
          design-modal(section="impact")
            template(#header)
              h4 {{ $t('web.public.impactForm.design.title') }}
            template(#form)
              h2.h2--dash {{ $t('web.public.impactForm.design.image') }}
              formulate-input(
                type="image"
                name="impactDesignBackgroundImage"
                :help="$t('web.public.impactForm.design.imageHelper')"
              )
              h2.h2--dash {{ $t('web.public.impactForm.design.color') }}
              formulate-input#primary-color(
                type="textColor"
                name="impactDesignBackgroundColor"
                v-model="publicWebForm.impactDesignBackgroundColor"
                )
      formulate-input(
        type="group"
        name="impactData"
        :value="publicWebForm.impactData"
        #default="{index}"
      ).public-impact__content
        formulate-input.impact-item(
              type="image"
              :name= "`url`"
              :label="$t(`web.public.impactForm.icon.${index+1}`)"
              :help="$t('web.public.impactForm.icon.help')"
            )
        formulate-input.impact-item(
              type="text"
              :name= "`text`"
              :label="$t(`web.public.impactForm.text.${index+1}`)"
            )
        formulate-input.impact-item(
              type="text"
              :name= "`amount`"
              :label="$t(`web.public.impactForm.amount.${index+1}`)"
            )
    section.public-team
      .public-team__header
        h2.h2--dash {{ $t('web.public.teamForm.title') }}
        .subtitle
          h3 {{ $t('web.public.teamForm.subtitle') }}
          design-modal(section="team")
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
              value="#1081F2"
              )

      .public-team__header
        h3.h3--dash {{ $t('web.public.teamForm.teamMembers.title') }}
        h4 {{ $t('web.public.teamForm.teamMembers.subtitle') }}
      formulate-form.public-team__form(
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
            v-if="publicWebForm.teamMembers && publicWebForm.teamMembers.length > 0"
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
            :label="$t('web.public.contactForm.form.title')"
          )
          formulate-input(
            type="text"
            name="contactSubTitle"
            :label="$t('web.public.contactForm.form.subtitle')"
          )
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

      lz-button(type="primary" class="save-btn" :disabled='!isFormChanged') {{ $t('common.actions.save') }}
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import cloneDeep from "lodash/cloneDeep";
  import isObjectEmpty from "lodash/isEmpty";
  import isEqual from "lodash/isEqual";
  import LzButton from "@/components/Button.vue";
  import LzTable from "@/components/Table.vue";
  import LzEditorInput from "@/components/EditorInput.vue";
  import LzModal from "@/components/Modal.vue";
  import DesignModal from "@/components/DesignModal.vue";
  import { DotsIcon } from "@/components";
  import { parseFiles } from "@/utils/parseFile";
  import { apiWebsite } from "../api";
  import { ChooseTemplate } from "../components";
  import LayoutSelect from "@/components/LayoutSelect.vue";

  const auth = namespace("auth");

  @Component({
    components: {
      LzButton,
      LzTable,
      LzEditorInput,
      ChooseTemplate,
      LzModal,
      DotsIcon,
      DesignModal,
      LayoutSelect
    }
  })
  export default class Public extends Vue {
    showModal = false;
    modalText = {
      title: "",
      subtitle: ""
    };

    prevForm: PublicWebForm | {} = {};
    imageChanged: {
      styleLogo: false;
      homepageMainImage: false;
      aboutUsImgUrl: false;
      whyChooseUsImgUrl: false;
      bookingsImgUrl: false;
    };

    publicWebForm = {
      active: false,
      url: "",
      chosenTemplateId: "",

      // style properties
      styleLogo: [] as any,
      styleMainTypography: "",
      styleSecondaryTypography: "",
      styleButtonColor: "",
      styleMenuColor: "",
      styleFooterColor: "",

      // homepage properties
      homepageMainImage: [] as any,
      homepageMoreImages: [] as any,
      homepageTitle: "",
      homepageTitleColor: "",
      homepageSubtitle: "",
      homepageSubtitleColor: "",
      homepageFirstButtonText: "",
      homepageFirstButtonLink: "",
      homepageSecondButtonText: "",
      homepageSecondButtonLink: "",
      homepageDesignLayout: "left",
      homepageDesignBackgroundColor: "#EFEFEF",

      // aboutUs properties
      aboutUsImgUrl: [] as any,
      aboutUsTitle: "",
      aboutUsTitleColor: "",
      aboutUsSubtitle: "",
      aboutUsSubtitleColor: "",
      aboutUsDescription: "",
      aboutUsFeaturesIcons: [],
      aboutUsReadMoreButtonId: 1,
      aboutUsReadMoreButtonText: "",
      aboutUsReadMoreButtonLink: "",

      // whyChooseUs properties
      whyChooseUsImgUrl: [] as any,
      whyChooseUsTitle: "",
      whyChooseUsTitleColor: "",
      whyChooseUsDescription: "",
      whyChooseUsSubTitles: new Array(4).fill(0).map(
        (_, i) =>
          ({
            id: i,
            title: "",
            url: "",
            description: ""
          } as Subtitle)
      ),
      whyChooseUsDesignLayout: "right",
      whyChooseUsDesignBackgroundColor: "#F0F0F0",
      whyChooseUsDesignBackgroungImage: "",

      // bookings properties
      bookingsImgUrl: [] as any,
      bookingsTitle: "",
      bookingsTitleColor: "",
      bookingsSubtitle: "",
      bookingsSubtitleColor: "",
      bookingsButtonUrl: "",
      bookingsButtonText: "",
      bookingsDesignLayout: "center",
      bookingsDesignBackgroundColor: "#F0F0F0",

      // reviews properties
      reviewsTitle: "",
      reviewsTitleColor: "",
      reviewsSubtitle: "",
      reviewsSubtitleColor: "",
      reviewsUrl: "",

      // impact properties
      // TODO:remove that and kept the impactData only
      impactData: new Array(4).fill(null).map(
        (_, i) =>
          ({
            amount: "",
            id: `${i}`,
            text: "",
            url: []
          } as Section.Web.ImpactData)
      ),
      impactDesignBackgroundColor: "#FFF0F0",
      impactDesignBackgroundImage: [] as any,

      // team properties
      teamTitle: "",
      teamSubtitle: "",
      teamTitleColor: "",
      teamSubtitleColor: "",
      teamMembers: [],
      teamDesignBackgroundColor: "#F0F0F0",

      // contact properties
      contactTitle: "",
      contactSubTitle: "",
      contactTitleColor: "",
      contactSubtitleColor: "",
      contactDesignBackgroundColor: "#EFEFEF",

      // footer properties
      footerTerms: "",
      footerTransparencyAccountability: [] as any,
      footerTransparencyDescription: "",
      footerSocialFacebook: "",
      footerSocialTwitter: "",
      footerSocialLinkedIn: "",
      footerSocialWhatsapp: "",
      footerSocialSecondaryWeb: "",
      footerSocialInstagram: "",
      footerDesignBackgroundColor: "",
      footerDesignBackgroundImage: ""
    };

    fontOptions = {
      roboto: this.$t("web.public.personalizeWebForm.form.fonts.roboto")
      //TODO: uncomment it when the template project is adopted to that feature
      // arial: this.$t("web.public.personalizeWebForm.form.fonts.arial")
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

    @auth.State("websiteId")
    public websiteId!: string;

    @auth.State("templateId")
    public templateId!: string;

    @auth.State("url")
    public url!: string;

    @auth.State("isActive")
    public isActive!: boolean;

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

    handleImageUpload(event, fieldName): void {
      this.imageChanged[fieldName] = true;
    }

    get isFormChanged(): boolean {
      if (isObjectEmpty(this.prevForm)) return false;
      return !isEqual(this.prevForm, this.publicWebForm);
    }

    async handlePublishWebsite(active: boolean, websiteId: string) {
      try {
        //TODO: update the member to be active
        if (active === this.isActive) return;

        if (active) {
          this.modalText = {
            title: this.$tc("web.public.websiteStatus.publishWebsite.title"),
            subtitle: this.$tc(
              "web.public.websiteStatus.publishWebsite.subtitle"
            )
          };

          this.onModalOpen();
          await apiWebsite.website.publish(websiteId);
        } else {
          this.modalText = {
            title: this.$tc("web.public.websiteStatus.unpublishWebsite.title"),
            subtitle: this.$tc(
              "web.public.websiteStatus.unpublishWebsite.subtitle"
            )
          };

          this.onModalOpen();
          await apiWebsite.website.unpublish(websiteId);
        }

        this.onModalClose();
      } catch {
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

      this.publicWebForm.teamMembers.push({
        id: this.publicWebForm.teamMembers.length + 1,
        picture: this.teamForm.picture,
        name: this.teamForm.name,
        position: this.teamForm.position,
        linkedin: this.teamForm.linkedin
      });

      this.teamForm = {
        id: "",
        picture: null,
        name: "",
        position: "",
        linkedin: ""
      };
    }

    mounted() {
      // TODO: fetch template and load initial values from there, then load values from the
      // user configuration
      apiWebsite.section
        .get<WebProps>(this.websiteId, "web")
        .then(data => {
          const {
            templateId,
            properties: {
              style,
              aboutUs,
              bookings,
              contact,
              footer,
              homePage,
              impact,
              reviews,
              team,
              whyChooseUs
            }
          } = data;

          this.publicWebForm.chosenTemplateId = templateId;
          this.publicWebForm.url = this.url;
          this.publicWebForm.active = this.isActive;

          // Style section
          this.publicWebForm.styleLogo = [{ url: style?.logo }];
          this.publicWebForm.styleMenuColor = style?.menuColor;
          this.publicWebForm.styleButtonColor = style?.buttonColor;
          this.publicWebForm.styleFooterColor = style?.footerColor;
          this.publicWebForm.styleMainTypography = style?.mainTypography;
          this.publicWebForm.styleSecondaryTypography =
            style?.secondaryTypography;

          // HomePage section
          this.publicWebForm.homepageTitle = homePage?.title;
          this.publicWebForm.homepageDesignLayout = homePage?.design.layout;
          this.publicWebForm.homepageDesignBackgroundColor =
            homePage?.design.backgroundColor;
          this.publicWebForm.homepageSubtitle = homePage?.subTitle;
          this.publicWebForm.homepageMainImage = [{ url: homePage?.mainImage }];
          // this.publicWebForm.homepageMoreImages =
          //   homePage?.moreImages;
          this.publicWebForm.homepageTitleColor = homePage?.titleColor;
          this.publicWebForm.homepageSubtitleColor = homePage?.subTitleColor;
          this.publicWebForm.homepageFirstButtonLink =
            homePage?.firstButtonLink;
          this.publicWebForm.homepageFirstButtonText =
            homePage?.firstButtonText;
          this.publicWebForm.homepageSecondButtonLink =
            homePage?.secondButtonLink;
          this.publicWebForm.homepageSecondButtonText =
            homePage?.secondButtonText;

          // AboutUs section
          this.publicWebForm.aboutUsTitle = aboutUs?.title;
          this.publicWebForm.aboutUsImgUrl = [{ url: aboutUs?.imgUrl }];
          this.publicWebForm.aboutUsSubtitle = aboutUs?.subTitle;
          this.publicWebForm.aboutUsTitleColor = aboutUs?.titleColor;
          this.publicWebForm.aboutUsSubtitleColor = aboutUs?.subTitleColor;
          this.publicWebForm.aboutUsDescription = aboutUs?.description;
          this.publicWebForm.aboutUsFeaturesIcons =
            aboutUs?.features?.icons?.map(icon => ({
              id: icon.id,
              url: [{ url: icon.url }],
              title: icon.title,
              description: icon.description
            })) ??
            Array.from(
              { length: 4 },
              (_, i) =>
                ({
                  id: i,
                  url: "",
                  title: "",
                  description: ""
                } as Feature)
            );

          (this.publicWebForm.aboutUsReadMoreButtonText =
            aboutUs?.features?.buttons[0]?.text),
            (this.publicWebForm.aboutUsReadMoreButtonLink =
              aboutUs?.features?.buttons[0]?.link),
            // WhyChooseUs section
            (this.publicWebForm.whyChooseUsTitle = whyChooseUs?.title);
          this.publicWebForm.whyChooseUsImgUrl = [{ url: whyChooseUs?.imgUrl }];
          this.publicWebForm.whyChooseUsTitleColor = whyChooseUs?.titleColor;
          this.publicWebForm.whyChooseUsDescription = whyChooseUs?.description;
          this.publicWebForm.whyChooseUsSubTitles =
            whyChooseUs?.subtitles?.map(subtitle => ({
              id: subtitle.id,
              title: subtitle.title,
              description: subtitle.description
            })) ??
            new Array(4).fill(0).map(
              (_, i) =>
                ({
                  id: i,
                  title: "",
                  description: ""
                } as Subtitle)
            );

          // Bookings section
          this.publicWebForm.bookingsImgUrl = [{ url: bookings?.imgUrl }];
          this.publicWebForm.bookingsTitle = bookings?.title;
          this.publicWebForm.bookingsTitleColor = bookings?.titleColor;
          this.publicWebForm.bookingsSubtitle = bookings?.subtitle;
          this.publicWebForm.bookingsSubtitleColor = bookings?.subtitleColor;
          this.publicWebForm.bookingsButtonUrl = bookings?.buttonUrl;
          this.publicWebForm.bookingsButtonText = bookings?.buttonText;

          // Reviews section
          this.publicWebForm.reviewsTitle = reviews?.title;
          this.publicWebForm.reviewsTitleColor = reviews?.titleColor;
          this.publicWebForm.reviewsSubtitle = reviews?.subtitle;
          this.publicWebForm.reviewsSubtitleColor = reviews?.subtitleColor;
          this.publicWebForm.reviewsUrl = reviews?.url;

          // Impact section
          this.publicWebForm.impactData =
            impact?.data?.map(
              item =>
                ({
                  id: item.id.toString(),
                  url: [{ url: item.url }],
                  text: item.text,
                  amount: item.amount
                } as Section.Web.ImpactData)
            ) ||
            new Array(4).fill(0).map(
              (_, i) =>
                ({
                  id: i.toString(),
                  text: "",
                  amount: "",
                  url: []
                } as Section.Web.ImpactData)
            );
          this.publicWebForm.impactDesignBackgroundColor =
            impact?.design.backgroundColor;
          this.publicWebForm.impactDesignBackgroundImage = data.properties
            ?.impact?.design.backgroundImage
            ? [{ url: impact?.design.backgroundImage }]
            : "";

          // Team section
          this.publicWebForm.teamTitle = team?.title;
          this.publicWebForm.teamSubtitle = team?.subTitle;
          this.publicWebForm.teamTitleColor = team?.titleColor;
          this.publicWebForm.teamSubtitleColor = team?.subtitleColor;
          this.publicWebForm.teamMembers =
            team?.members?.map(member => ({
              id: member.id,
              picture: [{ url: member.picture }],
              name: member.name,
              linkedin: member.linkedin,
              position: member.position
            })) ?? [];
          this.publicWebForm.teamDesignBackgroundColor =
            team?.design.backgroundColor;

          // Contact section
          this.publicWebForm.contactTitle = contact?.title;
          this.publicWebForm.contactSubTitle = contact?.subTitle;
          // this.publicWebForm.contactTitleColor =
          //   contact?.titleColor;
          // this.publicWebForm.contactSubtitleColor =
          //   contact?.subtitleColor;

          // Footer section
          this.publicWebForm.footerTerms = footer?.info.terms;
          // this.publicWebForm.footerTransparencyAccountability = [
          //   { url: footer?.info.transparency.data }
          // ];
          this.publicWebForm.footerTransparencyDescription =
            footer?.info.transparency?.data?.description?.transparency_description;
          this.publicWebForm.footerSocialFacebook = footer?.social.facebook;
          this.publicWebForm.footerSocialTwitter = footer?.social.twitter;
          this.publicWebForm.footerSocialLinkedIn = footer?.social.linkedIn;
          this.publicWebForm.footerSocialWhatsapp = footer?.social.whatsapp;
          this.publicWebForm.footerSocialSecondaryWeb =
            footer?.social.secondaryWeb;
          this.publicWebForm.footerSocialInstagram = footer?.social.instagram;
          this.publicWebForm.footerDesignBackgroundColor =
            footer?.design.backgroundColor;
          this.publicWebForm.footerDesignBackgroundImage =
            footer?.design.backgroundImage;

          this.loaded = true;
        })
        .catch(() => {
          this.$notify({
            type: "error",
            text: this.$tc("web.public.notify.error")
          });
        });

      // not perfect but it works for now
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
      delay(1000).then(() => {
        this.prevForm = cloneDeep(this.publicWebForm);
      });
    }

    async parseImageUrl(url) {
      if (url) {
        const parsed = await parseFiles(url);
        return parsed[0] as string;
      }
      return null;
    }

    async onPublicWebSubmit(form) {
      const accountability =
        this.publicWebForm.footerTransparencyAccountability?.url &&
        (
          await parseFiles(this.publicWebForm.footerTransparencyAccountability)
        ).map((file: any, key: any) => {
          return {
            file,
            title: this.publicWebForm.footerTransparencyAccountability.files[
              key
            ].name
          };
        });

      const team: TeamProperties["members"][] = [];
      if (this.publicWebForm.teamMembers) {
        for await (const member of this.publicWebForm.teamMembers) {
          const picture =
            member.picture && member.picture.files
              ? (await parseFiles(member.picture))[0]
              : null;
          team.push({ ...member, picture });
        }
      }

      const styleLogoTrimmed = await this.parseImageUrl(
        this.publicWebForm.styleLogo
      );
      const homepageMainImageTrimmed =
        this.publicWebForm.homepageMainImage &&
        (await this.parseImageUrl(this.publicWebForm.homepageMainImage));
      const aboutUsImgUrlTrimmed =
        this.publicWebForm.aboutUsImgUrl &&
        (await this.parseImageUrl(this.publicWebForm.aboutUsImgUrl));

      for (const icon of this.publicWebForm.aboutUsFeaturesIcons) {
        icon.url = await this.parseImageUrl(icon.url);
      }

      const whyChooseUsImgUrlTrimmed =
        this.publicWebForm.whyChooseUsImgUrl &&
        (await this.parseImageUrl(this.publicWebForm.whyChooseUsImgUrl));
      const bookingsImgUrlTrimmed =
        this.publicWebForm.bookingsImgUrl &&
        (await this.parseImageUrl(this.publicWebForm.bookingsImgUrl));

      for (const impact of this.publicWebForm.impactData) {
        impact.url = [{ url: await this.parseImageUrl(impact.url) }];
      }

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

      const postData: PublicWebFormData = {
        active: form.active,
        templateId: form.chosenTemplateId,
        websiteId: this.websiteId,
        type: "web",
        properties: {
          general: {
            url: form.url
          },
          style: {
            logo: styleLogoTrimmed,
            menuColor: form.styleMenuColor,
            buttonColor: form.styleButtonColor,
            footerColor: form.styleFooterColor,
            mainTypography: form.styleMainTypography,
            secondaryTypography: form.styleSecondaryTypography
          },

          homePage: {
            title: form.homepageTitle,
            design: {
              layout: form.homepageDesignLayout,
              backgroundColor: form.homepageDesignBackgroundColor
            },
            subTitle: form.homepageSubtitle,
            mainImage: homepageMainImageTrimmed,
            moreImages: form.homepageMoreImages,
            titleColor: form.homepageTitleColor,
            subTitleColor: form.homepageSubtitleColor,
            firstButtonLink: form.homepageFirstButtonLink,
            firstButtonText: form.homepageFirstButtonText,
            secondButtonLink: form.homepageSecondButtonLink,
            secondButtonText: form.homepageSecondButtonText
          },

          aboutUs: {
            title: form.aboutUsTitle,
            imgUrl: form.aboutUsImgUrl[0].url,
            subTitle: form.aboutUsSubtitle,
            titleColor: form.aboutUsTitleColor,
            subTitleColor: form.aboutUsSubtitleColor,
            description: form.aboutUsDescription,
            features: {
              icons: form.aboutUsFeaturesIcons,
              buttons: [
                {
                  id: form.aboutUsReadMoreButtonId,
                  text: form.aboutUsReadMoreButtonText,
                  link: form.aboutUsReadMoreButtonLink
                }
              ]
            }
          },

          // WhyChooseUs properties
          whyChooseUs: {
            title: form.whyChooseUsTitle,
            imgUrl: whyChooseUsImgUrlTrimmed,
            titleColor: form.whyChooseUsTitleColor,
            description: form.whyChooseUsDescription,
            subtitles: form.whyChooseUsSubTitles,
            design: {
              layout: form.whyChooseUsDesignLayout,
              backgroundColor: form.whyChooseUsDesignBackgroundColor,
              backgroundImage: form.whyChooseUsDesignBackgroungImage
            }
          },

          // Bookings properties
          bookings: {
            imgUrl: bookingsImgUrlTrimmed,
            title: form.bookingsTitle,
            titleColor: form.bookingsTitleColor,
            subtitle: form.bookingsSubtitle,
            subtitleColor: form.bookingsSubtitleColor,
            buttonUrl: form.bookingsButtonUrl,
            buttonText: form.bookingsButtonText,
            design: {
              layout: form.bookingsDesignLayout,
              backgroundColor: form.bookingsDesignBackgroundColor
            }
          },

          // Reviews properties
          reviews: {
            title: form.reviewsTitle,
            titleColor: form.reviewsTitleColor,
            subtitle: form.reviewsSubtitle,
            subtitleColor: form.reviewsSubtitleColor,
            url: form.reviewsUrl
          },

          // Impact properties
          //TODO: that logic is not the correct way to handle this
          impact: {
            data: form.impactData
              .map(i => ({
                ...i,
                url: i.url[0]?.url ?? ""
              }))
              .filter(i => !!i.text),
            design: {
              backgroundColor: form.impactDesignBackgroundColor,
              backgroundImage: await this.parseImageUrl(
                form.impactDesignBackgroundImage
              )
            }
          },
          // Team properties
          team: {
            title: form.teamTitle,
            subTitle: form.teamSubtitle,
            titleColor: form.teamTitleColor,
            subtitleColor: form.teamSubtitleColor,
            members: team,
            design: {
              backgroundColor: form.teamDesignBackgroundColor
            }
          },

          // Contact properties
          contact: {
            title: form.contactTitle,
            subTitle: form.contactSubTitle,
            titleColor: form.contactTitleColor,
            subtitleColor: form.contactSubtitleColor,
            design: {
              backgroundColor: form.contactDesignBackgroundColor
            }
          },

          // Footer properties
          footer: {
            info: {
              terms: form.footerTerms,
              transparency: {
                fileUrl: accountability && accountability[0]?.file,
                description: form.footerTransparencyDescription
              }
            },
            social: {
              twitter: form.footerSocialTwitter,
              facebook: form.footerSocialFacebook,
              linkedIn: form.footerSocialLinkedIn,
              whatsapp: form.footerSocialWhatsapp,
              instagram: form.footerSocialInstagram,
              secondaryWeb: form.footerSocialSecondaryWeb
            },
            design: {
              backgroundColor: form.styleFooterColor,
              backgroundImage: form.footerDesignBackgroundImage
            }
          }
        }
      };

      console.log("postData", postData);
      console.log("form", form);

      try {
        await apiWebsite.section.put(postData);
        this.$notify({
          type: "success",
          text: this.$tc("web.public.notify.success")
        });
        await this.handlePublishWebsite(
          this.publicWebForm.active,
          this.websiteId
        );
        this.prevForm = cloneDeep(this.publicWebForm);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        this.$notify({
          type: "error",
          text: this.$tc("web.public.notify.error")
        });
      }
    }
  }
</script>

<style lang="scss">
  #public {
    section {
      margin-top: 40px;

      .subtitle {
        display: flex;
        justify-content: space-between;
      }
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
            align-items: center;

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
          margin-top: 4px;
          margin-bottom: 43px;

          .formulate-input-grouping {
            display: inline-flex;
            align-items: flex-start;
            gap: 44px;
          }

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
            align-items: center;

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
          margin-top: 4px;

          .formulate-input-grouping {
            display: inline-flex;
            align-items: flex-start;
            gap: 44px;
          }

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
            align-items: center;

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
        &__header {
          .subtitle {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1rem;
            p {
              font-size: 16px;
            }
          }
        }
        &__content {
          .formulate-input-grouping {
            display: inline-flex;
            align-items: flex-start;
            gap: 44px;
          }

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
            align-items: center;

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
      position: fixed;
      display: flex;
      gap: 2rem;
      width: max-content;
      z-index: 100;
      bottom: 20px;
      right: 9rem;

      > * {
        padding-inline: 4rem;
        width: max-content;
        margin: 0;
      }
    }
  }
</style>
