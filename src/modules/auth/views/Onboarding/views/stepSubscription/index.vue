<template lang="pug">
  #step-subscription
    lz-subscription
    .step-subscription__actions
      slot(name="actions")
</template>

<script lang="ts">
  import LzSubscription from "@/components/Subscription.vue";
  import { Component, Vue } from "vue-property-decorator";

  @Component({ components: { LzSubscription } })
  export default class StepSubscription extends Vue {}
</script>

<style lang="scss" scoped>
  #step-subscription {
    .step-subscription {
      &__img {
        text-align: center;
        margin-bottom: 60px;
      }

      &__text {
        &--sm,
        &--lg {
          font-family: "Jost";
          text-transform: uppercase;
        }

        &--sm {
          color: $color-black-01;
          font-weight: bold;
          font-size: 14px;
          line-height: 17px;
        }

        &--lg {
          color: $color-black-02;
          font-weight: 500;
          font-size: 30px;
          line-height: 42px;
          //margin-top: 15px;
        }

        &--md {
          color: $color-black-03;
          font-family: Muli;
          font-weight: 300;
          line-height: 27px;
          font-size: 18px;
          line-height: 27px;
          //margin-top: 10px;
        }
      }

      &__actions {
        position: absolute;
        bottom: -40px;
        width: calc(100% - 80px);
      }
    }
  }
</style>
