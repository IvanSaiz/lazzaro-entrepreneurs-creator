<template>
  <div class="layout-select">
    <div class="option" v-for="option in options" :key="option.value">
      <div :class="`layout ${optionClass} ${option.value}`">
        <slot name="tooltip" />
      </div>
      <label :for="option.value" class="label">
        {{ option.label }}
      </label>
      <input
        type="radio"
        :id="option.value"
        :value="option.value"
        :name="name"
        :checked="option.value === modelValue"
        @input="handleSelect"
      />
      <span class="checkmark"></span>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop, VModel } from "vue-property-decorator";

  @Component
  export default class LayoutSelect extends Vue {
    @Prop({ type: String })
    name!: string;

    @Prop({ type: Array })
    options!: { value: string; label: string }[];

    @Prop({ type: String })
    optionClass!: string;

    @VModel({ type: String })
    modelValue!: string;

    locale = this.$i18n.locale.split("-")[0];

    handleSelect(e) {
      this.$emit("input", e.target.value);
    }
  }
</script>

<style lang="scss">
  .layout-select {
    padding: 0.25rem;
    margin-bottom: 3rem;
    display: grid;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    .option {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 0.5rem;

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
        cursor: pointer;
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
          outline: 3px solid $color-pink;
        }
      }
    }
  }
</style>
