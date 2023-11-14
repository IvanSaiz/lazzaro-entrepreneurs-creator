<template lang="pug">
  .projects-read
    header
      h1 {{ $t('projects.read.title') }}
      p {{ $t('projects.read.subtitle') }}

    section.projects-read__content
      lz-table(title="" :fields="listFields" :items="projects")
        template(#title="{ row: { title }}") {{ title }}
        template(#remainingTime="{ row: { remainingTime }}") {{ remainingTime }}
        template(#percentAchieve="{ row: { percentAchieve }}") {{ percentAchieve }}
        template(#total="{ row: { total }}") {{ total }}
        template(#status="{ row: { status }}") {{ status }}
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
      total: number;
      remainingTime: number | VueI18n.TranslateResult;
      percentAchieve: string | number;
      status: VueI18n.TranslateResult;
    }[] = [];

    listFields = [
      { id: "title", label: this.$t("projects.read.table.name") },
      { id: "remainingTime", label: this.$t("projects.read.table.time.label") },
      { id: "percentAchieve", label: this.$t("projects.read.table.percent") },
      { id: "total", label: this.$t("projects.read.table.total") },
      { id: "status", label: this.$t("projects.read.table.status.label") },
      { id: "actions", label: this.$t("projects.read.table.actions") }
    ];

    viewProyect(row: any) {
      this.$router.push({
        name: "projectsCreate",
        params: { projectId: row.id }
      });
    }

    mounted() {
      const today = new Date();
      apiProjects.getProjects(this.ongId).then(({ data: projects }) => {
        projects.forEach(project => {
          const date = new Date(project.limitDate);
          const timeDiff = date.getTime() - today.getTime();
          const remainingDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

          const daysToShow =
            remainingDays > 0
              ? `${remainingDays} ${this.$t(
                  "projects.read.table.time.options.days"
                )}`
              : remainingDays === 0
              ? this.$t("projects.read.table.time.options.today")
              : this.$t("projects.read.table.time.options.expired");

          const status = project.active
            ? this.$t("projects.read.table.status.options.enabled")
            : this.$t("projects.read.table.status.options.disabled");
          const percentAchieve =
            (project.donated * 100) / (project.amount || 1);
          const projectData = {
            id: project.id,
            title: project.title,
            total: project.amount,
            remainingTime: project.limitDate
              ? daysToShow
              : this.$t("projects.read.table.time.options.noLimit"),
            percentAchieve: percentAchieve.toFixed(2),
            status: status
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
