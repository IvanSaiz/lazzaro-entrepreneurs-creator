<template>
  <section>
    <slot name="header" />
    <main class="form">
      <formulate-form v-model="formValues" @submit="handleOnSubmit">
        <slot name="image" />

        <div class="inputs" :style="{ width: readonlyForm ? '%68' : '75%' }">
          <div class="form__row column">
            <input-label :title="$t('NFTs.createNFT.form.NFT_name.title')" />
            <formulate-input
              name="name"
              :validation="readonlyForm ? undefined : 'required'"
              :validation-name="$t('NFTs.createNFT.form.NFT_name.title')"
              :readonly="readonlyForm"
            />
          </div>

          <div class="form__row column">
            <input-label
              :title="$t('NFTs.createNFT.form.description.title')"
              :subtitle="$t('NFTs.createNFT.form.description.subtitle')"
            />

            <formulate-input
              type="textarea"
              name="description"
              :validation="readonlyForm ? undefined : 'required'"
              :validation-name="$t('NFTs.createNFT.form.description.title')"
              :readonly="readonlyForm"
            />
          </div>

          <div class="form__row column">
            <input-label
              :title="$t('NFTs.createNFT.form.walletAddress.title')"
            />
            <formulate-input
              name="walletAddress"
              :validation="readonlyForm ? undefined : 'required'"
              :validation-name="$t('NFTs.createNFT.form.walletAddress.title')"
              :readonly="readonlyForm"
              v-model="formValues.walletAddress"
            />
          </div>

          <div class="form__row column">
            <input-label :title="$t('NFTs.createNFT.form.symbol.title')" />
            <formulate-input
              name="symbol"
              :validation="readonlyForm ? undefined : 'required'"
              :validation-name="$t('NFTs.createNFT.form.symbol.title')"
              :readonly="readonlyForm"
            />
          </div>

          <div class="form__row column">
            <input-label
              :title="$t('NFTs.createNFT.form.maxMintingQuantity.title')"
              :subtitle="$t('NFTs.createNFT.form.maxMintingQuantity.subtitle')"
            />
            <formulate-input
              name="maxMintingQuantity"
              :validation="readonlyForm ? undefined : 'required|number'"
              :validation-name="
                $t('NFTs.createNFT.form.maxMintingQuantity.title')
              "
              :readonly="readonlyForm"
            />
          </div>

          <div class="form__row column">
            <input-label
              :title="$t('NFTs.createNFT.form.donationAmount.title')"
            />
            <formulate-input
              name="minDonationAmount"
              :validation="'required|number'"
              :validation-name="$t('NFTs.createNFT.form.donationAmount.title')"
            />
          </div>

          <div class="form__row column">
            <input-label
              :title="$t('NFTs.createNFT.form.externalUrl.title')"
              :subtitle="$t('NFTs.createNFT.form.externalUrl.subtitle')"
            />
            <formulate-input
              name="externalUrl"
              :validation="readonlyForm ? undefined : 'required'"
              :validation-name="$t('NFTs.createNFT.form.externalUrl.title')"
              :readonly="readonlyForm"
            />
          </div>

          <div class="form__row column flex-gap-7">
            <lz-table
              :title="$t('NFTs.createNFT.form.attributes.title')"
              :fields="FIELDS"
              :items="formValues?.attributes"
              style="margin-top:3rem"
            >
              <template #type="{row:{type}}">{{ type }}</template>
              <template #name="{row:{name}}">{{ name }}</template>
              <template #action="{row:{name}}">
                <span
                  style="cursor: pointer;"
                  @click.prevent="deleteProperty(name)"
                >
                  X
                </span>
              </template>
            </lz-table>

            <div>
              <input-label
                :title="$t('NFTs.createNFT.form.attributes.title')"
                :subtitle="$t('NFTs.createNFT.form.attributes.subtitle')"
              />

              <div class="create-attributes-form">
                <formulate-input
                  v-model="attributeType"
                  :label="$t('NFTs.createNFT.form.attributes.type')"
                  style="width: 20rem"
                  :validation="readonlyForm ? undefined : 'required'"
                  :validation-name="$t('NFTs.createNFT.form.attributes.type')"
                  :readonly="readonlyForm"
                />
                <formulate-input
                  v-model="AttributeName"
                  :validation="readonlyForm ? undefined : 'required'"
                  :validation-name="$t('NFTs.createNFT.form.attributes.name')"
                  :readonly="readonlyForm"
                  :label="$t('NFTs.createNFT.form.attributes.name')"
                  style="width: 20rem;"
                />

                <lz-button
                  @click.prevent="createAttribute"
                  :disabled="readonlyForm"
                  style="margin-top:2rem; width:12rem"
                  >{{ $t("NFTs.createNFT.form.buttons.create") }}</lz-button
                >
              </div>
            </div>
          </div>

          <div class="form__row action-buttons">
            <slot name="action-buttons" />
          </div>
        </div>
      </formulate-form>
    </main>
  </section>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import LzTable from "@/components/Table.vue";
  import InputLabel from "./InputLabel.vue";
  import NFTImageCard from "./NFTImageCard.vue";
  import { parseFiles } from "@/utils/parseFile";
  import { isMetaMaskConnected } from "@/utils";

  @Component({
    components: {
      LzButton,
      LzTable,
      InputLabel,
      NFTImageCard
    }
  })
  export default class CreateNFTForm extends Vue {
    @Prop({ required: false })
    public formValues!: NFTFormValues;

    @Prop({ required: false })
    public onSubmit!: (formValues: NFTFormValues) => void;

    @Prop({ required: false })
    public readonlyForm!: boolean;

    public attributeType = "";
    public AttributeName = "";

    FIELDS = [
      { id: "name", label: this.$t("NFTs.createNFT.form.attributes.name") },
      {
        id: "type",
        label: this.$t("NFTs.createNFT.form.attributes.type")
      },
      {
        id: "action",
        label: ""
      }
    ];

    async handleOnSubmit() {
      const uploadedImageFile = this.formValues.image;
      const [parsedImage] = await parseFiles(uploadedImageFile);

      this.onSubmit({
        ...this.formValues,
        image: parsedImage
      });
    }

    createAttribute() {
      const type = this.attributeType?.trim();
      const name = this.AttributeName?.trim();
      if (!type || !name) return;

      this.formValues.attributes.push({ type, name });

      this.AttributeName = " ";
      this.attributeType = " ";
    }

    deleteProperty(name: string) {
      this.formValues.attributes = this.formValues.attributes.filter(
        attr => attr.name !== name
      );
    }

    mounted() {
      this.checkConnection("eth_requestAccounts");
    }

    async checkConnection(method: EthereumMethod) {
      if (!isMetaMaskConnected(window)) return;

      const [accountAddress] = await window.ethereum.request({ method });
      this.formValues.walletAddress = accountAddress;
    }
  }
</script>

<style lang="scss" scoped>
  section {
    min-height: 100%;
    min-width: 100%;
  }

  header {
    .subtitle {
      margin-top: 1.5rem;
      line-height: 1.5;
      font-size: 1.5rem;
    }
  }

  main.form {
    padding-block: 3rem;
    width: 100%;
    height: 100%;

    form {
      display: flex;
      gap: 3rem;
      justify-content: space-between;
      flex-wrap: wrap;

      .inputs {
        width: 68%;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
    }

    .form__row {
      * {
        margin: 0;
      }
    }

    .form__row.column {
      flex-direction: column;
    }

    .action-buttons {
      margin-top: 5rem;
      justify-content: flex-end;
      gap: 2rem;
      align-items: center;
    }

    .create-attributes-form {
      margin-top: 2rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      flex-wrap: wrap;

      @media screen and (max-width: 750px) {
        .formulate-input {
          width: 100% !important;
        }

        button {
          align-self: center;
          width: 100% !important;
          margin-inline: auto;
        }
      }
    }

    .flex-gap-7 {
      gap: 7rem;
    }
  }
</style>
