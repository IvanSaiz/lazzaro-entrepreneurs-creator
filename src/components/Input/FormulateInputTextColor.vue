<template lang="pug">
  div(
    :class="context.classes.element"
    :data-type="context.type"
  )
    input(
      v-model="context.model"
      type="text"
    )
    input(
      v-model="context.model"
      type="color"
      v-bind="attributes"
      @blur="context.blurHandler"
      v-on="$listeners"
    )
    .formulate-input-element-icon
      palette-icon(:style="{ stroke: context.model }")
    
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import FormulateInputMixin from "@braid/vue-formulate";

  @Component({
    mixins: [FormulateInputMixin]
  })
  export default class FormulateInputToggle extends Vue {
    @Prop({ required: true })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected readonly context!: any;

    get attributes() {
      return this.context.attributes || {};
    }
  }
</script>

<style lang="scss">
  form {
    .formulate-input {
      &[data-classification="text-color"] {
        .formulate-input-element {
          position: relative;
          $icon-size: 35px;

          input {
            &[type="text"] {
              width: 100%;
            }

            &[type="color"] {
              opacity: 0;
              position: absolute;
              right: 8px;
              padding: 0;
              width: $icon-size;
              z-index: 2;

              &:hover {
                cursor: pointer;
              }
            }
          }

          &-icon {
            background-color: $color-white;
            position: absolute;
            right: 8px;
            top: 50%;
            transform: translateY(-50%);

            svg {
              height: $icon-size;
              width: $icon-size;
              stroke: $color-black-01;
              stroke-width: 1px;
            }
          }
        }
      }
    }
  }
</style>
