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
    @submit="onPublicWebSubmit"
    :keep-model-data="true"
    v-if="loaded"
  )
    <General v-model:props="form.general"></General>
    <Personalize v-model:props="form.style"></Personalize>
    <Homepage v-model:props="form.homePage"></Homepage>
    <AboutUs v-model:props="form.aboutUs"></AboutUs>
    <WhyChooseUs v-model:props="form.whyChooseUs"></WhyChooseUs>
    <Bookings v-model:props="form.bookings"></Bookings>
    //<Reviews v-model:props="form.reviews"></Reviews> TODO: Enable when ready on template
    <Impact v-model:props="form.impact"></Impact>
    <Team v-model:props="form.team"></Team>
    <Contact v-model:props="form.contact"></Contact>
    <Footer v-model:props="form.footer"></Footer>
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
  import LzButton from "@/components/Button.vue";
  import LzModal from "@/components/Modal.vue";
  import { DotsIcon } from "@/components";
  import { apiWebsite } from "../api";
  import { ChooseTemplate } from "../components";
  import {
    AboutUs,
    Bookings,
    Contact,
    Footer,
    General,
    Homepage,
    Impact,
    Personalize,
    Reviews,
    Team,
    WhyChooseUs
  } from "../components/Sections";
  import { getImgURL } from "@/utils/getFormulateImageUrl";
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const _ = require("lodash");
  const auth = namespace("auth");

  @Component({
    components: {
      LzButton,
      ChooseTemplate,
      LzModal,
      DotsIcon,
      General,
      Personalize,
      Homepage,
      AboutUs,
      WhyChooseUs,
      Bookings,
      Reviews,
      Team,
      Contact,
      Impact,
      Footer
    }
  })
  export default class Public extends Vue {
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

    form: WebProps = {
      general: {
        active: true,
        url: "",
        templateId: ""
      },
      style: {
        buttonColor: "",
        logo: "",
        mainTypography: "",
        menuColor: "",
        menuTextColor: "",
        secondaryTypography: ""
      },
      homePage: {
        design: {
          layout: "left",
          backgroundColor: "#EFEFEF"
        },
        title: "",
        titleColor: "",
        subTitle: "",
        subTitleColor: "",
        mainImage: "",
        firstButtonLink: "",
        firstButtonText: "",
        secondButtonLink: "",
        secondButtonText: ""
      },
      aboutUs: {
        enabled: true,
        imgUrl: "",
        title: "",
        titleColor: "",
        subTitle: "",
        subTitleColor: "",
        description: "",
        features: {
          enabled: true,
          icons: [],
          buttons: []
        },
        design: {
          layout: "right",
          backgroundColor: "#F0F0F0"
        }
      },
      whyChooseUs: {
        enabled: true,
        imgUrl: "",
        title: "",
        titleColor: "",
        description: "",
        subtitles: [],
        design: {
          layout: "right",
          backgroundColor: "#F0F0F0"
        }
      },
      bookings: {
        enabled: true,
        imgUrl: "",
        title: "",
        titleColor: "",
        subtitle: "",
        subtitleColor: "",
        buttonUrl: "",
        buttonText: "",
        design: {
          layout: "center",
          backgroundColor: "#F0F0F0",
          bannerColor: "#ff7456"
        }
      },
      reviews: {
        enabled: true,
        title: "",
        titleColor: "",
        subtitle: "",
        subtitleColor: "",
        url: ""
      },
      impact: {
        enabled: true,
        data: [],
        design: {
          color: "#EFEFEF",
          backgroundColor: "#FFF0F0",
          backgroundImage: "",
          amountColor: "#EFEFEF"
        }
      },
      team: {
        enabled: true,
        title: "",
        titleColor: "",
        subTitle: "",
        subtitleColor: "",
        members: [],
        design: {
          backgroundColor: "#F0F0F0"
        }
      },
      contact: {
        title: "",
        subTitle: "",
        titleColor: "",
        subTitleColor: "",
        design: {
          backgroundColor: "#EFEFEF"
        }
      },
      footer: {
        info: {
          terms: "",
          transparency: {
            description: "",
            accountability: ""
          }
        },
        social: {
          facebook: "",
          twitter: "",
          linkedIn: "",
          whatsapp: "",
          secondaryWeb: "",
          instagram: ""
        },
        design: {
          backgroundColor: "",
          backgroundImage: ""
        }
      }
    };
    initialForm: WebProps;
    get isFormChanged() {
      return !_.isEqual(this.form, this.initialForm);
    }

    loaded = false;

    showModal = false;
    modalText = {
      title: "",
      subtitle: ""
    };
    onModalClose(): void {
      this.showModal = false;
    }
    onModalOpen(): void {
      this.showModal = true;
    }

    async handlePublishWebsite(active: boolean, websiteId: string) {
      //TODO: update the member to be active
      if (active === this.isActive) return;

      if (active) {
        this.modalText = {
          title: this.$tc("web.public.websiteStatus.publishWebsite.title"),
          subtitle: this.$tc("web.public.websiteStatus.publishWebsite.subtitle")
        };

        this.onModalOpen();
        await apiWebsite.website.publish(websiteId).catch(() => {
          this.$notify({
            type: "error",
            text: this.$tc("web.public.notify.publishWebsiteError")
          });
        });
      } else {
        this.modalText = {
          title: this.$tc("web.public.websiteStatus.unpublishWebsite.title"),
          subtitle: this.$tc(
            "web.public.websiteStatus.unpublishWebsite.subtitle"
          )
        };

        this.onModalOpen();
        await apiWebsite.website.unpublish(websiteId).catch(() => {
          this.$notify({
            type: "error",
            text: this.$tc("web.public.notify.unpublishWebsiteError")
          });
        });
      }

      this.onModalClose();
    }

    mounted() {
      // TODO: fetch template and load initial values from there, then load values from the
      // user configuration
      apiWebsite.section
        .get<WebProps>(this.websiteId, "web")
        .then(data => {
          const { templateId, properties } = data;

          this.form = _.defaultsDeep(properties, this.form);
          this.form.general.templateId = templateId;
          this.form.general.url = this.url;
          this.form.general.active = this.isActive;

          // Map images to correctly display initial values
          // See https://vueformulate.com/guide/inputs/types/file/#setting-initial-values for more info
          const mapImageField = <O extends object>(obj: O, field: keyof O) => {
            if (typeof obj[field] === "string" && !!obj[field]) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              obj[field] = [{ url: obj[field] }] as any;
            }
          };

          mapImageField(this.form.style, "logo");
          mapImageField(this.form.homePage, "mainImage");
          mapImageField(this.form.aboutUs, "imgUrl");
          this.form.aboutUs.features.icons.map(i => mapImageField(i, "url"));
          mapImageField(this.form.whyChooseUs, "imgUrl");
          mapImageField(this.form.bookings, "imgUrl");
          this.form.impact.data.map(i => mapImageField(i, "url"));
          mapImageField(this.form.impact.design, "backgroundImage");
          mapImageField(this.form.footer.design, "backgroundImage");

          // If there are less than 4 impact data items, add the missing ones to compensate
          // this is a hack, this should be fixed on the backend
          if (this.form.impact.data.length < 4) {
            const missingItems = 4 - this.form.impact.data.length;
            this.form.impact.data = this.form.impact.data.concat(
              Array.from({ length: missingItems }, (_, i) => ({
                id: this.form.impact.data.length + 1 + i,
                amount: "",
                text: "",
                url: ""
              }))
            );
          }

          if (this.form.aboutUs.features.icons.length < 4) {
            const missingItems = 4 - this.form.aboutUs.features.icons.length;
            this.form.aboutUs.features.icons = this.form.aboutUs.features.icons.concat(
              Array.from({ length: missingItems }, (_, i) => ({
                id: this.form.aboutUs.features.icons.length + 1 + i,
                description: "",
                title: "",
                url: ""
              }))
            );
          }

          if (this.form.whyChooseUs.subtitles.length < 4) {
            const missingItems = 4 - this.form.whyChooseUs.subtitles.length;
            this.form.whyChooseUs.subtitles = this.form.whyChooseUs.subtitles.concat(
              Array.from({ length: missingItems }, (_, i) => ({
                id: this.form.whyChooseUs.subtitles.length + 1 + i,
                description: "",
                title: "",
                url: ""
              }))
            );
          }

          this.initialForm = _.cloneDeep(this.form);
          this.loaded = true;
        })
        .catch(() => {
          this.$notify({
            type: "error",
            text: this.$tc("web.public.notify.error")
          });
        });
    }

    async onPublicWebSubmit(form) {
      const hasTemplateChanged =
        this.form.general.templateId !== this.initialForm.general.templateId;

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

      const postData: PublicWebFormData = {
        active: form.active,
        templateId: form.chosenTemplateId,
        websiteId: this.websiteId,
        type: "web",
        properties: _.cloneDeep(this.form)
      };

      const mapImgURL = async <T extends object>(obj: T, field: keyof T) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        obj[field] = (await getImgURL(obj[field])) as any;
      };
      const {
        aboutUs,
        style,
        homePage,
        whyChooseUs,
        bookings,
        impact,
        team,
        footer
      } = postData.properties;

      await Promise.all([
        mapImgURL(aboutUs, "imgUrl"),
        mapImgURL(style, "logo"),
        mapImgURL(homePage, "mainImage"),
        mapImgURL(whyChooseUs, "imgUrl"),
        mapImgURL(bookings, "imgUrl"),
        mapImgURL(impact.design, "backgroundImage"),
        mapImgURL(footer.design, "backgroundImage"),
        Promise.all(aboutUs.features.icons.map(i => mapImgURL(i, "url"))),
        Promise.all(impact.data.map(i => mapImgURL(i, "url"))),
        Promise.all(team.members.map(m => mapImgURL(m, "picture")))
      ]);

      try {
        await apiWebsite.section.put(postData);
        await this.handlePublishWebsite(
          this.form.general.active,
          this.websiteId
        );
        this.$notify({
          type: "success",
          text: this.$tc("web.public.notify.success")
        });
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
    margin-bottom: 5rem;

    section {
      margin-top: 40px;

      .title {
        @extend .flex, .row, .gap-1, .mb-2;

        h2 {
          margin-bottom: auto;
          @extend .grow-1;
        }
      }

      .subtitle {
        display: flex;
        justify-content: space-between;
        gap: 1rem;

        h3 {
          color: $color-black-03;
          font-size: 16px;
          font-weight: 400;
        }
      }
    }

    .form {
      &__row {
        @media (max-width: $br-md) {
          grid-template-columns: auto !important;
          flex-direction: column !important;
        }
      }
    }

    .public {
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
