<template>
  <div class="design-modal">
    <LzModal v-if="visible" @close="closeModal">
      <div class="header">
        <h2>{{ $t("projects.read.design") }}</h2>
        <slot name="header"></slot>
      </div>
      <slot name="form"></slot>
    </LzModal>
    <LzButton type="secondary" @click.prevent="openModal">
      {{ $t("projects.read.design") }}
      <EditIcon size="28" stroke-width="1.5" />
    </LzButton>
  </div>
</template>

<script lang="ts">
  import LzModal from "./Modal.vue";
  import LzButton from "./Button.vue";
  import { Component, Vue, Prop } from "vue-property-decorator";

  @Component({ components: { LzModal, LzButton } })
  export default class DesignModal extends Vue {
    @Prop({ type: String, required: true })
    section: string;

    visible = false;
    openModal() {
      this.visible = true;
    }
    closeModal() {
      this.visible = false;
    }
  }
</script>

<style lang="scss">
  .design-modal {
    .lz-box {
      min-width: 600px;
      background-color: $color-black-07;
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
      margin-bottom: 2rem;

      h2,
      h4 {
        margin: 0 !important;
      }
    }

    .lz-button {
      display: flex;
      align-items: center;
      gap: 2rem;
      justify-content: space-between;
      margin-left: auto;
      padding: 12px;
      width: fit-content;
      height: max-content;
      color: $color-black-01;
      font-weight: 500;
      margin-block: 0;
      border: 1px solid $color-black-06;
      border-radius: 10px;
      font-size: 1.4rem;

      svg {
        margin: 0;
        top: 0;
        stroke: black;
      }

      &:hover {
        cursor: pointer;
        background-color: $color-black-06;
      }
    }
  }
</style>
