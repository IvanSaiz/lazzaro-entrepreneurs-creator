<template lang="pug">
  .projects-read
    header
      h1 Proyectos
      p Todos tus proyectos sociales de crowd
    
    section.projects-read__content
      lz-table(
        title=""
        :fields="listFields"
        :items="projects"
      )
        template(#title="{ row: { title }}") {{ title }}
        template(#remainingTime="{ row: { remainingTime }}") {{ remainingTime }}
        template(#percentAchieve="{ row: { percentAchieve }}") {{ percentAchieve }}
        template(#total="{ row: { total }}") {{ total }}
        template(#status="{ row: { status }}") {{ status }}
        template(#actions="{ row: { actions }}")
          eye-icon(@click="viewProyect(row)")

      article.projects-read__create-btn
        lz-button(type="primary" @click='$router.push({ name: "projectsCreate" })') Nuevo proyecto
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import LzTable from "@/components/Table.vue";
  import { apiProjects } from "../api";
  import { namespace } from "vuex-class";

  const auth = namespace("auth");

  @Component({ components: { LzButton, LzTable } })
  export default class Read extends Vue {
    @auth.State("id")
    public ongId!: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    projects: any[] = [
      {
        name: "name",
        remainingTime: "remainingTime",
        percentAchieve: "percentAchieve",
        total: "total",
        status: "status"
      },
      {
        name: "name",
        remainingTime: "remainingTime",
        percentAchieve: "percentAchieve",
        total: "total",
        status: "status"
      },
      {
        name: "name",
        remainingTime: "remainingTime",
        percentAchieve: "percentAchieve",
        total: "total",
        status: "status"
      }
    ];

    listFields = [
      { id: "title", label: "Nombre" },
      { id: "remainingTime", label: "Tiempo restante" },
      { id: "percentAchieve", label: "% conseguido" },
      { id: "total", label: "Total" },
      { id: "status", label: "Estado" },
      { id: "actions", label: "Acciones" }
    ];
    mounted() {
      const today = new Date();
      apiProjects.getProjects(this.ongId).then(({ data }) => {
        data.forEach((project: any) => {
          const date = new Date(project.limitDate);
          const diff = Math.floor(
            (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
              Date.UTC(
                today.getFullYear(),
                today.getMonth(),
                today.getDate()
              )) /
              (1000 * 60 * 60 * 24)
          );
          const status = project.active ? "ACTIVADO" : "DESACTIVADO";
          const percentAchieve = (project.donated * 100) / project.amount;
          const projectData = {
            title: project.title,
            total: project.amount,
            remainingTime: project.limitDate ? diff : "Sin límite",
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
