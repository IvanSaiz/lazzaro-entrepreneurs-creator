<template lang="pug">
  #home
    p {{ $t('error.error') }}
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component({})
  export default class Home extends Vue {}
</script>
