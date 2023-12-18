<template lang="pug">
  .projects-read
    header
      h1 {{ $t('projects.read.title') }}
      p {{ $t('projects.read.subtitle') }}

    section.projects-read__content
      lz-table(title="" :fields="listFields" :items="projects")
        template(#title="{ row: { title }}") {{ title }}
        template(#skills="{ row: { skills }}") {{ skills }}
        template(#actions="{ row }")
          eye-icon(@click="viewProyect(row)")

      article.projects-read__create-btn
        lz-button(
          type="primary"
          @click="$router.push({ name: 'projectsCreate' })"
        ) {{ $t('projects.read.newProject') }}
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import LzTable from "@/components/Table.vue";
  import { apiProjects } from "../api";
  import { namespace } from "vuex-class";
  import VueI18n from "vue-i18n";

  const auth = namespace("auth");

  @Component({ components: { LzButton, LzTable } })
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

    viewProyect(row: any) {
      this.$router.push({
        name: "projectsCreate",
        params: { projectId: row.id }
      });
    }

    mounted() {
      apiProjects.getProjects(this.ongId).then(({ data: projects }) => {
        projects.forEach(project => {
          const projectData = {
            id: project.id,
            title: project.title,
            skills: ""
          };
          this.projects.push(projectData);
        });
      });
    }
  }
</script>

<style lang="scss">
  .projects-read {
    &__content {
      height: 100%;
      margin-top: 40px;

      .lz-table {
        text-align: left;

        &__th--actions {
          display: flex;
          justify-content: space-around;
          text-align: right;

          svg:hover {
            cursor: pointer;
            stroke: $color-black-01;
          }
        }
      }
    }

    &__create-btn {
      text-align: right;
    }
  }
</style>
