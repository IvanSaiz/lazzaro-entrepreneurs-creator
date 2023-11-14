<template>
  <div class="NFTs-read" v-if="loaded">
    <header>
      <h1>NFTs</h1>
    </header>

    <div class="NFTs-read__stepper">
      <lz-stepper
        :steps="['wallet', 'NFTs', 'giftedTokens']"
        :active="active"
        @click="handleStep"
      >
        <template #default="{step}">
          {{ $t(`NFTs.read.steps.${step}`) }}
        </template>
      </lz-stepper>
    </div>

    <transition name="fade" mode="out-in">
      <NFT-wallet v-if="active === 'wallet'" />

      <NFTs-table v-if="active === 'NFTs'" />

      <gifted-tokens v-if="active === 'giftedTokens'" />
    </transition>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import LzStepper from "@/components/Stepper.vue";
  import { NFTWallet, NFTsTable, GiftedTokens } from "../components";
  type Step = "wallet" | "NFTs" | "giftedTokens";

  @Component({
    components: {
      LzButton,
      LzStepper,
      NFTWallet,
      NFTsTable,
      GiftedTokens
    }
  })
  export default class Read extends Vue {
    loaded = true;

    @Prop({ default: "wallet" })
    step!: Step;

    active: Step = this.step;

    handleStep(step: Step) {
      this.active = step;
    }
  }
</script>

<style lang="scss">
  .NFTs-read {
    &__stepper {
      margin: 6rem 0;
    }
  }
</style>
