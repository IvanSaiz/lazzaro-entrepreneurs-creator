<template lang="pug">
section.choose-template
  div
    .choose-template__header
      h2.h2--dash {{ $t('web.public.chooseTemplate.title') }}
    .templates
      .template(v-for='(template) in computedTemplates' :style='template.style' :key='template.id')
        input(type="radio" :value='template.id' v-model='template.id' @click="handleChooseTemplate"
        :disabled="isTemplateDisabled(template.id)"
        )
        .template__body(:style="template.backgroundImage")
        .template__footer
          p.text {{ template.text }} 
          <eye-icon  @click.prevent='openModal(template.id)' /> 
    .lz-choose-modal(v-if="showModal")
      lz-modal(@close="closeModal")
        .lz-modal-description {{ $t('web.public.chooseTemplate.modalText') }}
        .lz-modal-img
          img(:src='modalImage' alt="modal image")
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator";
  import LzModal from "@/components/Modal.vue";
  import LzButton from "@/components/Button.vue";
  import { apiOngs } from "../../api";

  type TTemplate = Record<"id" | "image", string>;

  @Component({
    components: { LzButton, LzModal }
  })
  export default class ChooseTemplate extends Vue {
    showModal = false;
    templates: TTemplate[] = [];
    modalImage = "";
    modernTemplateId = "";

    @Prop({ required: true })
    protected readonly chosenTemplateId!: string;

    @Prop({ required: true })
    public handleChooseTemplate!: (e: Event) => void;

    async mounted() {
      const data = await apiOngs.getTemplates();
      this.templates = data;
      this.modernTemplateId = data.find(item => item.name === "modern").id;
    }

    openModal(clickedTemplateId = "") {
      this.showModal = true;

      this.modalImage =
        this.templates.find(({ id }) => id === clickedTemplateId)?.image || "";
    }

    closeModal() {
      this.showModal = false;
    }

    get theme() {
      return (templateId: TTemplate["id"]) =>
        templateId === this.chosenTemplateId
          ? this.chosenTemplateTheme
          : this.fallBackTheme;
    }

    get chosenTemplateTheme() {
      return {
        "--template-footer-background-color": "#0093A7",
        "--svg-icon-color": "white",
        "--template-text-color": "white"
      };
    }

    get fallBackTheme() {
      return {
        "--template-footer-background-color": "#ffffff",
        "--svg-icon-color": "#2c3e50",
        "--template-text-color": "black"
      };
    }
    get computedTemplates() {
      return this.templates?.map((template, i) => ({
        id: template.id,
        style:
          template.id === this.chosenTemplateId
            ? this.chosenTemplateTheme
            : this.fallBackTheme,
        backgroundImage: { backgroundImage: `url(${template.image})` },
        text: this.$t(`web.public.chooseTemplate.template${i + 1}`)
      }));
    }

    isTemplateDisabled(templateId: string): boolean {
      return templateId !== this.modernTemplateId;
    }
  }
</script>

<style lang="scss">
  .choose-template {
    .templates {
      display: flex;
      align-items: center;
      width: 100%;
      gap: 2.3rem;
      margin-block: 2.5rem;

      @media (max-width: $br-md) {
        flex-direction: column;
      }
    }

    .disabled-input {
      opacity: 0.5;
    }
    .template {
      width: 358px;
      height: 262px;
      border-radius: 1rem;
      position: relative;
      overflow: hidden;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

      input {
        height: 100%;
        width: 100%;
        position: absolute;
        opacity: 0;
        z-index: 99;
        cursor: pointer;
      }
      //TODO: to be modified
      &:has(input:disabled) {
        filter: grayscale(100%);
        background-color: #333;
        opacity: 0.5;
      }

      &__body {
        background: #d9d9d9;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: top;
      }

      &__footer {
        padding: 1.8rem 1.5rem;
        border-radius: 1rem;
        border: 1px solid transparent;
        transition: background-color 0.3s ease-in-out;
        background-color: var(--template-footer-background-color);
        position: absolute;
        bottom: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;

        p.text {
          color: var(--template-text-color);
          font-size: 1.2rem;
          font-family: Muli;
          font-style: normal;
          font-weight: 600;
          line-height: 2rem;
        }
      }

      @media (max-width: $br-md) {
        width: 100%;
      }
    }

    svg {
      z-index: 100;
      cursor: pointer;
    }
    svg path,
    svg circle {
      color: var(--svg-icon-color);
    }

    svg:hover {
      transition: transform 0.3s ease-in-out;
      transform: scale(1.1);
    }

    /* modal */
    .lz-modal .lz-box {
      padding: 0;
      background-color: #d9d9d9;
      width: 50%;

      @media (max-width: 768px) {
        width: 85%;
      }
    }

    .lz-modal-description {
      padding: 2rem;
      background-color: white;
      border-radius: 1.2rem;
      margin-bottom: 2rem;

      font {
        font-size: 1.2rem;
        color: black;
      }
    }

    .lz-modal-img {
      height: 536px;
      width: 100%;
      overflow-y: scroll;
      border-top-left-radius: 1.5rem;
      border-top-right-radius: 1.5rem;

      &::-webkit-scrollbar {
        display: none;
      }

      img {
        width: 100%;
        object-fit: cover;
      }
    }
  }
</style>
