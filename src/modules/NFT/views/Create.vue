<template>
  <NFT-form :on-submit="handleOnSubmit" :formValues="{ attributes: [] }">
    <template v-slot:header>
      <header>
        <h1>
          {{ $t(`NFTs.createNFT.header.title`) }}
        </h1>
        <p class="subtitle">
          {{ $t(`NFTs.createNFT.header.subtitle`) }}
        </p>
      </header>
    </template>

    <template v-slot:image>
      <div class="image-upload">
        <formulate-input
          type="image"
          name="image"
          :label="$t('NFTs.createNFT.form.image.header')"
          :label-class="['required']"
          label-position="before"
          validation="required|mime:image/jpeg,image/png,image/webp"
        />

        <div class="input__label">
          <span>{{ $t("NFTs.createNFT.form.image.subtitle.size") }}</span>
          <span>{{
            $t("NFTs.createNFT.form.image.subtitle.file_accepted")
          }}</span>
        </div>
      </div>
    </template>

    <template v-slot:action-buttons>
      <lz-button>{{ $t("NFTs.createNFT.form.buttons.send") }}</lz-button>
    </template>
  </NFT-form>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import { apiNFT } from "../api";
  import { NFTForm } from "../components";
  import LzButton from "@/components/Button.vue";

  const auth = namespace("auth");
  @Component({
    components: { NFTForm, LzButton }
  })
  export default class Create extends Vue {
    @auth.State("id")
    public ongId!: string;

    async handleOnSubmit(formValue: NFTFormValues) {
      try {
        const {
          NFT: { id }
        } = await apiNFT.createNFT(this.ongId, formValue);

        this.$notify({
          type: "success",
          text: this.$tc("NFTs.createNFT.form.status.success")
        });

        this.$router.push({ name: "viewNFT", params: { id } });
      } catch (err) {
        this.$notify({
          type: "error",
          text: this.$tc("common.error.generic")
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  $gray: #a0a7b9;

  .image-upload {
    width: 20%;
  }

  button.secondary {
    background-color: $gray;
    border: none;
  }
</style>
