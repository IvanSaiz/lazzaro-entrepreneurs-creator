<template lang="pug">
  .color-picker
    <chrome-picker v-model="hex" v-on:input="colorInput" />
</template>

<script lang="ts">
  import { Component, Vue, VModel } from "vue-property-decorator";

  type Color = {
    a: number;
    hex: string;
    rgba: {
      r: number;
      g: number;
      b: number;
      a: number;
    };
    hsl: {
      h: number;
      s: number;
      l: number;
      a: number;
    };
    hsv: {
      h: number;
      s: number;
      v: number;
      a: number;
    };
    oldHue: number;
    source: string;
  };

  @Component({
    name: "ColorPicker"
  })
  export default class ColorPicker extends Vue {
    @VModel({ type: String })
    hex: string;

    colorInput(e: Color) {
      const { hex } = e;
      this.hex = hex;
    }
  }
</script>

<style lang="scss">
  .color-picker {
    // Your SCSS styles here
  }
</style>
