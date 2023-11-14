<template lang="pug">
  #step-welcome
    .step-welcome__img
      img(src="./assets/onboarding_paso1.png" height=444)
    .step-welcome__footer
      .step-welcome__text--lg {{ $t('auth.onboarding.stepWelcome.title') }}
      .step-welcome__text--md {{ $t('auth.onboarding.stepWelcome.subtitle') }}
    .step-welcome__actions
      slot(name="actions")
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component
  export default class StepWelcome extends Vue {}
</script>

<style lang="scss" scoped>
  #step-welcome {
    .step-welcome {
      &__img {
        text-align: center;
        margin-bottom: 25px;
      }

      &__text {
        &--lg {
          font-family: "Jost";
        }

        &--lg {
          color: $color-black-02;
          font-weight: 600;
          font-size: 35px;
          line-height: normal;
          text-align: center;
          font-style: normal;
          margin-bottom: 25px;
        }

        &--md {
          color: $color-black-03;
          font-family: Muli;
          font-weight: 700;
          line-height: 27px;
          font-size: 20px;
          line-height: normal;
          margin-bottom: 25px;
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
