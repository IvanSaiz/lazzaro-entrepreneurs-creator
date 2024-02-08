<template>
  <fieldset class="layout-select">
    <div class="option" v-for="option in options" :key="option.value">
      <div :class="`layout ${option.value}`">
        <div>
          <h1>{{ $t("common.design.layout.heading") }}</h1>
          <h2>{{ $t("common.design.layout.subtitle") }}</h2>
        </div>
        <img src="@/assets/images/img-placeholder.svg" alt="Placeholder" />
      </div>
      <label :for="option.value" class="label">
        {{ option.label }}
      </label>
      <input
        type="radio"
        :id="option.value"
        :value="option.value"
        :name="name"
        v-model="value"
      />
      <span class="checkmark"></span>
    </div>
  </fieldset>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator";

  @Component
  export default class LayoutSelect extends Vue {
    @Prop({ type: String, default: "left" })
    value!: string;

    @Prop({ type: String })
    name!: string;

    locale = this.$i18n.locale.split("-")[0];

    options = [
      {
        value: "left",
        label: this.$t("common.design.layout.options.left")
      },
      {
        value: "right",
        label: this.$t("common.design.layout.options.right")
      },
      {
        value: "center",
        label: this.$t("common.design.layout.options.center")
      },
      {
        value: "left-fill",
        label: this.$t("common.design.layout.options.left-fill")
      },
      {
        value: "right-fill",
        label: this.$t("common.design.layout.options.right-fill")
      }
    ];
  }
</script>

<style lang="scss">
  .layout-select {
    margin: 1rem;
    margin-bottom: 3rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    justify-content: center;
    gap: 2rem;

    .option {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 0.5rem;
      cursor: pointer;

      .layout {
        width: 100%;
        height: 10rem;
        display: flex;
        background-color: $color-white;
        border-radius: 10px;
        padding: 2rem;
        gap: 2rem;
        align-items: center;
        justify-content: space-between;
        pointer-events: none;
        border: 2px solid transparent;

        h1 {
          font-size: 12px;
          font-weight: 400;
          line-height: 15px;
          margin: 0;
        }
        h2 {
          font-size: 10px;
          font-weight: 400;
          line-height: 12.55px;
          margin: 0;
        }

        &.right,
        &.right-fill {
          flex-direction: row-reverse;
        }

        &.center {
          justify-content: center;
          align-items: center;
          position: relative;
          background-color: $color-black-06;

          img {
            position: absolute;
            z-index: 1;
          }
          div {
            z-index: 2;
          }
        }

        &.left-fill,
        &.right-fill {
          position: relative;
          background-color: $color-black-06;

          img {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 1;
          }
          div {
            z-index: 2;
          }
        }
      }

      label {
        text-align: center;
        margin-bottom: 0.5rem;
      }

      input[type="radio"] {
        position: absolute;
        appearance: none;
        margin: 0;
        width: 100%;
        height: 100%;
      }

      .checkmark {
        margin-inline: auto;
        width: 1.2rem;
        height: 1.2rem;
        background-color: $color-black-06;
        border-radius: 100%;
        border: 1px solid $color-black-05;
      }

      &:has(input[type="radio"]:checked) {
        .checkmark {
          background-color: $color-pink;
          border-color: $color-pink;
        }
        .layout {
          border-color: $color-pink;
        }
      }
    }
  }
</style>
