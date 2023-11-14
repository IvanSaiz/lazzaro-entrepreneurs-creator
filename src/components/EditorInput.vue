<template lang="pug">
    .lz-editor-input
      .formulate-input-label {{ label }}
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
    protected readonly label!: string;

    /**
     * Input label.
     */
    @Prop({ default: "" })
    protected readonly value!: string;

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
    margin: 8px 0;

    &__quill {
      height: auto !important;
      margin-top: 8px !important;
      margin-bottom: 10px !important;
    }
  }
</style>
