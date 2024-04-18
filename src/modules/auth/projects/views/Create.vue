<template lang="pug">
  .projects-create
    header
      h1 Nuevo proyecto de crowd
      p Configura aquí tu proyecto. Para cualquier duda o consulta contacta con tu asesor.
    
    section.projects-create__content
      formulate-form.projects-create__form(
        v-model="proyectForm"
        @submit="onCreateSubmit"
        :keep-model-data="true"
      )

        section.projects-create__left
          .form__row
            formulate-input(
              type="image"
              name="imageUrlToConvert"
              label="Imagen principal"
              :label-class="['required']"
              validation="required|mime:image/jpeg,image/png"
              label-position="before"
            )
          .form__row
            formulate-input(
              type="image"
              name="imagesToConvert"
              label="Imágenes"
              :label-class="['required']"
              validation="required|mime:image/jpeg,image/png"
              label-position="before"
              add-label="Añadir imagen"
              :multiple="true"
            )
        section.projects-create__right
          .form__row
            formulate-input(
              type="text"
              name="title"
              label="Nombre del proyecto"
              :label-class="['required']"
              validation="required"
            )
          .form__row
            formulate-input(
              type="textarea"
              name="description"
              label="Descripción"
              validation="required"
            )
          .form__row
            formulate-input(
              type="select"
              name="category"
              label="Categoría"
              :options="categoryOptions"
            )
            formulate-input(
              type="select"
              name="status"
              label="Estado"
              :options="statusOptions"
            )
          .form__row
            formulate-input(
              type="date"
              name="startDate"
              label="Fecha de inicio"
              :label-class="['required']"
              validation="required"
            )
            formulate-input(
              type="date"
              name="limitDate"
              label="Fecha final"
              :label-class="['required']"
              validation="required"
            )
            formulate-input(
              type="text"
              name="amount"
              label="Cantidad objetivo"
              :label-class="['required']"
              validation="required"
            )

        .projects-create__actions
          lz-button(type="tertiary") Eliminar proyecto
          lz-button(type="secondary") Cancelar
          lz-button(type="primary")  Guardar

</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import LzTable from "@/components/Table.vue";
  import { namespace } from "vuex-class";
  import { apiProjects } from "../api";
  import toBase64 from "@/utils/toBase64";

  const auth = namespace("auth");

  @Component({ components: { LzButton, LzTable } })
  export default class ProjectsCreate extends Vue {
    proyectId: string | null = null;
    statusOptions = {
      activado: "Activado",
      desactivado: "Desactivado"
    };
    categoryOptions = [
      "Infantil",
      "Educación",
      "Salud",
      "Animales",
      "Medio Ambiente",
      "Catástrofe natural",
      "Desarrollo económico",
      "Otro"
    ];
    proyectForm = {
      ongId: "",
      title: "",
      description: "",
      imageUrlToConvert: [] as any,
      imageUrl: "",
      amount: "",
      limitDate: null,
      imagesToConvert: [] as any,
      images: [] as any
    };

    @auth.State("id")
    public ongId!: string;

    mounted() {
      // url, existing proyect id
      this.proyectId = this.$route.params.proyectId;
      if (this.proyectId) {
        // get proyect data
      }
      this.proyectForm.ongId = this.ongId;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async onCreateSubmit(e: any) {
      const imageUrlToBase64 = (await toBase64(
        this.proyectForm.imageUrlToConvert.files[0].file
      )) as string;
      const imageUrlTrimmed = imageUrlToBase64;
      this.proyectForm.imageUrl = imageUrlTrimmed;
      this.proyectForm.imagesToConvert.files.forEach(async (image: any) => {
        const imageToBase64 = (await toBase64(image.file)) as string;
        const imageTrimmed = imageToBase64;
        this.proyectForm.images.push(imageTrimmed);
      });
      const body = this.proyectForm;
      body.imagesToConvert = null;
      body.imageUrlToConvert = null;
      apiProjects.postProject(body).then(() => {
        this.$notify({
          type: "success",
          text: "Proyecto creado con éxito"
        });
      });
      this.$router
        .push({ name: "proyects" })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((err: any) => {
          this.$notify({
            type: "error",
            text: this.$tc("common.error.generic")
          });
          console.error(err);
        });
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
