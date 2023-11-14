<template lang="pug">
  .lz-loader
    img.lz-loader__spinner(src="@/assets/images/loader.gif")

</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component
  export default class Loader extends Vue {
    beforeMount() {
      document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    }

    beforeDestroy() {
      document.getElementsByTagName("body")[0].style.overflowY = "auto";
    }
  }
</script>

<style lang="scss" scoped>
  .lz-loader {
    background-color: rgba(0, 0, 0, 0.3);
    height: 100vh;
    left: 0;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: $z-loader;

    &__spinner {
      height: 70px;
      width: 70px;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
    }
  }
</style>
