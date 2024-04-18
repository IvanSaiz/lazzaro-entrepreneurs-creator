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
    <Reviews v-model:props="form.reviews"></Reviews>
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
        footerColor: "",
        logo: "",
        mainTypography: "",
        menuColor: "",
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
          backgroundColor: "#F0F0F0"
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
        data: [],
        design: {
          backgroundColor: "#FFF0F0",
          backgroundImage: ""
        }
      },
      team: {
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

      // See https://vueformulate.com/guide/inputs/types/file/#upload-results-with-v-model-on-formulateinput
      // to check an example of the code below
      const getImgURL = async (img): Promise<string | string[]> => {
        if (typeof img?.upload === "function") {
          return img.upload().then(([res]) => {
            if (res && "url" in res) return res.url;

            return "";
          });
        }
        if (typeof img === "string") {
          return img;
        }
        if (Array.isArray(img)) {
          if (img.length === 1 && "url" in img[0]) {
            return img[0].url;
          } else if (img.every(pic => "url" in pic)) {
            return img.map(({ url }) => url);
          }
        }
        return "";
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
        await Promise.all([
          apiWebsite.section.put(postData),
          this.handlePublishWebsite(this.form.general.active, this.websiteId)
        ]);
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
      }

      .subtitle {
        display: flex;
        justify-content: space-between;
      }
    }

    .public {
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
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            align-items: flex-start;
            gap: 44px;

            .formulate-input-group-repeatable {
              height: 100%;
              display: flex;
              flex-direction: column;
            }
          }

          .impact-item {
            display: flex;
            flex-direction: column;

            &[data-type="image"] {
              margin-bottom: auto !important;
            }

            &:not(:last-child) {
              margin-bottom: 1rem;
            }

            formulate-input {
              width: 100%;
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
