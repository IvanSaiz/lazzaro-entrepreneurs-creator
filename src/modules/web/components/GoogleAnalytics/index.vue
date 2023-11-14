<template>
  <section>
    <h2 class="h2--dash">
      {{ $t("web.public.googleAnalytics.title") }}
    </h2>

    <formulate-input name="google_analytics_id" />
  </section>
</template>
<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component({
    components: {}
  })
  export default class ChooseTemplate extends Vue {}
</script>

<style lang="scss"></style>
