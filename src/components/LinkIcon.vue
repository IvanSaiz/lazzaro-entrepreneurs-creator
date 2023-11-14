<template lang="pug">
  p.lz-link-icon
      component(:is="iconName" size="14")
      a(:href="link" target="_blank") {{ label }}
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator";

  @Component({})
  export default class LinkIcon extends Vue {
    @Prop({ required: true })
    iconName!: string;

    @Prop({ required: true })
    label!: string;

    @Prop({ required: true })
    link!: string;
  }
</script>

<style lang="scss">
  .lz-link-icon {
    align-items: center;
    display: flex;
    font-size: 12px;
    margin: 8px 0;

    a {
      margin-left: 4px;
    }
  }
</style>
