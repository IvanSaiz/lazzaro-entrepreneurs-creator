<template>
  <div class="input__label">
    <h3>{{ title }}</h3>
    <p v-if="subtitle">{{ subtitle }}</p>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";

  @Component({})
  export default class InputLabel extends Vue {
    @Prop({ required: true })
    title!: string;

    @Prop({ required: false })
    subtitle?: string;
  }
</script>

<style lang="scss">
  $gray: #a0a7b9;

  .input__label {
    display: flex;
    margin-top: 0.8rem;
    gap: 0.6rem;
    flex-direction: column;

    h3 {
      margin: 0;
    }
    p {
      line-height: 1.4;
      color: $gray;
      font-size: 0.9rem;
    }
    span {
      color: #68798a;
    }
  }
</style>
