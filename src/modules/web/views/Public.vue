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
            name="style.logo"
            :help="$t('web.public.personalizeWebForm.form.logoHelper')"
          )
          .form-section
            FormulateInput(
              type="select"
              name="style.mainTypography"
              :label="$t('web.public.personalizeWebForm.form.mainTypography')"
              :label-class="['required']"
              :options="fontOptions"
              validation="required"
              :validation-name="$t('web.public.personalizeWebForm.form.fonts.label')"
              :placeholder="$t('auth.signup.form.choose')"
            )  
            FormulateInput(
              type="select"
              name="style.secondaryTypography"
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
                name="style.buttonColor"
                :label="$t('web.public.personalizeWebForm.form.buttonsColor')"
                value="#1081F2"
                )
              FormulateInput#primary-color(
                type="textColor"
                name="style.menuColor"
                :label="$t('web.public.personalizeWebForm.form.menuColor')"
                value="#1081F2"
                )
              FormulateInput#primary-color(
                type="textColor"
                name="style.footerColor"
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
              name="homepage.mainImage"
              :help="$t('web.public.homepageForm.form.imageHelper')"
            )
            .form-section
              .section-row
                formulate-input(
                    type="text"
                    name="homepage.title"
                    :label="$t('web.public.homepageForm.form.title')"
                    :help="$t('web.public.homepageForm.form.titleHelper')"
                  )
                FormulateInput#primary-color(
                  type="textColor"
                  name="homepage.titleColor"
                  :label="$t('auth.onboarding.stepStyle.form.textColour')"
                  value="#1081F2"
                  )
              .section-row
                formulate-input(
                    type="text"
                    name="homepage.subtitle"
                    :label="$t('web.public.homepageForm.form.subtitle')"
                    :help="$t('web.public.homepageForm.form.subtitleHelper')"
                  )
                FormulateInput#primary-color(
                  type="textColor"
                  name="homepage.subtitleColor"
                  :label="$t('auth.onboarding.stepStyle.form.textColour')"
                  value="#1081F2"
                  )
              .form-section__cta(v-for="(item, index) in publicWebForm.homepage.buttons" :key="index")            
                formulate-input(
                  type="text"
                  :name="`buttons[${index}].text`"
                  :label="$t(`web.public.homepageForm.form.buttons.${index + 1}`)"
                )
                formulate-input(
                  type="text"
                  :name="`buttons[${index}].link`"
                  :label="$t(`web.public.homepageForm.form.links.${index + 1}`)"
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
              name="aboutUs.imgUrl"
              :help="$t('web.public.whoWeAreForm.form.imageHelper')"
            )
            .form-section
              .section-row
                formulate-input(
                    type="text"
                    name="aboutUs.title"
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
                    name="aboutUs.subtitle"
                    :label="$t('web.public.whoWeAreForm.form.subtitle')"
                    :help="$t('web.public.whoWeAreForm.form.subtitleHelper')"
                  )
                FormulateInput#primary-color(
                  type="textColor"
                  name="aboutUs.subtitleColor"
                  :label="$t('auth.onboarding.stepStyle.form.textColour')"
                  value="#1081F2"
                  )
              lz-editor-input(
              :label="$t('web.public.whoWeAreForm.form.description')"
              v-model="publicWebForm.aboutUs.description"
              )
        section.public-whoWeAre
          .public-whoWeAre__header
            h3.h3--dash {{ $t('web.public.whoWeAreForm.features.title') }}


        .public-whoWeAre__content
          .text-item(v-for="(item, index) in publicWebForm.aboutUs.features.icons" :key="index")
            formulate-input(
                type="image"
                :name="`icons[${index}].url`"
                :label="$t(`web.public.whoWeAreForm.features.icon.${index + 1}`)"
                :help="$t('web.public.whoWeAreForm.features.icon.help')"
              )
            formulate-input(
              type="text"
              :name="`icons[${index}].title`"
              :label="$t(`web.public.whoWeAreForm.features.titles.${index + 1}`)"
            )
            formulate-input(
              type="text"
              :name="`icons[${index}].description`"
              :label="$t(`web.public.whoWeAreForm.features.descriptions.${index + 1}`)"
            )

        hr.hr--dash
      
        .public-whoWeAre__cta
          formulate-input(
            type="text"
            name="aboutUs.features.buttons[0].text"
            :label="$t('web.public.whoWeAreForm.features.button')"
          )
          formulate-input(
            type="text"
            name="aboutUs.features.buttons[0].link"
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
              name="whyChooseUs.imgUrl"
              :help="$t('web.public.whyChooseUsForm.imageHelperText')"
            )
            .form-section
              .section-row
                formulate-input(
                    type="text"
                    name="whyChooseUs.title"
                    :label="$t('web.public.whyChooseUsForm.formTitle')"
                    :help="$t('web.public.whyChooseUsForm.titleHelperText')"
                  )
                FormulateInput#primary-color(
                  type="textColor"
                  name="whyChooseUs.titleColor"
                  :label="$t('auth.onboarding.stepStyle.form.textColour')"
                  value="#1081F2"
                  )
              lz-editor-input(
              :label="$t('web.public.whyChooseUsForm.description')"
              v-model="publicWebForm.whyChooseUs.description"
              )
        .public-whyUs__content
          .text-item(v-for="(item, index) in publicWebForm.whyChooseUs.subtitles" :key="index")
            formulate-input(
              type="text"
              :name="`subtitles[${index}].title`"
              :label="$t(`web.public.whyChooseUsForm.titles.${item.id}`)"
            )
            formulate-input(
              type="text"
              :name="`subtitles[${index}].description`"
              :label="$t(`web.public.whyChooseUsForm.descriptions.${item.id}`)"
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
              name="bookings.imgUrl"
              :help="$t('web.public.brandForm.logo.help')"
            )
            .form-section
              .section-row
                formulate-input(
                    type="text"
                    name="bookings.title"
                    :label="$t('web.public.bookingsForm.formTitle')"
                    :help="$t('web.public.bookingsForm.titleHelper')"
                  )
                FormulateInput#primary-color(
                  type="textColor"
                  name="bookings.titleColor"
                  :label="$t('auth.onboarding.stepStyle.form.textColour')"
                  value="#1081F2"
                  )
              .section-row
                formulate-input(
                    type="text"
                    name="bookings.subtitle"
                    :label="$t('web.public.bookingsForm.formSubtitle')"
                    :help="$t('web.public.bookingsForm.subtitleHelper')"
                  )
                FormulateInput#primary-color(
                  type="textColor"
                  name="bookings.subtitleColor"
                  :label="$t('auth.onboarding.stepStyle.form.textColour')"
                  value="#1081F2"
                  )
              .links-row
                formulate-input(
                  type="text"
                  name="bookings.buttonText"
                  :label="$t('web.public.bookingsForm.button')"
                )
                formulate-input(
                  type="text"
                  name="bookings.buttonUrl"
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
              name="reviews.title"
              :label="$t('web.public.reviewsForm.formTitle')"
              :help="$t('web.public.reviewsForm.titleHelper')"
            )
            FormulateInput#primary-color(
              type="textColor"
              name="reviews.titleColor"
              :label="$t('auth.onboarding.stepStyle.form.textColour')"
              value="#1081F2"
              )

          .reviews-section
            formulate-input(
              type="text"
              name="reviews.subtitle"
              :label="$t('web.public.reviewsForm.formSubtitle')"
              :help="$t('web.public.reviewsForm.subtitleHelper')"
            )
            FormulateInput#primary-color(
              type="textColor"
              name="reviews.subtitleColor"
              :label="$t('auth.onboarding.stepStyle.form.textColour')"
              value="#1081F2"
              )
        .form__row
          formulate-input(
            type="text"
            name="reviews.url"
            :label="$t('web.public.reviewsForm.link')"
          )

      section.public-impact
        .public-impact__header
          h2.h2--dash {{ $t('web.public.impactForm.title') }}
          p {{ $t('web.public.impactForm.subtitle') }}
          .public-impact__content
            .impact-item(v-for="(item, index) in publicWebForm.impact.data" :key="index")
              formulate-input(
                type="image"
                :name="`data[${index}].url`"
                :label="$t(`web.public.impactForm.icon.${index + 1}`)"
                :help="$t('web.public.impactForm.icon.help')"
              )
              formulate-input(
                type="text"
                :name="`data[${index}].text`"
                :label="$t(`web.public.impactForm.text.${index + 1}`)"
              )
              formulate-input(
                type="text"
                :name="`data[${index}].amount`"
                :label="$t(`web.public.impactForm.amount.${index + 1}`)"
              )

      section.public-team
        .public-team__header
          h2.h2--dash {{ $t('web.public.teamForm.title') }}
          h4 {{ $t('web.public.teamForm.subtitle') }}
          .public-team__title
            .team-section
              formulate-input(
                type="text"
                name="team.title.title"
                :label="$t('web.public.teamForm.header.title')"
                :help="$t('web.public.teamForm.header.titleHelperText')"
              )
              FormulateInput#primary-color(
                  type="textColor"
                  name="team.titleColor"
                  :label="$t('auth.onboarding.stepStyle.form.textColour')"
                  value="#1081F2"
                )
            .team-section
              formulate-input(
                type="text"
                name="team.subtitle"
                :label="$t('web.public.teamForm.header.subtitle')"
                :help="$t('web.public.teamForm.header.subtitleHelperText')"
              )
              FormulateInput#primary-color(
                  type="textColor"
                  name="team.subtitleColor"
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
              v-if="publicWebForm.team.members.length > 0"
              :fields="teamFields"
              :items="publicWebForm.team.members"
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
              name="contact.title"
              :label="$t('web.public.contactForm.phone')"
            )
            formulate-input(
              type="text"
              name="contact.subtitle"
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
                name="footer.social.facebook"
                :label="$t('web.public.footer.socialForm.facebook')"
              )
              formulate-input(
                type="text"
                name="footer.social.twitter"
                :label="$t('web.public.footer.socialForm.twitter')"
              )
            .form__row  
              formulate-input(
                type="text"
                name="footer.social.linkedin"
                :label="$t('web.public.footer.socialForm.linkedin')"
              )
              formulate-input(
                type="text"
                name="footer.social.whatsapp"
                :label="$t('web.public.footer.socialForm.whatsapp')"
              )
            .form__row  
              formulate-input(
                type="text"
                name="footer.social.web"
                :label="$t('web.public.footer.socialForm.web')"
              )
              formulate-input(
                type="text"
                name="footer.social.instagram"
                :label="$t('web.public.footer.socialForm.instagram')"
              )


        section.public-footer__subSection 
          .public-footer__header
            h3.h3--dash {{ $t('web.public.footer.termsForm.title') }}

          .form__row
            lz-editor-input(
              :label="$t('web.public.footer.termsForm.terms')"
              v-model="publicWebForm.footer.info.terms"
            )
          .form__row
            lz-editor-input(
              :label="$t('web.public.footer.termsForm.transparencyDescription')"
              v-model="publicWebForm.footer.info.transparency.description"
            )
          .form__row
            formulate-input(
              type="file"
              name="publicWebForm.footer.info.transparency.accountability"
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
      style: {
        logo: "https://dummyimage.com/100x100/000/fff&text=Logo",
        menuColor: "#0055A5",
        buttonColor: "#FF5733",
        footerColor: "#008000",
        mainTypography: "",
        secondaryTypography: ""
      },
      homepage: {
        title: "Welcome to Our Website",
        design: {
          layout: "left",
          backgroundColor: "#EFEFEF"
        },
        subtitle: "Discover Our Services",
        mainImage: "https://dummyimage.com/500x300/000/fff&text=Main+Image",
        moreImages: [
          "https://dummyimage.com/200x200/000/fff&text=Image+1",
          "https://dummyimage.com/200x200/000/fff&text=Image+2"
        ],
        titleColor: "#FF5733",
        subtitleColor: "#3366FF",
        buttons: [
          {
            id: 1,
            text: "Learn More",
            link: "https://www.example.com/more-info"
          },
          {
            id: 2,
            text: "Contact Us",
            link: "https://www.example.com/contact-us"
          }
        ]
      },
      aboutUs: {
        imgUrl: "https://dummyimage.com/400x300/000/fff&text=About+Us",
        title: "About Us",
        subtitle: "Our Story",
        titleColor: "#FF5733",
        subtitleColor: "#3366FF",
        description: "Learn about our journey and how we make a difference.",
        features: {
          icons: [
            {
              id: 1,
              url: "https://www.example.com/icon1.png",
              title: "Feature 1",
              description: "Description for Feature 1"
            },
            {
              id: 2,
              url: "https://www.example.com/icon2.png",
              title: "Feature 2",
              description: "Description for Feature 2"
            },
            {
              id: 3,
              url: "https://www.example.com/icon3.png",
              title: "Feature 3",
              description: "Description for Feature 3"
            },
            {
              id: 4,
              url: "https://www.example.com/icon4.png",
              title: "Feature 4",
              description: "Description for Feature 4"
            }
          ],
          buttons: [
            {
              id: 1,
              text: "Read More",
              link: "https://www.example.com/feature1"
            }
          ]
        }
      },
      whyChooseUs: {
        imgUrl: "https://dummyimage.com/400x300/000/fff&text=Choose+Us",
        title: "Why Choose Us",
        titleColor: "#FFFFFF",
        subtitles: [
          {
            id: 1,
            title: "Quality Services",
            description:
              "We offer top-notch services with a focus on client satisfaction."
          },
          {
            id: 2,
            title: "Quality Services",
            description:
              "We offer top-notch services with a focus on client satisfaction."
          },
          {
            id: 3,
            title: "Quality Services",
            description:
              "We offer top-notch services with a focus on client satisfaction."
          },
          {
            id: 4,
            title: "Quality Services",
            description:
              "We offer top-notch services with a focus on client satisfaction."
          }
        ],
        description:
          "Discover the reasons to choose our company for your needs.",
        design: {
          layout: "right",
          backgroundColor: "#F0F0F0"
        }
      },
      bookings: {
        title: "Book a Consultation",
        design: {
          layout: "center",
          backgroundColor: "#F0F0F0"
        },
        imgUrl: "https://dummyimage.com/300x200/000/fff&text=Book+Now",
        subtitle: "Reserve Your Spot",
        buttonUrl: "https://www.example.com/book-now",
        buttonText: "Book Now",
        titleColor: "#3366FF",
        subtitleColor: "#FFFFFF"
      },
      reviews: {
        url: "https://www.example.com/reviews",
        title: "What Our Clients Say",
        subtitle: "Client Testimonials",
        titleColor: "#FFFFFF",
        subtitleColor: "#3366FF"
      },
      impact: {
        data: [
          {
            id: 1,
            url: "https://www.example.com/impact1.jpg",
            text: "Positive Impact One",
            amount: "$1000"
          },
          {
            id: 2,
            url: "https://www.example.com/impact2.jpg",
            text: "Positive Impact Two",
            amount: "$2000"
          },
          {
            id: 3,
            url: "https://www.example.com/impact3.jpg",
            text: "Positive Impact Three",
            amount: "$3000"
          },
          {
            id: 4,
            url: "https://www.example.com/impact4.jpg",
            text: "Positive Impact Four",
            amount: "$4000"
          }
        ],
        design: {
          backgroundColor: "#FFF0F0",
          backgroundImage:
            "https://dummyimage.com/600x400/000/fff&text=Impact+Background"
        }
      },
      team: {
        title: "Our Dynamic Team",
        design: {
          backgroundColor: "#F0F0F0"
        },
        members: [
          {
            id: 1,
            picture: "https://dummyimage.com/200x200/000/fff&text=Member+1",
            name: "Jane Doe",
            linkedin: "https://www.linkedin.com/in/janedoe",
            position: "Chief Technology Officer"
          },
          {
            id: 2,
            picture: "https://dummyimage.com/200x200/000/fff&text=Member+2",
            name: "John Smith",
            linkedin: "https://www.linkedin.com/in/johnsmith",
            position: "Marketing Director"
          }
        ],
        subtitle: "Meet the Innovators Behind Our Success",
        titleColor: "#333333",
        subtitleColor: "#666666"
      },
      contact: {
        title: "Get in Touch",
        design: {
          backgroundColor: "#EFEFEF"
        },
        subTitle: "We're Here to Help",
        titleColor: "#333333",
        subtitleColor: "#666666"
      },
      footer: {
        info: {
          terms: "Terms of Service: All rights reserved.",
          transparency: {
            accountability: "https://example.com/transparency.pdf",
            description: "We value transparency and openness."
          }
        },
        design: {
          backgroundColor: "#333333",
          backgroundImage:
            "https://dummyimage.com/600x200/000/fff&text=Footer+Background"
        },
        social: {
          facebook: "https://facebook.com/example",
          twitter: "https://twitter.com/example",
          linkedIn: "https://www.linkedin.com/company/example",
          whatsapp: "+123456789",
          secondaryWeb: "https://example-secondary.com",
          instagram: "https://instagram.com/example"
        }
      }
    };

    fontOptions = {
      roboto: this.$t("web.public.personalizeWebForm.form.fonts.roboto"),
      arial: this.$t("web.public.personalizeWebForm.form.fonts.arial")
    };

    teamForm = {
      id: '',
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
      const teamArr = this.publicWebForm.team.members as any[];
      const memberIdx = teamArr.findIndex(el => el === e);
      teamArr.splice(memberIdx, 1);
    }

    onTeamSubmit() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const teamArr = this.publicWebForm.team as any[];

      teamArr.push({
        name: this.publicWebForm.team.members.fullName,
        position: this.publicWebForm.team.members.position,
        linkedin: this.publicWebForm.team.members.linkedin,
        photo: this.publicWebForm.team.members.picture
      });

      this.publicWebForm.team.members.picture = null;
      this.publicWebForm.team.members.fullName = "";
      this.publicWebForm.team.members.position = "";
      this.publicWebForm.team.members.linkedin = "";
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
      }, 3000);
    }

    async onPublicWebSubmit() {
      const transparency = (
        await parseFile(this.publicWebForm.accountability)
      ).map((file: any, key: any) => {
        return {
          file,
          title: this.publicWebForm.accountability.files[key].name
        };
      });

      const team = [];
      for await (const member of this.publicWebForm.team) {
        if (member.photo && member.photo.files) {
          let photo = await parseFile(member.photo);
          photo = photo[0];
          team.push({ ...member, photo });
        } else {
          team.push({ ...member });
        }
      }

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

      Promise.all([
        // apiOngs.postPlatformConfig(this.ongId, {
        //   ...this.ongConfiguration,
        //   isActive: this.publicWebForm.isActive,
        //   powered_by_lazzaro: this.publicWebForm.powered_by_lazzaro,
        //   url: this.publicWebForm.url,
        //   template_id: this.publicWebForm.chosenTemplateId
        // }),

        this.handlePublishWebsite(this.publicWebForm.active, this.websiteId)
      ])
        .then(async () => {
          this.$notify({
            type: "success",
            text: this.$tc("web.public.notify.success"),
            ignoreDuplicates: true
          } as NotificationOptions);

          // await this.updateFeatures();
          this.prevForm = cloneDeep(this.publicWebForm);
        })
        .catch(() => {
          this.$notify({
            type: "error",
            text: this.$tc("web.public.notify.error"),
            ignoreDuplicates: true
          } as NotificationOptions);
        });
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
