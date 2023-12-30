<template lang="pug">
.projects-create
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
        .form__col
          formulate-input(
            type="image"
            name="imageUrlToConvert"
            :label="$t('projects.create.mainImg.label')"
            :label-class="['required']"
            validation="required|mime:image/jpeg,image/png"
            :validation-name="$t('projects.create.mainImg.label')"
            label-position="before"
            :value="proyectForm.imageUrlToConvert"
          )
          p {{ $t('projects.create.mainImg.maxSize') }}
          p {{ $t('projects.create.mainImg.suportedFormats') }}
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
        .form__col
          lz-editor-input(
            :label="$t('projects.create.form.description.label')"
            :subtitle="$t('projects.create.form.description.subtitle')"
            v-model="proyectForm.description"
          )

        .form__row
          formulate-input(
            type="date"
            name="date"
            :value="proyectForm.date"
            :label="$t('projects.create.form.date')"
            :label-class="['required']"
            validation="required"
            :validation-name="$t('projects.create.form.date')"
          )
          formulate-input(
            type="text"
            name="skills"
            :value="proyectForm.skills"
            :label="$t('projects.create.form.skills')"
            :label-class="['required']"
            validation="required"
            :validation-name="$t('projects.create.form.skills')"
          )
        .form__row
          formulate-input(
              type="select"
              name="status"
              :value="proyectForm.status"
              :label="$t('projects.create.form.status.label')"
              :options="statusOptions"
            )
          .form__col

      .projects-create__actions
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

  const auth = namespace("auth");

  type TProjectForm = {
    title: string;
    description: string;
    date: string;
    skills: string;
    status: "enabled" | "disabled";
    imageUrlToConvert: { url: string }[];
    imagesToConvert: { url: string }[];
    organizationId: string;
    imageUrl: string;
    images: string[];
  };

  @Component({ components: { LzButton, LzTable, LzConfirm, LzEditorInput } })
  export default class ProjectsCreate extends Vue {
    loaded = false;
    showDeleteModal = false;
    isAlreadyPremiumSection = false;
    isPremiumSubscription = false;

    proyectForm: TProjectForm = {
      organizationId: "",
      title: "",
      description: "",
      status: "disabled",
      skills: "",
      imageUrlToConvert: [],
      imageUrl: "",
      date: "",
      imagesToConvert: [],
      images: []
    };

    @auth.State("organizationId")
    public organizationId!: string;

    @Prop()
    projectId!: string;

    statusOptions = {
      enabled: this.$t("projects.create.form.status.options.enabled"),
      disabled: this.$t("projects.create.form.status.options.disabled")
    };

    async getProject() {
      const project = await apiProjects.getProject(this.projectId);

      this.proyectForm.title = project.title;
      this.proyectForm.description = project.description;
      this.proyectForm.date = project.date.split("T")[0];
      this.proyectForm.skills = project.skills;
      this.proyectForm.status = project.status;
      this.proyectForm.imageUrlToConvert = [{ url: project.image_url }];
      this.proyectForm.imagesToConvert = project.images.map(url => ({ url }));
    }

    async createProject(payload: TProjectForm) {
      try {
        await apiProjects.postProject({
          date: payload.date,
          description: payload.description,
          image_url: payload.imageUrl,
          // Check this relation, memberId comes from auth store, which gets the id from member table
          // it should be organization_id, but organizations are not being created yet
          organization_id: payload.organizationId,
          skills: payload.skills,
          status: payload.status,
          images: payload.images,
          title: payload.title
        });

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
        await apiProjects.updateProject(this.projectId, {
          date: payload.date,
          description: payload.description,
          image_url: payload.imageUrl,
          organization_id: payload.organizationId,
          skills: payload.skills,
          status: payload.status,
          images: payload.images,
          title: payload.title
        });

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

    // Move this to actions in projects view
    async deleteProject() {
      try {
        await apiProjects.deleteProject(this.organizationId, this.projectId);

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

      const imageUrlToBase64 = await parseFile(
        this.proyectForm.imageUrlToConvert
      );

      const parsedImages: string[] = await parseFile(
        this.proyectForm.imagesToConvert
      );

      const body: TProjectForm = {
        ...this.proyectForm,
        imageUrl: imageUrlToBase64[0],
        images: Array.isArray(parsedImages) ? parsedImages : [parsedImages],
        organizationId: this.organizationId
      };

      if (isNewProject) this.createProject(body);
      else this.updateProject(body);
    }

    async mounted() {
      try {
        if (!this.projectId) {
          this.loaded = true;
          return;
        }
        await this.getProject();
      } catch (error) {
        this.$notify({
          type: "error",
          text: this.$tc("common.error.generic")
        });
      }

      this.loaded = true;

      this.proyectForm.organizationId = this.organizationId;
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
      margin-top: 40px;
      width: 100%;
    }
  }
</style>
