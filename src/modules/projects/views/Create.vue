<template lang="pug">
.projects-create
  lz-confirm(
    v-if="showDeleteModal"
    @close='showDeleteModal = false'
    @confirm='deleteProject'
  )

  header
    h1 {{ $t('projects.create.title') }}
    p {{ $t('projects.create.subtitle') }}

  section.projects-create__content(v-if="loaded")
    formulate-form.projects-create__form(
      v-model="proyectForm"
      @submit="onSubmit"
      :keep-model-data="true"
    )
      section.projects-create__left
        .form__row
          formulate-input(
            type="toggle"
            name="isPremium"
            :label="$t('projects.create.highlight.label')"
            label-position="before"
            :wrapper-class="['formulate-input-inline-toggle']"
            :disabled='!isPremiumSubscription'
            @click="popUpgradeToPremiumMessage"
          )
            template(#label="{ label }")
              label
                .formulate-input-label {{ label }}
                  span
                    crown-icon
                .formulate-input-under-label {{ $t('projects.create.highlight.under') }}
        .form__row
          formulate-input(
            type="image"
            name="imageUrlToConvert"
            :label="$t('projects.create.mainImg')"
            :label-class="['required']"
            validation="required|mime:image/jpeg,image/png"
            :validation-name="$t('projects.create.mainImg')"
            label-position="before"
            :value="proyectForm.imageUrlToConvert"
          )
        .form__row
          formulate-input.formulate-input-element--image-simple(
            type="image"
            name="imagesToConvert"
            :label="$t('projects.create.images.label')"
            :label-class="['required']"
            validation="required|mime:image/jpeg,image/png"
            :validation-name="$t('projects.create.images.label')"
            label-position="before"
            :add-label="$t('projects.create.images.add')"
            :multiple="true"
            :value="proyectForm.imagesToConvert"
          )

      section.projects-create__right
        .form__row
          formulate-input(
            type="text"
            name="title"
            :label="$t('projects.create.form.name')"
            :label-class="['required']"
            validation="required"
            :validation-name="$t('projects.create.form.name')"
          )
        .form__row
          lz-editor-input(
            :label="$t('projects.create.form.description')"
            v-model="proyectForm.description"
          )

        .form__row
          formulate-input(
            type="select"
            name="category"
            :label="$t('projects.create.form.category.label')"
            :options="categoryOptions"
          )
          formulate-input(
            type="select"
            name="status"
            :label="$t('projects.create.form.status.label')"
            :options="statusOptions"
          )
        .form__row
          formulate-input(
            type="date"
            name="startDate"
            :label="$t('projects.create.form.startDate')"
            :label-class="['required']"
            validation="required"
            :validation-name="$t('projects.create.form.startDate')"
          )
          formulate-input(
            type="date"
            name="limitDate"
            :label="$t('projects.create.form.limitDate.label')"
            :help="$t('projects.create.form.limitDate.help')"
          )
          formulate-input(
            type="text"
            name="amount"
            :label="$t('projects.create.form.amount')"
            :label-class="['required']"
            validation="required"
            :validation-name="$t('projects.create.form.amount')"
          )

      .projects-create__actions
        lz-button(type="tertiary" @click.prevent="confirmDeleteProject") {{$t('common.actions.delete')}}
        lz-button(
          type="secondary"
          @click.prevent="$router.push({ name: 'projectsRead' })"
        ) {{ $t('common.actions.cancel') }}
        lz-button(type="primary") {{ $t('common.actions.save') }}
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import LzTable from "@/components/Table.vue";
  import LzConfirm from "@/components/Confirm.vue";
  import { namespace } from "vuex-class";
  import { apiProjects } from "../api";
  import { parseFile } from "@/utils/parseFile";
  import LzEditorInput from "@/components/EditorInput.vue";
  import {
    checkIsAlreadyPremiumSections,
    inValidatePremiumSectionsCache,
    checkSubscriptionPlan
  } from "@/utils";

  const auth = namespace("auth");

  type TProjectForm = {
    title: string;
    description: string;
    category: TProject["data"]["ambit"];
    status: "enabled" | "disabled";
    active: boolean;
    startDate: string;
    limitDate: string;
    amount: number;
    imageUrlToConvert: { url: string }[];
    imagesToConvert: { url: string }[];
    ongId: string;
    imageUrl: string;
    images: string[];
    isPremium: boolean;
  };

  @Component({ components: { LzButton, LzTable, LzConfirm, LzEditorInput } })
  export default class ProjectsCreate extends Vue {
    loaded = false;
    showDeleteModal = false;
    isAlreadyPremiumSection = false;
    isPremiumSubscription = false;

    statusOptions = {
      enabled: this.$t("projects.create.form.status.options.enabled"),
      disabled: this.$t("projects.create.form.status.options.disabled")
    };

    categoryOptions = {
      Infantil: this.$t("projects.create.form.category.options.children"),
      Educación: this.$t("projects.create.form.category.options.education"),
      Salud: this.$t("projects.create.form.category.options.health"),
      Animales: this.$t("projects.create.form.category.options.animals"),
      "Medio ambiente": this.$t(
        "projects.create.form.category.options.environment"
      ),
      "Catástrofe natural": this.$t(
        "projects.create.form.category.options.naturalDisaster"
      ),
      "Desarrollo económico": this.$t(
        "projects.create.form.category.options.economicDev"
      ),
      Otro: this.$t("projects.create.form.category.options.other")
    };

    proyectForm: TProjectForm = {
      status: "disabled",
      active: false,
      ongId: "",
      title: "",
      description: "",
      imageUrlToConvert: [],
      imageUrl: "",
      amount: 0,
      limitDate: "",
      startDate: "",
      imagesToConvert: [],
      images: [],
      category: "Otro",
      isPremium: false
    };

    @auth.State("id")
    public ongId!: string;

    @Prop()
    projectId!: string;

    async getProject() {
      const { data: project } = await apiProjects.getProject(this.projectId);

      this.proyectForm.title = project.title;
      this.proyectForm.status = project.active ? "enabled" : "disabled";
      this.proyectForm.description = project.description;
      this.proyectForm.imageUrlToConvert = [{ url: project.imageURL }];
      this.proyectForm.amount = project.amount;
      this.proyectForm.limitDate = project.limitDate;
      this.proyectForm.startDate = project.startDate;
      this.proyectForm.category = project.ambit;
      this.proyectForm.isPremium = project.isPremium;
    }

    async getProjectImages() {
      const { data: projectImages } = await apiProjects.getProjectImages(
        this.projectId
      );

      this.proyectForm.imagesToConvert.length = 0;
      projectImages.forEach(image => {
        this.proyectForm.imagesToConvert.push({ url: image.img_url });
      });
    }

    async createProject(payload: TProjectForm) {
      try {
        await apiProjects.postProject(payload);

        this.$notify({
          type: "success",
          text: this.$tc("projects.create.notifications.projectCreated")
        });
        this.$router.push({ name: "projectsRead" });
      } catch (error) {
        this.$notify({
          type: "error",
          text: this.$tc("common.error.generic")
        });
      }
    }

    async updateProject(payload: TProjectForm) {
      try {
        await apiProjects.updateProject(this.projectId, payload);

        this.$notify({
          type: "success",
          text: this.$tc("projects.create.notifications.projectEdited")
        });
        this.$router.push({ name: "projectsRead" });
      } catch (error) {
        this.$notify({
          type: "error",
          text: this.$tc("common.error.generic")
        });
      }
    }

    async deleteProject() {
      try {
        await apiProjects.deleteProject(this.ongId, this.projectId);

        if (this.proyectForm.isPremium) {
          inValidatePremiumSectionsCache();
        }

        this.$notify({
          type: "success",
          text: this.$tc("projects.create.notifications.projectRemoved")
        });

        this.$router.push({ name: "projectsRead" });
      } catch (error) {
        const axiosError: any = error;
        this.showDeleteModal = false;

        if (axiosError?.response?.status === 409) {
          return this.$notify({
            type: "error",
            text: this.$tc("projects.create.notifications.projectHasDonations")
          });
        }

        this.$notify({
          type: "error",
          text: this.$tc("common.error.generic")
        });
      }
    }

    confirmDeleteProject() {
      this.showDeleteModal = true;
    }

    async onSubmit() {
      const isNewProject = !this.projectId;
      const { isPremium } = this.proyectForm;

      if (isPremium) {
        const {
          isAlreadyPremiumSection,
          premiumProjectId
        } = await checkIsAlreadyPremiumSections(this.ongId);

        const inValidSubmit =
          isAlreadyPremiumSection && premiumProjectId !== this.projectId;

        if (inValidSubmit) {
          return this.$notify({
            type: "warn",
            text: this.$tc("projects.create.notifications.alreadyPremium")
          });
        }
      }

      const imageUrlToBase64 = await parseFile(
        this.proyectForm.imageUrlToConvert
      );

      const parsedImages: string[] = await parseFile(
        this.proyectForm.imagesToConvert
      );

      const body: TProjectForm = {
        ...this.proyectForm,
        active: this.proyectForm.status == "enabled",
        imageUrl: imageUrlToBase64[0],
        images: Array.isArray(parsedImages) ? parsedImages : [parsedImages],
        imageUrlToConvert: [],
        imagesToConvert: [],
        ongId: this.ongId
      };

      if (isNewProject) this.createProject(body);
      else this.updateProject(body);

      inValidatePremiumSectionsCache();
    }

    popUpgradeToPremiumMessage(): void {
      if (this.isPremiumSubscription) return;

      this.$notify({
        type: "info",
        text: this.$tc("common.notifications.upgradeToPremium"),
        ignoreDuplicates: true
      } as NotificationOptions);
    }

    async mounted() {
      try {
        this.isPremiumSubscription = (
          await checkSubscriptionPlan(this.ongId)
        ).isPremiumSubscription;

        if (!this.projectId) {
          this.loaded = true;
          return;
        }
        await Promise.all([this.getProject(), this.getProjectImages()]);
      } catch (error) {
        this.$notify({
          type: "error",
          text: this.$tc("common.error.generic")
        });
      }

      this.loaded = true;

      this.proyectForm.ongId = this.ongId;
    }
  }
</script>

<style lang="scss">
  .projects-create {
    font-size: 1rem;

    &__form {
      display: flex;
      flex-wrap: wrap;
      margin-top: 40px;
    }

    &__left {
      flex-basis: 20%;
    }

    &__images {
      width: 100%;
    }

    &__right {
      flex: 1;
      padding-left: 40px;
    }

    &__actions {
      text-align: right;
      margin-top: 100px;
      width: 100%;
    }
  }
</style>
