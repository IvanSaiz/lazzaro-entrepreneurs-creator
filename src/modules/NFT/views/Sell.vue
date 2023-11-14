<template>
  <div>
    <header>
      <h1>{{ $t("NFTs.sell.header.title") }}</h1>
      <p>{{ $t("NFTs.sell.header.subtitle") }}</p>
    </header>

    <div class="sell">
      <NFT-image-card
        title="Titulo NFT"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisi ac phasellus placerat"
        :imageSrc="nftImage"
        :imageHeader="false"
      />

      <formulate-form v-model="formValues">
        <input-label :title="$t('NFTs.sell.form.setPrice')" />
        <div class="set-price-input">
          <formulate-input
            type="text"
            validation="required|number"
            style="width: 100%;"
            class="input"
            name="price"
          />
          <span class="eth-text">ETH</span>
        </div>

        <input-label
          :title="$t('NFTs.sell.form.setDuration')"
          style="margin-top:2rem;"
        />
        <formulate-input
          type="select"
          style="width: 100%; "
          class="input"
          name="duration"
          :options="durations"
        />

        <div class="summary">
          <h3>{{ $t("NFTs.sell.form.summary") }}</h3>

          <div class="summary-row">
            <span>{{ $t("NFTs.sell.form.adPrice") }}</span>
            <span>---ETH</span>
          </div>
          <div class="summary-row">
            <span>{{ $t("NFTs.sell.form.serviceFee") }}</span>
            <span>2.5%</span>
          </div>
          <div class="summary-row">
            <span>{{ $t("NFTs.sell.form.creatorCommission") }}</span>
            <span>10%</span>
          </div>

          <hr />

          <div class="summary-row">
            <span>{{ $t("NFTs.sell.form.potentialEarnings") }}</span>
            <span>---ETH</span>
          </div>
        </div>
      </formulate-form>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { NFTForm, NFTImageCard, InputLabel } from "../components";

  @Component({ components: { NFTForm, NFTImageCard, InputLabel } })
  export default class Sell extends Vue {
    formValues = { price: "--", duration: "1 month" };
    putOnSale() {
      console.log("sold");
    }

    get nftImage() {
      return "https://uploads-ssl.webflow.com/61c0120d981c8f9d9322c0e0/61ca497efc91881256158064_blog%20article.png";
    }

    durations = [
      {
        label: this.$t("NFTs.sell.form.oneMonth"),
        value: "1 month"
      }
    ];
  }
</script>

<style lang="scss">
  .sell {
    display: flex;
    gap: 3rem;
    padding-block: 3rem;
    padding-right: 14rem;

    .set-price-input {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      position: relative;

      .eth-text {
        width: 20%;
        position: absolute;
        background-color: #e7ecf7;
        height: 55px;
        margin-left: auto;
        margin-top: 0.6rem;
        border-top-right-radius: 15px;
        display: flex;
        font-weight: bold;
        justify-content: center;
        color: black;
        align-items: center;
        border-bottom-right-radius: 15px;
      }
    }

    .summary {
      margin-top: 3rem;
      color: #2c3e50;

      h3 {
        font-weight: lighter;
      }

      hr {
        border-top: 1px solid #f0f4f7;
        margin-left: 3rem;
      }

      .summary-row {
        margin-block: 1.3rem;
        display: flex;
        padding-left: 5rem;
        width: 100%;
        justify-content: space-between;
        span {
          font-weight: bold;
          color: black;
          font-size: 1.3rem;
        }
      }
    }
  }
</style>
