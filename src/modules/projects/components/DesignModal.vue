<template>
  <LzModal v-if="visible" @close="handleCancel">
    Hello World
  </LzModal>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzModal from "@/components/Modal.vue";
  import { namespace } from "vuex-class";

  const auth = namespace("auth");

  @Component({ components: { LzModal } })
  export default class DesignModal extends Vue {
    @auth.State("id")
    public ongId!: string;

    visible = false;

    handleOk() {
      this.visible = false;
    }

    handleCancel() {
      this.visible = false;
    }
  }
</script>
