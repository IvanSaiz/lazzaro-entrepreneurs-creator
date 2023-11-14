<template>
  <div class="NFTs-read__giftedTokens">
    <lz-table title="" :fields="FIELDS" :items="mintedTokens">
      <template #name="{row:{name}}">{{ name }}</template>
      <template #tokenId="{row:{tokenId}}">
        {{ tokenId }}
      </template>
      <template #txHash="{row:{txHash}}">
        <a
          :title="txHash"
          class="tx-link"
          :href="`${polygonscanLink}/${txHash}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ txHash?.slice(0, 5) }}
        </a>
      </template>

      <template #donationId="{row:{donationId}}">{{ donationId }}</template>

      <template #donationAmount="{row:{donationAmount}}"
        >€{{ donationAmount }}</template
      >
    </lz-table>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzTable from "@/components/Table.vue";
  import { namespace } from "vuex-class";
  import { apiNFT } from "../api";
  const auth = namespace("auth");
  @Component({
    components: {
      LzTable
    }
  })
  export default class NFTsGiftedTokens extends Vue {
    @auth.State("id")
    public ongId!: string;
    mintedTokens: {
      name: string;
      tokenId: string | null;
      txHash: string;
      donationId: string;
      donationAmount: number;
    }[] = [];

    FIELDS = [
      { id: "name", label: this.$t("NFTs.read.giftedTokens.table.name") },
      {
        id: "tokenId",
        label: this.$t("NFTs.read.giftedTokens.table.token_id")
      },
      {
        id: "txHash",
        label: this.$t("NFTs.read.giftedTokens.table.tx_hash")
      },
      {
        id: "donationAmount",
        label: this.$t("NFTs.read.giftedTokens.table.donation_amount")
      },
      {
        id: "donationId",
        label: this.$t("NFTs.read.giftedTokens.table.donation_id")
      }
    ];

    get polygonscanLink() {
      return process.env.VUE_APP_POLYGONSCAN_LINK;
    }

    async mounted() {
      const { data: ongMinedTokens } = await apiNFT.getMintedTokens(this.ongId);

      this.mintedTokens = ongMinedTokens.map(token => ({
        name: token.NFT.name,
        donationId:
          token.donation_id || token.payment_id || token.event_payment_id || "",
        txHash: token.tx,
        tokenId: token.token_id,
        donationAmount: token.Donation.amount
      }));
    }
  }
</script>

<style lang="scss" scoped>
  .NFTs-read__giftedTokens {
    .header {
      h6 {
        color: #a0a7b9;
        line-height: 1.35;
        max-width: 100ch;
      }
    }

    table {
      .action {
        font-weight: bold;
        font-size: 2rem;
        color: black;
        cursor: pointer;
      }

      .tx-link {
        color: black;
        cursor: pointer;
      }
    }
  }
</style>
