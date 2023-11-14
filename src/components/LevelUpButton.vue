<template lang="pug">
  .lz-levelup(@click="redirectPlans")
    lz-button.lz-levelup__button(type="gradient" :smaller="true")
      span.lz-levelup__text {{ $t('common.actions.changePlan') }}
      span.lz-levelup__icon
        crown-icon(size=20)
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzButton from "./Button.vue";

  @Component({
    components: { LzButton }
  })
  export default class LevelUpButton extends Vue {
    redirectPlans(): void {
      if (this.$route.name !== "organizationRead") {
        this.$router.push({
          name: "organizationRead",
          params: { step: "subscription" }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .lz-levelup {
    transform: translateY(-60px);
    text-align: right;
    padding: 0 40px;
    margin-bottom: -70px;

    &__button {
      padding: 0 10px;
      font-size: 16px;
      width: auto;
      height: 40px;
      z-index: 99999;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    &__text {
      color: $color-white;
      font-size: 13px;
    }

    &__icon .icon-tabler-crown {
      stroke: $color-white;
      margin-left: 9px;
      margin-right: 0;
      top: 3px;
    }
  }
</style>
