<template lang="pug">
  .consultant-read
    header
      h1 {{ $t('consultant.read.title') }}
      p {{ $t('consultant.read.availability') }}
      p {{ $t('consultant.read.premium') }}

    .consultant-read__iframe
      iframe(
        src="https://book.lazzaro.io/portal-embed#/customer/consultoriaemprende"
        height="100%"
      )
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { namespace } from "vuex-class";

  const auth = namespace("auth");

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
