<template lang="pug">
.color-text-input
  FormulateInput(
    v-model="text",
    type="text",
    :label="label",
  )
  .color
    palette-icon(
      :style="{ stroke: color }",
      width="34",
      height="34",
      stroke-width="1.4"
    )
    input(
      v-model="color",
      type="color",
      :name="nameColor ?? `${name}Color`",
    )
</template>

<script lang="ts">
  export default {
    props: {
      name: {
        type: String,
        required: true
      },
      nameColor: {
        type: String,
        default: ""
      },
      label: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        text: "",
        color: ""
      };
    },
    models: [
      {
        data: "text",
        event: "models:text"
      },
      {
        data: "color",
        event: "models:color"
      }
    ],
    watch: {
      text(newVal: string) {
        this.$emit("models:text", newVal);
      },
      color(newVal: string) {
        this.$emit("models:color", newVal);
      }
    }
  };
</script>

<style lang="scss">
  .color-text-input {
    position: relative;
    .color {
      position: absolute;
      top: calc(50% - 3px);
      right: 1rem;
      display: flex;

      input[type="color"] {
        opacity: 0;
        position: absolute;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: 2;

        &:hover {
          cursor: pointer;
        }
      }

      svg {
        height: 100%;
      }
    }
  }
</style>
