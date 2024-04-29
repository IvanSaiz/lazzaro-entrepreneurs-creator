<template>
  <div class="projects-read">
    <LzModal
      v-if="deleteModalOpen"
      v-on:close="() => (deleteModalOpen = false)"
    >
      <h2>{{ $t("projects.read.deleteModal.title") }}</h2>
      <p>{{ $t("projects.read.deleteModal.subtitle") }}</p>
      <div class="actions">
        <LzButton type="secondary" @click="$emit('cancel')">
          {{ $t("common.actions.cancel") }}
        </LzButton>
        <LzButton type="primary" @click="$emit('confirm')">
          {{ $t("common.actions.delete") }}
        </LzButton>
      </div>
    </LzModal>
    <header>
      <div class="title">
        <h1>
          {{ $t("projects.read.title") }}
        </h1>
        <SectionToggle section="portfolio" />
        <div class="view-btn">
          <a :href="`${url}/#portfolio`" target="_blank">
            {{ $t("projects.read.see") }}
            <ArrowUpRightIcon />
          </a>
        </div>
      </div>
      <p>{{ $t("projects.read.subtitle") }}</p>
      <DesignModal section="portfolio" />
    </header>
    <section class="projectsRead__content">
      <LzTable
        title="projects"
        :fields="listFields"
        :items="projects"
        :downloable="false"
      >
        <template #title="{ row: { title } }">{{ title }}</template>
        <template #skills="{ row: { skills } }">{{ skills }}</template>
        <template #actions="{ row }">
          <TrashIcon id="trash-icon" @click="deleteProject(row)"></TrashIcon>
          <EyeIcon id="eye-icon" @click="viewProject(row)"></EyeIcon>
        </template>
      </LzTable>
    </section>
    <article class="projectsRead__createBtn">
      <LzButton
        type="primary"
        @click="$router.push({ name: 'projectsCreate' })"
      >
        {{ $t("projects.read.newProject") }}
      </LzButton>
    </article>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import LzTable from "@/components/Table.vue";
  import LzModal from "@/components/Modal.vue";
  import DesignModal from "../components/DesignModal.vue";
  import { apiProjects } from "../api";
  import { namespace } from "vuex-class";
  import VueI18n from "vue-i18n";
  import SectionToggle from "@/components/SectionToggle.vue";

  const auth = namespace("auth");

  @Component({
    components: { LzButton, LzTable, DesignModal, LzModal, SectionToggle }
  })
  export default class Read extends Vue {
    @auth.State("id")
    public memberId!: string;

    @auth.State("url")
    public url!: string;

    deleteModalOpen = false;

    projects: {
      id: string;
      title: string;
      skills: VueI18n.TranslateResult;
    }[] = [];

    listFields = [
      { id: "title", label: this.$t("projects.read.table.name") },
      { id: "skills", label: this.$t("projects.read.table.skills") },
      { id: "actions", label: this.$t("projects.read.table.actions") }
    ];

    mounted() {
      this.loadProjects();
    }

    loadProjects() {
      apiProjects.getProjects(this.memberId).then(projects => {
        this.projects = projects.map(project => ({
          id: project.id,
          title: project.title,
          skills: project.skills
        }));
      });
    }

    confirm(): Promise<boolean> {
      this.deleteModalOpen = true;

      return new Promise(res => {
        this.$on("confirm", () => {
          this.deleteModalOpen = false;
          res(true);
        });
        this.$on("cancel", () => {
          this.deleteModalOpen = false;
          res(false);
        });
      });
    }

    async deleteProject({ id }: TProject) {
      // If the user cancels, we don't want to delete the project
      if (!(await this.confirm())) return;

      apiProjects
        .deleteProject(id)
        .then(() => {
          this.$notify({
            type: "success",
            text: this.$tc("projects.create.notifications.projectRemoved")
          });
          this.loadProjects();
        })
        .catch(() => {
          this.$notify({
            type: "error",
            text: this.$tc("projects.create.notifications.projectRemovedError")
          });
        });
    }

    viewProject({ id }: TProject) {
      this.$router.push({
        name: "projectsCreate",
        params: { projectId: id }
      });
    }

    handleToggle() {
      // console.log("toggle");
      // TODO: Implement toggle
      return;
    }
  }
</script>

<style lang="scss">
  .projects-read {
    header {
      display: flex;
      flex-direction: column;

      .title {
        display: flex;
        gap: 18px;
        align-items: center;
      }

      .view-btn {
        margin-left: auto;
        justify-self: flex-end;
        align-self: flex-end;
        a {
          display: flex;
          align-items: center;
          gap: 4px;
          color: $color-black-02;
          font-weight: 400;
          font-size: 1.4rem;
          line-height: 1.5rem;
          svg {
            stroke: $color-black-02;
          }
        }
      }
    }

    .projectsRead__content {
      height: 100%;

      .lz-table {
        text-align: left;

        &__th--actions {
          display: flex;
          justify-content: flex-end;
          text-align: right;

          svg:hover {
            cursor: pointer;
            stroke: $color-black-01;
          }
        }

        &__td--actions {
          display: flex;
          justify-content: flex-end;
          text-align: right;
          gap: 1.5rem;
        }

        .icon {
          cursor: pointer;
        }
      }
    }

    .projectsRead__createBtn {
      margin-top: 3rem;
      text-align: right;
    }

    .actions {
      display: flex;
      gap: 2rem;
      margin-top: 2rem;
      .lz-button {
        margin: 0;
      }
    }
  }
</style>
