<template>
  <section class="NFTs_Table">
    <lz-table title="" :fields="FIELDS" :items="nfts">
      <template #name="{row:{name}}">{{ name }}</template>
      <template #minted_count="{row:{mintedCount}}">{{ mintedCount }}</template>

      <template #min_donation_amount="{row:{min_donation_amount}}">
        <span class="min_donation_amount">
          {{ min_donation_amount }}
        </span>
      </template>
      <template #max_minting_quantity="{row:{max_minting_quantity}}">{{
        max_minting_quantity || $t("NFTs.read.NFTsTable.unlimited")
      }}</template>
    </lz-table>

    <div class="create-nft-button" v-if="!alreadyHaveNFT && !isLoading">
      <lz-button @click="createYourNFT">
        {{ $t("NFTs.read.NFTsTable.createNFT") }}
      </lz-button>
    </div>
  </section>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import LzTable from "@/components/Table.vue";
  import Popup from "./Popup.vue";
  import { apiNFT } from "../api";
  import { namespace } from "vuex-class";
  const auth = namespace("auth");

  @Component({
    components: {
      LzButton,
      LzTable,
      Popup
    }
  })
  export default class NFTsTable extends Vue {
    isLoading = true;
    FIELDS = [
      { id: "name", label: this.$t("NFTs.read.NFTsTable.name") },
      {
        id: "minted_count",
        label: this.$t("NFTs.read.NFTsTable.minted_count")
      },
      {
        id: "min_donation_amount",
        label: this.$t("NFTs.read.NFTsTable.min_donation_amount")
      },
      {
        id: "max_minting_quantity",
        label: this.$t("NFTs.read.NFTsTable.max_minting_quantity")
      }
    ];

    @auth.State("id")
    public ongId!: string;

    nfts: NFT[] = [];

    get alreadyHaveNFT() {
      return this.nfts.length > 0;
    }

    createYourNFT() {
      this.$router.push({ name: "createNFT" });
    }

    async mounted() {
      try {
        this.isLoading = true;
        const { data: nfts } = await apiNFT.getNFTsByOng(this.ongId);

        this.nfts = nfts;
      } catch (err) {
        this.$notify({
          type: "error",
          text: this.$tc("common.error.generic")
        });
      } finally {
        this.isLoading = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .NFTs_Table {
    .create-nft-button {
      margin-top: 3rem;
      display: flex;
      justify-content: flex-end;
    }

    .min_donation_amount {
      color: #8d00d8;
    }

    .action {
      font-weight: bold;
      font-size: 2rem;
      color: black;
      cursor: pointer;
    }
  }
</style>
