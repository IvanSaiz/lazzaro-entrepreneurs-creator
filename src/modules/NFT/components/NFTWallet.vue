<template>
  <div class="NFTs-read__wallet">
    <p class="NFTs-read__wallet__paragraph">
      {{ $t("NFTs.read.wallet.text") }}
    </p>

    <div class="connect-wallet-btn">
      <lz-button v-if="!walletAddress" @click="connectToWallet">{{
        $t("NFTs.read.wallet.connectWallet")
      }}</lz-button>

      <lz-button v-else disabled>{{
        $t("NFTs.read.wallet.walletConnected")
      }}</lz-button>

      <h3 style="font-weight: bold;">
        {{ walletAddress }}
      </h3>

      <a
        class="subtext"
        href="https://lazzaro.io/en/como-crear-una-wallet-en-metamask-guia-paso-a-paso/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ $t("NFTs.read.wallet.metaMaskUrl") }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import { isMetaMaskConnected } from "@/utils";

  interface CustomWindow extends Window {
    chrome: any;
  }

  @Component({
    components: {
      LzButton
    }
  })
  export default class NFTWallet extends Vue {
    walletAddress = "";

    mounted() {
      this.checkConnection("eth_accounts");
    }

    async checkConnection(method: EthereumMethod) {
      // check if the current browser is chrome
      if (!(window as CustomWindow).chrome) {
        this.$notify({
          title: this.$tc("NFTs.read.wallet.installChrome"),
          text: this.$tc("NFTs.read.wallet.installChromeText"),
          type: "error"
        });
        return;
      }

      if (!isMetaMaskConnected(window)) {
        this.$notify({
          title: this.$tc("NFTs.read.wallet.installMetamask"),
          text: this.$tc("NFTs.read.wallet.installMetamaskText"),
          type: "error"
        });
        return;
      }

      const accounts = await window.ethereum.request({
        method
      });

      this.walletAddress = accounts[0];
    }

    async connectToWallet() {
      await this.checkConnection("eth_requestAccounts");
    }
  }
</script>

<style lang="scss">
  .NFTs-read__wallet {
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    &__paragraph {
      margin-top: 1rem;
      color: #2c3e50;
      font-size: 1.4rem;
      font-weight: 550;
    }

    .connect-wallet-btn {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
</style>
