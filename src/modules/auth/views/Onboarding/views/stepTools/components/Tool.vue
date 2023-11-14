<template lang="pug">
  .lz-tool(:class='toolClasses')
    .lz-tool__icon
      slot(name='icon')
    .lz-tool__label
      slot(name='label')
    .lz-tool__check
      transition(name='fade')
      


</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";

  @Component({})
  export default class Tool extends Vue {
    @Prop({ default: false })
    protected readonly checked!: boolean;

    protected get toolClasses(): object {
      return {
        "lz-tool--checked": this.checked
      };
    }
  }
</script>

<style lang="scss" scoped>
  .lz-tool {
    display: flex;
    width: 125px;
    height: 167px;
    padding: 15px 20px;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    border-radius: 15px;
    background: #fff;
    box-shadow: 0px 4px 4px 0px rgba(185, 185, 185, 0.25);

    &__label {
      color: $color-black-03;
      font-family: Muli;
      font-weight: 600;
      font-size: 18px;
      line-height: normal;
      text-align: center;
    }

    &__check {
      border-radius: 100%;
      height: 25px;
      width: 25px;
      background-color: $color-black-06;
      transition: background-color $transition-default;
    }

    &__icon {
      svg {
        width: 61px;
        height: 61px;
        stroke: $color-black-03;
        color: $color-black-03;
      }
    }

    &--checked {
      .lz-tool__check {
        background-color: $color-green-01;
      }
    }

    &:hover {
      cursor: pointer;

      .lz-tool__check {
        background-color: $color-green-01;
      }
    }
  }
</style>
