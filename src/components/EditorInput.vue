<template lang="pug">
.lz-editor-input
  .formulate-input-label {{ label }}
  label.formulate-input-subtitle {{ subtitle }}
  vue-editor.lz-editor-input__quill(@input="onInput" :value="value")
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from "vue-property-decorator";
  import { VueEditor } from "vue2-editor";

  @Component({ components: { VueEditor } })
  export default class EditorInput extends Vue {
    /**
     * Input label.
     */
    @Prop({ default: "" })
    readonly label!: string;

    /**
     * Input label.
     */
    @Prop({ default: "" })
    readonly value!: string;

    /**
     * Subtitle
     */
    @Prop({ default: "" })
    readonly subtitle!: string;

    /**
     * Emits the input event.
     * @returns String.
     */
    @Emit("input")
    onInput(data: any): string {
      return data;
    }
  }
</script>

<style lang="scss">
  .lz-editor-input {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 8px 0;

    &__quill {
      height: auto !important;
      margin-top: 8px !important;
      margin-bottom: 10px !important;
    }
  }
</style>
