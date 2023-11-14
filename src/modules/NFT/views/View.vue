<template>
  <NFT-form :formValues="formValues" :readonlyForm="true">
    <template v-slot:header>
      <h1>{{ formValues.name }}</h1>
    </template>

    <template v-slot:image>
      <NFT-image-card
        :title="formValues.name"
        :subtitle="formValues.description"
        :imageSrc="formValues?.image"
      />
    </template>

    <template v-slot:action-buttons>
      <p @click.prevent="deleteNFT" class="delete-nft">
        {{ $t("NFTs.createNFT.form.buttons.deleteNFT") }}
      </p>

      <lz-button @click.prevent="closeNFT" class="secondary">{{
        $t("NFTs.createNFT.form.buttons.close")
      }}</lz-button>
    </template>
  </NFT-form>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { NFTForm, NFTImageCard } from "../components";
  import LzButton from "@/components/Button.vue";
  import { apiNFT } from "../api";
  import { namespace } from "vuex-class";

  const auth = namespace("auth");

  @Component({ components: { NFTForm, NFTImageCard, LzButton } })
  export default class ViewNFT extends Vue {
    public formValues: Partial<NFTFormValues> = { attributes: [] };

    @auth.State("id")
    public ongId!: string;

    deleteNFT() {
      console.log("nft deleted");
    }

    closeNFT() {
      console.log("nft deleted");
    }

    async mounted() {
      try {
        const { id: nftId } = this.$route.params;

        const nft = await apiNFT.getNFTById(this.ongId, nftId);

        this.formValues = {
          attributes: nft.NFTAttributes,
          description: nft.description,
          externalUrl: nft.external_url,
          image: nft.s3_image_url,
          maxMintingQuantity: nft.max_minting_quantity,
          minDonationAmount: nft.min_donation_amount,
          name: nft.name,
          symbol: nft.symbol,
          walletAddress: nft.contract_address
        };
      } catch (err) {
        this.$notify({
          type: "error",
          text: this.$tc("common.error.generic")
        });
      }
    }
  }
</script>
<style lang="scss">
  .delete-nft {
    flex-basis: auto !important;
    text-decoration: underline;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 1rem;
    font-weight: bold;
  }
</style>
