<template>
  <div class="projects-read">
    <DesignModal />
    <header>
      <h1>{{ $t("projects.read.title") }}</h1>
      <p>{{ $t("projects.read.subtitle") }}</p>
      <LzButton class="design-btn" type="secondary">
        {{ $t("projects.read.design") }}
        <EditIcon size="28" stroke-width="1.5" />
      </LzButton>
    </header>
    <section class="projectsRead__content">
      <LzTable :fields="listFields" :items="projects" :downloable="false">
        <template #title="{ row: { title } }">{{ title }}</template>
        <template #skills="{ row: { skills } }">{{ skills }}</template>
        <template #actions="{ row }">
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
  import DesignModal from "../components/DesignModal.vue";
  import { apiProjects } from "../api";
  import { namespace } from "vuex-class";
  import VueI18n from "vue-i18n";

  const auth = namespace("auth");

  @Component({ components: { LzButton, LzTable, DesignModal } })
  export default class Read extends Vue {
    @auth.State("id")
    public ongId!: string;
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
      apiProjects.getProjects(this.ongId).then(projects => {
        this.projects = projects.map(project => ({
          id: project.id,
          title: project.title,
          skills: project.skills
        }));
      });
    }

    viewProject(row: TProject) {
      this.$router.push({
        name: "projectsCreate",
        params: { projectId: row.id }
      });
    }
  }
</script>

<style lang="scss">
  .projects-read {
    header {
      display: flex;
      flex-direction: column;
    }

    .lz-button.design-btn {
      display: flex;
      align-items: center;
      gap: 24px;
      justify-content: space-between;
      margin-left: auto;
      padding: 10px, 16px, 10px, 16px;
      width: fit-content;
      height: max-content;
      color: $color-black-01;
      font-weight: 500;
      margin-block: 20px 0;
      border: 1px solid $color-black-06;
      border-radius: 10px;

      svg {
        margin: 0;
        top: 0;
        color: $color-black-02;
      }

      &:hover {
        cursor: pointer;
        background-color: $color-black-06;
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
        }

        #eye-icon {
          cursor: pointer;
        }
      }
    }

    .projectsRead__createBtn {
      margin-top: 3rem;
      text-align: right;
    }
  }
</style>
