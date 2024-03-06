<template lang="pug">
.consultant-read
  header
    h1 {{ $t('consultant.read.title') }}
    p {{ $t('consultant.read.subtitle') }}
  .consultant-read__iframe
    iframe(
      width='100%' 
      height='750px' 
      src='https://book.lazzaro.io/portal-embed#/consultoriaemprende' 
      frameborder='0' 
      allowfullscreen=''
    )
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component
  export default class Read extends Vue {}
</script>

<style lang="scss">
  .consultant-read {
    &__iframe {
      margin-top: 20px;
      height: 800px;

      & iframe {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    }
  }
</style>
