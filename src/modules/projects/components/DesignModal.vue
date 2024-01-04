<template>
  <div class="design">
    <LzModal v-if="visible" @close="closeModal">
      <div class="header">
        <h2>Diseño</h2>
        <h4>Portfolio</h4>
      </div>
      <FormulateForm v-model="properties">
        <h2 class="h2--dash">Título</h2>
        <FormulateInput
          name="title"
          type="text"
          validation="required"
          validation-name="Titulo"
          label="Título"
        />
        <FormulateInput
          name="subtitle"
          type="text"
          validation="required"
          validation-name="Subtítulo"
          label="Subtítulo"
        />
        <h2 class="h2--dash">Fondo</h2>
        <FormulateInput
          name="background"
          type="color"
          validation="required"
          validation-name="Color"
          label="Color"
        />
        <LzButton type="secondary" @click="save" v-disabled="saving">
          Guardar
        </LzButton>
      </FormulateForm>
    </LzModal>
    <LzButton type="secondary" @click="openModal">
      {{ $t("projects.read.design") }}
      <EditIcon size="28" stroke-width="1.5" />
    </LzButton>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import LzModal from "@/components/Modal.vue";
  import LzButton from "@/components/Button.vue";
  import { apiWebsite } from "@/modules/web/api";
  const auth = namespace("auth");

  type Properties = {
    title: string;
    subtitle: string;
    background: string;
  };

  @Component({ components: { LzModal, LzButton } })
  export default class DesignModal extends Vue {
    @auth.State("id")
    public ongId!: string;

    @auth.State("websiteId")
    public websiteId!: string;

    @auth.State("templateId")
    public templateId!: string;

    @Prop({ type: String, required: true })
    section!: string;

    visible = false;
    saving = false;
    sectionExists = false;

    properties: Properties = {
      title: "",
      subtitle: "",
      background: ""
    };

    openModal() {
      this.visible = true;
    }

    closeModal() {
      this.visible = false;
    }

    save() {
      const sectionBody = {
        websiteId: this.websiteId,
        templateId: this.templateId,
        type: this.section,
        properties: this.properties
      };

      const process = (body: typeof sectionBody) =>
        this.sectionExists
          ? apiWebsite.section.put(body)
          : apiWebsite.section.post(body);

      this.saving = true;
      process(sectionBody)
        .then(() => {
          this.saving = false;
          this.$notify({
            text: this.$tc("common.notifications.changeSuccess"),
            type: "success"
          });
          this.closeModal();
        })
        .catch(() => {
          this.saving = false;
          this.$notify({
            text: this.$tc("common.error.generic"),
            type: "error"
          });
        });
    }

    async loadSection() {
      try {
        const section = await apiWebsite.section.get<Properties>(
          this.websiteId,
          this.section
        );
        console.log(section);
        this.properties = section.properties;
        this.sectionExists = true;
      } catch {
        this.sectionExists = false;
      }
    }

    async mounted() {
      await this.loadSection();
    }
  }
</script>

<style lang="scss">
  .design {
    .lz-box {
      min-width: 600px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 16px;

      input[type="color"] {
        padding-block: 5px;
      }
    }

    .header {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .lz-button {
      display: flex;
      align-items: center;
      gap: 18px;
      justify-content: space-between;
      margin-left: auto;
      padding: 10px 12px;
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
  }
</style>
