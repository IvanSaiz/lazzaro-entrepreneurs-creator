<template lang="pug">
  section
    lz-level-up-button
    .grid-container
      transition(name="fade" mode="out-in")
        router-view
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component({})
  export default class Accounts extends Vue {}
</script>

<style lang="scss" scoped>
  section {
    min-height: 100%;
    min-width: 100%;
  }
</style>
