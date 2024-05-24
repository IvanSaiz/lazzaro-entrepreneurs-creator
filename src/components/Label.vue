<template>
  <div class="label-container">
    <label :for="context.id">
      {{ context.label }} {{ this.required ? "*" : "" }}
    </label>
    <svg
      class="tooltip-icon"
      v-if="tooltip"
      v-tooltip="{
        content: tooltip,
        classes: 'bubble',
        hideOnTargetClick: true,
        autoHide: false
      }"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <path
        d="M50,11A39,39,0,1,0,89,50,39.05,39.05,0,0,0,50,11Zm4,55a4,4,0,0,1-8,0V47a4,4,0,0,1,8,0ZM50,38a4,4,0,1,1,4-4A4,4,0,0,1,50,38Z"
      />
    </svg>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator";
  import { VueEditor } from "vue2-editor";

  @Component({ components: { VueEditor } })
  export default class Label extends Vue {
    @Prop({ required: true, default: {}, type: Object })
    context: Record<string, any>;

    @Prop({ required: false, default: "", type: String })
    tooltip: string;

    required = this.context.rules.some(
      ({ ruleName }) => ruleName === "required"
    );
  }
</script>

<style lang="scss">
  .label-container {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-bottom: 4px;
  }

  label {
    color: $color-black-02;
    display: block;
    height: min-content;

    font-family: Mulish;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .tooltip-icon {
    fill: $color-black-02;
    height: 1.7rem;
    aspect-ratio: 1;
  }

  .tooltip {
    display: block !important;
    z-index: 10000;

    .tooltip-inner {
      max-width: 40rem;
      display: inline-block;
      text-wrap: normal;
      overflow-wrap: break-word;
      background: $color-black-02;
      color: $color-white;
      font-size: 14px;
      border-radius: 16px;
      padding: 10px;

      p {
        margin-bottom: 1rem;
        color: $color-white;
      }
    }

    .tooltip-arrow {
      width: 0;
      height: 0;
      border-style: solid;
      position: absolute;
      margin: 5px;
      border-color: $color-black-02;
      z-index: 1;
    }

    &[x-placement^="top"] {
      margin-bottom: 5px;

      .tooltip-arrow {
        border-width: 5px 5px 0 5px;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
        border-bottom-color: transparent !important;
        bottom: -5px;
        left: calc(50% - 5px);
        margin-top: 0;
        margin-bottom: 0;
      }
    }

    &[x-placement^="bottom"] {
      margin-top: 5px;

      .tooltip-arrow {
        border-width: 0 5px 5px 5px;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
        border-top-color: transparent !important;
        top: -5px;
        left: calc(50% - 5px);
        margin-top: 0;
        margin-bottom: 0;
      }
    }

    &[x-placement^="right"] {
      margin-left: 5px;

      .tooltip-arrow {
        border-width: 5px 5px 5px 0;
        border-left-color: transparent !important;
        border-top-color: transparent !important;
        border-bottom-color: transparent !important;
        left: -5px;
        top: calc(50% - 5px);
        margin-left: 0;
        margin-right: 0;
      }
    }

    &[x-placement^="left"] {
      margin-right: 5px;

      .tooltip-arrow {
        border-width: 5px 0 5px 5px;
        border-top-color: transparent !important;
        border-right-color: transparent !important;
        border-bottom-color: transparent !important;
        right: -5px;
        top: calc(50% - 5px);
        margin-left: 0;
        margin-right: 0;
      }
    }

    &.popover {
      $color: #f9f9f9;

      .popover-inner {
        background: $color;
        color: black;
        padding: 24px;
        border-radius: 5px;
        box-shadow: 0 5px 30px rgba(black, 0.1);
      }

      .popover-arrow {
        border-color: $color;
      }
    }

    &[aria-hidden="true"] {
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.15s, visibility 0.15s;
    }

    &[aria-hidden="false"] {
      visibility: visible;
      opacity: 1;
      transition: opacity 0.15s;
    }
  }
</style>
