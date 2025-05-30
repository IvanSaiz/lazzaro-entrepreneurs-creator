<template>
  <div class="design">
    <LzModal v-if="visible" @close="closeModal">
      <div class="header">
        <h2>{{ $t("events.read.design.modal.title") }}</h2>
        <h4>{{ $t("events.read.design.modal.section") }}</h4>
      </div>
      <FormulateForm>
        <h2 class="h2--dash">
          {{ $t("events.read.design.modal.form.title") }}
        </h2>
        <ColorText
          name="title"
          v-models:text="properties.title"
          v-models:color="properties.titleColor"
          validation="required"
          validation-name="Titulo"
          :label="$t('events.read.design.modal.form.labels.title')"
        />
        <ColorText
          name="subtitle"
          v-models:text="properties.subtitle"
          v-models:color="properties.subtitleColor"
          validation="required"
          validation-name="Subtítulo"
          :label="$t('events.read.design.modal.form.labels.subtitle')"
        />
        <h2 class="h2--dash">Fondo</h2>
        <ColorPicker v-model="properties.background" />
        <LzButton type="secondary" @click="save" :disabled="saving">
          {{ $t("events.read.design.modal.form.save") }}
        </LzButton>
      </FormulateForm>
    </LzModal>
    <LzButton type="secondary" @click="openModal">
      {{ $t("common.design.button") }}
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
    titleColor: string;
    subtitle: string;
    subtitleColor: string;
    background: string;
  };

  @Component({ components: { LzModal, LzButton } })
  export default class DesignModal extends Vue {
    @auth.State("id")
    ongId!: string;

    @auth.State("websiteId")
    websiteId!: string;

    @Prop({ type: String, required: true })
    section!: string;

    visible = false;
    saving = false;
    sectionExists = false;

    properties: Properties = {
      title: "",
      titleColor: "",
      subtitle: "",
      subtitleColor: "",
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
        type: this.section,
        properties: this.properties
      };

      const process = (body: typeof sectionBody) =>
        this.sectionExists
          ? apiWebsite.section.put(this.websiteId, body)
          : apiWebsite.section.post(this.websiteId, body);

      this.saving = true;
      process(sectionBody)
        .then(() => {
          this.saving = false;
          this.$notify({
            text: this.$tc("common.notifications.changeSuccess"),
            type: "success"
          });
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
        this.properties = { ...this.properties, ...section.properties };
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

      .color-picker {
        width: min-content;
        margin-inline: auto;
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
