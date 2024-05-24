<template lang="pug">
button(@click='onClick' class='lz-button' :class='buttonClass' v-bind='$attrs')
  slot
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from "vue-property-decorator";

  type ButtonType = "primary" | "secondary" | "tertiary" | "gradient";

  @Component({})
  export default class Button extends Vue {
    /**
     * Defines the type of the button which styles the button.
     * See {@link @/typing/ButtonType.ts} for further info.
     */
    @Prop({ default: "primary" })
    protected readonly type!: ButtonType;

    /**
     * If true, the button is full width styled..
     */
    @Prop({ default: false })
    protected readonly fullWidth!: boolean;

    @Prop({ default: false })
    protected readonly smaller!: boolean;
    /**
     * Emits the button click event.
     * @returns Void.
     */
    @Emit("click")
    onClick(): void {
      return;
    }

    /**
     * Returns the class or classes used in the button.
     * @returns String defining the classes.
     */
    get buttonClass(): string {
      const pre = "lz-button--";
      const classes: Array<string> = [];

      classes.push(this.type);

      if (this.fullWidth) {
        classes.push("full-width");
      }

      if (this.smaller) {
        classes.push("smaller");
      }

      return classes.map((cl: string) => pre + cl).join(" ");
    }
  }
</script>

<style lang="scss">
  button.lz-button {
    font-family: Muli;
    font-size: 18px;
    border-radius: $border-radius-default;
    border: 1px solid;
    box-sizing: border-box;
    margin: 15px 0;
    max-width: 215px;
    overflow: hidden;
    padding: 14px;
    text-overflow: ellipsis;
    text-align: center;
    transition: background-color $transition-default,
      background $transition-default, border-color $transition-default,
      color $transition-default;
    width: 100%;

    & + & {
      margin-left: 20px;
    }

    &:hover {
      cursor: pointer;
    }

    &:disabled {
      cursor: not-allowed;
    }

    // types
    &--primary {
      background-color: $color-green-01;
      border-color: $color-green-01;
      color: $color-white;
      font-weight: 400;
      line-height: 23px;

      &:hover {
        background-color: $color-green-02;
      }

      &:disabled {
        background-color: $color-black-04;
        border-color: $color-black-04;
      }
    }

    &--gradient {
      background: $color-pink;
      background: linear-gradient(90deg, $color-pink 50%, $color-orange 100%);
      background-color: $color-pink;
      border-color: $color-pink;
      color: $color-white;
      font-weight: 400;
      line-height: 23px;

      &:hover {
        background: $color-pink-lighter;
        background: linear-gradient(
          90deg,
          $color-pink-lighter 50%,
          $color-orange-lighter 100%
        );
      }

      &:disabled {
        background-color: $color-black-04;
        border-color: $color-black-04;
      }
    }

    &--secondary {
      background-color: $color-white;
      border-color: $color-black-05;
      color: $color-green-01;
      line-height: 1.28;
      font-size: 18px;
      font-weight: 600;

      &:hover {
        border-color: $color-green-02;
      }

      &:disabled {
        background-color: $color-black-04;
        border-color: $color-black-04;
      }
    }

    &--tertiary {
      background-color: transparent;
      border: none;
      color: $color-black-02;
      font-size: 14px;
      margin: 0;
      padding: 0;
      width: auto;

      &:hover {
        color: $color-black-02;
      }

      &:disabled {
        color: $color-black-05;
      }
    }

    // mods
    &--full-width {
      max-width: unset;
      width: 100%;
    }

    &--smaller {
      padding: 0 40px;
      font-size: 16px;
      width: auto;
      height: 50px;
    }

    &--form-inline {
      width: auto;
      margin: 0;
    }

    // icons
    svg {
      position: relative;
      margin: 0 10px;
      top: 5px;
    }
  }
</style>
