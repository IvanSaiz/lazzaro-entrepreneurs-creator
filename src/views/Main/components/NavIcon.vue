<template lang="pug">
  component(:is="tag" @click="onClick" :class="cssClasses").lz-nav-icon
    .lz-nav-icon__icon
      slot(name="icon")
    .lz-nav-icon__label
      slot(name="label")

</template>

<script lang="ts">
  import { Component, Prop, Vue, Emit } from "vue-property-decorator";

  @Component
  export default class NavIcon extends Vue {
    @Prop({ default: "div" })
    tag!: string;

    @Prop({ default: false })
    active!: boolean;

    @Emit("click")
    onClick(): void {
      return;
    }

    get cssClasses(): any {
      return {
        "lz-nav-icon--active": this.active
      };
    }
  }
</script>

<style lang="scss" scoped>
  .lz-nav-icon {
    text-align: center;

    &__icon {
      svg {
        height: 40px;
        stroke: $color-black-03;
        stroke-width: 1.25px;
        width: 40px;
        transition: stroke $transition-default;
      }
    }

    &__label {
      margin-top: 3px;
      text-transform: capitalize;
    }

    &:hover {
      cursor: pointer;
      .lz-nav-icon {
        &__icon {
          svg {
            stroke: #000;
          }
        }
        &__label {
          color: #000000;
          font-weight: bold;
        }
      }
    }

    &--active {
      position: relative;

      &:after {
        content: "";
        background-color: #0093a7;
        border-radius: $border-radius-default;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        width: 5px;
      }

      .lz-nav-icon {
        &__icon svg {
          stroke: $color-black-01;
          stroke-width: 1.3;
        }

        &__label {
          color: #000000;
          font-weight: bold;
        }
      }
    }

    @media (max-height: 800px) {
      &,
      & ~ &,
      &:first-child {
        margin: 5px auto;
      }

      &__icon {
        svg {
          height: 30px;
          width: 30px;
        }
      }

      &__label {
        font-size: 10px;
        display: none;
      }
    }
  }
</style>
