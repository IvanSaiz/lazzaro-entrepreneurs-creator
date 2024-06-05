<template lang="pug">
#onboarding
  .onboarding__steps
    lz-stepper(
      :steps="steps"
      :active="active"
      @click="setActiveStep"
      :pass="true"
    )
      template(#default="{ step }") {{ $t('auth.onboarding.steps.' + step) }}
  .onboarding__box
    lz-box
      transition(name="fade" mode="out-in")
        keep-alive
          component(:is="active")
            template(#actions="actionsProps")
              .onboarding__actions
                lz-button(type="tertiary" @click="onBackClick()" :disabled="isFirstStep") {{ $t('common.actions.back') }}
                template(v-if="!isLastStep")
                  lz-button(type="tertiary" @click="onNextClick(actionsProps.click)" :disabled="isLastStep || actionsProps.disabled") {{ $t('common.actions.next') }}
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzStepper from "@/components/Stepper.vue";
  import LzBox from "@/components/Box.vue";
  import LzButton from "@/components/Button.vue";
  import LzStepWelcome from "./views/stepWelcome/index.vue";
  import LzStepTools from "./views/stepTools/index.vue";
  import LzStepStyle from "./views/stepStyle/index.vue";
  import LzStepSubscription from "./views/stepSubscription/index.vue";

  type step = "stepWelcome" | "stepTools" | "stepStyle" | "stepSubscription";

  @Component({
    components: {
      LzStepper,
      LzBox,
      LzButton,
      stepWelcome: LzStepWelcome,
      stepTools: LzStepTools,
      stepStyle: LzStepStyle,
      stepSubscription: LzStepSubscription
    }
  })
  export default class Onboarding extends Vue {
    steps: Array<step> = [
      "stepWelcome",
      "stepTools",
      "stepStyle",
      "stepSubscription"
    ];
    active: step = this.steps[0];

    get currentStepIdx(): number {
      return this.steps.findIndex(step => step === this.active);
    }

    get isFirstStep(): boolean {
      return this.currentStepIdx === 0;
    }

    get isLastStep(): boolean {
      return this.currentStepIdx === this.steps.length - 1;
    }

    onBackClick(): void {
      if (!this.isFirstStep) {
        this.active = this.steps[this.currentStepIdx - 1];
      }
    }

    onNextClick(actionClick: Function): void {
      if (!this.isLastStep) {
        this.active = this.steps[this.currentStepIdx + 1];
        actionClick?.();
      } else {
        this.$router.push({ name: "Signin" });
      }
    }
  }
</script>

<style lang="scss" scoped>
  #onboarding {
    .onboarding {
      &__steps {
        margin: 0 auto;
        max-width: 650px;
      }

      &__box,
      &__actions {
        max-width: 1045px;
      }

      &__box {
        margin: 55px auto;
        transition: height 2s;
      }

      &__actions {
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
      }
    }
  }
</style>
