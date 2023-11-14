<template>
  <section>
    <div class="grid-container NFT-container">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </section>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component({})
  export default class NFT extends Vue {}
</script>

<style lang="scss" scoped>
  section {
    min-height: 100%;
    min-width: 100%;

    .NFT-container {
    }
  }
</style>
