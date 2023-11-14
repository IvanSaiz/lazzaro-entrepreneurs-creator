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

      section.public-contact
        .public-contact__header
          h2.h2--dash {{ $t('web.public.contactForm.title') }}
          h4 {{ $t('web.public.contactForm.subtitle') }}
          .public-contact__content
            formulate-input(
              type="tel"
              name="phone"
              :label="$t('web.public.contactForm.phone')"
            )
            formulate-input(
              type="text"
              name="address"
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
  import LzButton from "@/components/Button.vue";
  import LzTable from "@/components/Table.vue";
  import { namespace } from "vuex-class";
  import { apiBrand, apiWebsite } from "../api";
  import { parseFile } from "@/utils/parseFile";
  import LzEditorInput from "@/components/EditorInput.vue";
  import { ChooseTemplate } from "../components";
  import LzModal from "@/components/Modal.vue";
  import { checkSubscriptionPlan } from "@/utils";
  import cloneDeep from "lodash/cloneDeep";
  import isEqual from "lodash/isEqual";
  import isObjectEmpty from "lodash/isEmpty";

  const auth = namespace("auth");

  @Component({
    components: {
      LzButton,
      LzTable,
      LzEditorInput,
      ChooseTemplate,
      LzModal
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
      footer: {
        info: {
          terms: "",
          transparency: {
            description: "",
            accountability: ""
          }
        },
        social: {
          twitter: "",
          facebook: "",
          linkedIn: "",
          whatsapp: "",
          instagram: "",
          secondaryWeb: ""
        }
      },
      phone: "",
      address: ""
    };
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

    async onPublicWebSubmit() {
      const transparency = (
        await parseFile(this.publicWebForm.accountability)
      ).map((file: any, key: any) => {
        return {
          file,
          title: this.publicWebForm.accountability.files[key].name
        };
      });

      console.log(transparency);

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
        &__form {
          display: flex;
        }

        &__image {
          width: 137px;
          margin-right: 34px;
        }

        &__texts {
          flex-grow: 1;
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
      margin-top: 5.6rem
    }

    .public-buttons .save-btn {
      right: 8.7rem;
    }

    .public-buttons .cancel-btn {
      right: 30.7rem;
    }
  }
</style>
