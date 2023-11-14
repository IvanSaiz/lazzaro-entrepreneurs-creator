<template lang="pug">
  .lz-modal
    lz-box
      .lz-modal__close(@click="() => { this.$emit('close'); }")
        x-icon
      slot
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzBox from "./Box.vue";

  @Component({ components: { LzBox } })
  export default class Modal extends Vue {}
</script>

<style lang="scss">
  .lz-modal {
    align-items: center;
    background-color: rgba($color-black-01, 0.2);
    display: flex;
    height: 100vh;
    justify-content: center;
    left: 0;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: $z-modal;

    &__close {
      cursor: pointer;
      position: absolute;
      right: 20px;
      top: 20px;
    }
  }
</style>
