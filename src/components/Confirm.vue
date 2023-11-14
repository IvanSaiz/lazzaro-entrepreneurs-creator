<template lang="pug">
  .lz-confirm
    lz-modal(@close="$emit('close')")
      .lz-confirm__description {{ descriptionLabel ? descriptionLabel : this.$t('common.actions.askConfirm') }}
      .lz-confirm__buttons
        lz-button(type="secondary" @click="$emit('close')") {{ cancelLabel ? cancelLabel : this.$t('common.actions.cancel') }}
        lz-button(type="primary" @click="$emit('confirm')") {{ confirmLabel ? confirmLabel : this.$t('common.actions.confirm') }}
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import LzModal from "./Modal.vue";
  import LzButton from "./Button.vue";

  @Component({ components: { LzModal, LzButton } })
  export default class Confirm extends Vue {
    @Prop()
    descriptionLabel?: string;

    @Prop()
    cancelLabel?: string;

    @Prop()
    confirmLabel?: string;
  }
</script>

<style lang="scss">
  .lz-confirm {
    .lz-modal > .lz-box {
      min-width: 500px;
    }

    &__description {
      font-size: 15px;
      margin: 20px 0;
    }

    &__buttons {
      display: flex;
    }
  }
</style>
