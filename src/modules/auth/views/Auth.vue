<template lang="pug">
  section
    .grid-container
      transition(name="fade" mode="out-in")
        router-view
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component({})
  export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
  section {
    align-items: center;
    display: flex;
    background-color: $color-black-07;
    justify-content: center;
    height: 100%;
    min-height: 100vh;
    min-width: 100%;
    position: relative;
  }
</style>
