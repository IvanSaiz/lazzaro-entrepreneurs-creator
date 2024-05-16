<template lang="pug">
.lz-stepper
  //- step
  .lz-stepper__step(
    v-for='(step, stepIdx) in steps'
    @click='onStepClick()'
    :class='stepClasses(step, stepIdx)'
    :style='stepStyle()'
  )
    .lz-stepper__label
      slot(v-bind='{ step }') {{ step }}
    .lz-stepper__dot
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from "vue-property-decorator";

  @Component({})
  export default class Stepper extends Vue {
    @Prop({ required: true })
    readonly steps!: Array<string>;

    @Prop({ required: true })
    readonly active!: string;

    @Prop({ default: true })
    readonly clickable!: boolean;

    @Prop({ default: false })
    readonly pass!: boolean;

    @Emit("click")
    onStepClick(): void {
      return;
    }

    get activeStepIdx(): number {
      return this.steps.findIndex(step => step === this.active);
    }

    stepClasses(step: string, stepIdx: number): string {
      const pre = "lz-stepper__step--";
      const classes: Array<string> = [];

      if (this.active === step) {
        classes.push("active");
      }
      if (this.clickable) {
        classes.push("clickable");
      }
      if (this.pass && this.activeStepIdx > stepIdx) {
        classes.push("pass");
      }

      return classes.map((cl: string) => pre + cl).join(" ");
    }

    stepStyle(): object {
      return {
        width: `${100 / this.steps.length}%`
      };
    }
  }
</script>

<style lang="scss">
  .lz-stepper {
    overflow: hidden;
    position: relative;
  }

  .lz-stepper__step {
    display: inline-block;
    margin: 0 auto;
    position: relative;
  }

  .lz-stepper__step:not(:last-child):before {
    content: "";
    background-color: $color-black-04;
    bottom: 13px;
    height: 1px;
    left: calc(50% + 13px);
    position: absolute;
    width: calc(100% - 26px);
  }

  .lz-stepper__step--clickable:hover {
    cursor: pointer;
  }

  .lz-stepper__step--clickable:hover .lz-stepper__dot {
    background-color: $color-orange-02;
    border-color: $color-orange-02;
  }

  .lz-stepper__step--pass .lz-stepper__dot {
    background-color: $color-orange-01;
    border-color: $color-orange-01;
  }

  .lz-stepper__label {
    color: $color-black-04;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.25;
    text-align: center;
    transition: font-weight 0.25s;
  }

  .lz-stepper__label:first-letter {
    text-transform: uppercase;
  }

  .lz-stepper__dot {
    background: transparent;
    border: 1px solid $color-black-04;
    border-radius: 100%;
    height: 26px;
    margin: 0 auto;
    margin-top: 6px;
    transition: background-color 0.25s, border-color 0.25s;
    width: 26px;
  }

  .lz-stepper__step--active .lz-stepper__label {
    color: $color-black-01;
  }

  .lz-stepper__step--active .lz-stepper__dot,
  .lz-stepper__step--active:hover .lz-stepper__dot {
    background-color: $color-orange-01;
    border-color: $color-orange-01;
  }

  .lz-box {
    background-color: #fff;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 0 10px 0 $color-shadow-01;
    position: relative;
    transition: height 0.25s, width 0.25s;
  }
</style>
