<template>
  <div class="design">
    <LzModal v-if="visible" @close="closeModal">
      <div class="header">
        <h2>Diseño</h2>
        <h4>Portfolio</h4>
      </div>
      <FormulateForm>
        <section>
          <h2 class="h2--dash">
            {{ $t("projects.read.design.layout.title") }}
          </h2>
          <LayoutSelect
            name="portfolioLayout"
            v-model="properties.layout"
            :options="layoutOptions"
            optionClass="portfolio"
          >
            <template #tooltip>
              <div class="item">
                <img
                  src="@/assets/images/img-placeholder.svg"
                  alt="Placeholder"
                />
                <img
                  src="@/assets/images/img-placeholder.svg"
                  alt="Placeholder"
                />
                <img
                  src="@/assets/images/img-placeholder.svg"
                  alt="Placeholder"
                />
                <img
                  src="@/assets/images/img-placeholder.svg"
                  alt="Placeholder"
                />
                <img
                  src="@/assets/images/img-placeholder.svg"
                  alt="Placeholder"
                />
                <img
                  src="@/assets/images/img-placeholder.svg"
                  alt="Placeholder"
                />
              </div>
            </template>
          </LayoutSelect>
        </section>

        <section>
          <h2 class="h2--dash">{{ $t("projects.read.design.title") }}</h2>
          <FormulateInput
            v-model="properties.title"
            type="text"
            validation="required"
            validation-name="Titulo"
            label="Título"
          />
          <FormulateInput
            v-model="properties.subtitle"
            type="text"
            validation="required"
            validation-name="Subtítulo"
            label="Subtítulo"
          />
        </section>

        <section>
          <h2 class="h2--dash">{{ $t("projects.read.design.background") }}</h2>
          <ColorPicker v-model="properties.background" />
        </section>

        <LzButton type="secondary" @click="save" :disabled="saving">
          {{ $t("common.actions.save") }}
        </LzButton>
      </FormulateForm>
    </LzModal>
    <LzButton type="secondary" @click="openModal">
      {{ $t("projects.read.design.title") }}
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
  import LayoutSelect from "@/components/LayoutSelect.vue";
  import ColorPicker from "@/components/Input/ColorPicker.vue";
  const auth = namespace("auth");

  type Properties = {
    layout: "spaced" | "grid";
    title: string;
    subtitle: string;
    background: string;
  };

  @Component({ components: { LzModal, LzButton, LayoutSelect, ColorPicker } })
  export default class DesignModal extends Vue {
    @auth.State("id")
    ongId!: string;

    @auth.State("websiteId")
    websiteId!: string;

    @Prop({ type: String, required: true })
    section!: string;

    templateId!: string;
    visible = false;
    saving = false;
    sectionExists = false;

    properties: Properties = {
      title: "",
      subtitle: "",
      background: "",
      layout: "spaced"
    };

    layoutOptions = [
      {
        value: "spaced",
        label: this.$t("projects.read.design.layout.options.spaced")
      },
      {
        value: "grid",
        label: this.$t("projects.read.design.layout.options.grid")
      }
    ];

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
          this.$notify({
            text: this.$tc("common.notifications.changeSuccess"),
            type: "success"
          });
        })
        .catch(() => {
          this.$notify({
            text: this.$tc("common.error.generic"),
            type: "error"
          });
        })
        .finally(() => {
          this.saving = false;
        });
    }

    async loadSection() {
      try {
        const section = await apiWebsite.section.get<Properties>(
          this.websiteId,
          this.section
        );
        this.properties = section.properties;
        if (section.templateId) this.templateId = section.templateId;
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

    .lz-modal {
      overflow-y: auto;
      align-items: flex-start;

      .lz-box {
        margin-block: 4rem;
      }
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 2.8rem;

      .color-picker {
        margin-inline: auto;
        width: max-content;
      }

      section {
        display: flex;
        flex-direction: column;
        gap: 1.4rem;

        h2 {
          margin: 0;
        }
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

    .layout-select {
      margin: 0rem 4rem;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;

      .item {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        padding: 1.5rem 4rem;
        border: 1px solid $color-black-06;
        border-radius: 10px;
        box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);
        margin-bottom: 1rem;

        img {
          width: 100%;
        }
      }

      .spaced .item {
        gap: 16px;
      }
      .grid .item {
        gap: 0;
      }
    }
  }
</style>
