<template lang="pug">
  div(
    :class="context.classes.element"
    :data-type="context.type"
  )
    .formulate-input-under-label(v-if="underLabel") {{ underLabel }}
    .formulate-input-toggle(
      :class="{ 'formulate-input-toggle-active': context.model }"
    )
      input(
        v-model="context.model"
        type="checkbox"
        :value="context.value"
        v-bind="attributes"
        v-on="$listeners"
        @blur="context.blurHandler"
      )

</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";

  @Component
  export default class FormulateInputToggle extends Vue {
    @Prop({ required: true })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected readonly context!: any;

    get attributes() {
      return this.context.attributes || {};
    }

    @Prop({ required: false })
    protected readonly underLabel?: string;
  }
</script>
