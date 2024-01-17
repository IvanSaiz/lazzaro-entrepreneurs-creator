<template lang="pug">
.shop-create
  lz-confirm(
    v-if="showDeleteModal"
    @close='showDeleteModal = false'
    @confirm='deleteProduct'
  )

  header
    h1 {{ $t('shop.create.title') }}
    p {{ $t('shop.create.subtitle') }}

  section.shop-create__content(v-if="loaded")
    formulate-form.shop-create__form(
      v-model="productForm"
      @submit="onCreateSubmit"
      :keep-model-data="true"
    )
      section.shop-create__left
        //- .form__row
          formulate-input(
            type="toggle"
            name="causes"
            :label="$t('shop.create.form.highlight.label')"
            label-position="before"
            :wrapper-class="['formulate-input-inline-toggle']"
          )
            template(#label="{ label }")
              label
                .formulate-input-label {{ label }} 
                  span
                    crown-icon
                .formulate-input-under-label {{$t('shop.create.form.highlight.under')}}
        .form__row
          formulate-input(
            type="image"
            name="imageUrlToConvert"
            :label="$t('shop.create.form.mainImg')"
            :label-class="['required']"
            validation="required|mime:image/jpeg,image/png"
            :validation-name="$t('shop.create.form.mainImg')"
            label-position="before"
            :value="productForm.imageUrlToConvert"
          )
        .form__row
          formulate-input(
            type="image"
            name="imagesToConvert"
            :label="$t('shop.create.form.addImage')"
            :label-class="['required']"
            validation="required|mime:image/jpeg,image/png"
            :validation-name="$t('shop.create.form.addImage')"
            label-position="before"
            :multiple="true"
            :value="productForm.imagesToConvert"
          )

      section.shop-create__right
        .form__row
          formulate-input(
            type="text"
            name="title"
            :label="$t('shop.create.form.productName')"
            :label-class="['required']"
            validation="required"
            :validation-name="$t('shop.create.form.productName')"
          )
        .form__row
          lz-editor-input(
            :label="$t('shop.create.form.description')"
            v-model="productForm.description"
          )
          
        .form__row
          formulate-input(
            type="text"
            name="price"
            :label="$t('shop.create.form.price')"
            :label-class="['required']"
            validation="required"
            :validation-name="$t('shop.create.form.price')"
          )
          formulate-input(
            type="text"
            name="discount"
            :label="$t('shop.create.form.discount')"
            :label-class="['required']"
            validation="required"
            :validation-name="$t('shop.create.form.discount')"
            )
        .form__row
          formulate-input(
            type="text"
            name="amount"
            :label="$t('shop.create.form.stock')"
            :label-class="['required']"
            validation="required"
            :validation-name="$t('shop.create.form.stock')"
          )
          formulate-input(
            type="text"
            name="delivery_time"
            :label="$t('shop.create.form.deliveryTime')"
            :label-class="['required']"
            validation="required"
            :validation-name="$t('shop.create.form.deliveryTime')"
          )
        .form__row
          formulate-input(
            type="select"
            name="status"
            :label="$t('projects.create.form.status.label')"
            :options="statusOptions"
          )

      .shop-create__actions
        lz-button(type="tertiary" @click.prevent="confirmDeleteProduct") {{$t('common.actions.delete')}}
        lz-button(type="secondary" @click.prevent="onCreateCancel") {{ $t('common.actions.cancel') }}
        lz-button(type="primary") {{ $t('common.actions.save') }}
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import LzTable from "@/components/Table.vue";
  import LzConfirm from "@/components/Confirm.vue";
  import { namespace } from "vuex-class";
  import { apiShop } from "../api";
  import { parseFiles } from "@/utils/parseFile";
  import LzEditorInput from "@/components/EditorInput.vue";

  const auth = namespace("auth");

  @Component({ components: { LzButton, LzTable, LzConfirm, LzEditorInput } })
  export default class ShopCreate extends Vue {
    productId: string | null = null;
    showDeleteModal = false;

    loaded = false;
    statusOptions = {
      enabled: this.$t("projects.create.form.status.options.enabled"),
      disabled: this.$t("projects.create.form.status.options.disabled")
    };
    productForm = {
      ongId: "",
      title: "",
      description: "",
      imageUrlToConvert: [] as any,
      imageUrl: "",
      remark: "",
      stock: "",
      status: "",
      amount: "",
      delivery_time: "",
      discount: "",
      price: "",
      imagesToConvert: [] as any,
      images: [] as any
    };

    @auth.State("id")
    public ongId!: string;

    async mounted() {
      this.productId = this.$route.params.productId;
      if (this.productId) {
        await Promise.all([
          apiShop.getProduct(this.productId).then(({ data }) => {
            this.productForm.ongId = this.ongId;
            this.productForm.title = data.title;
            this.productForm.status = data.active ? "enabled" : "disabled";
            this.productForm.description = data.description;
            this.productForm.imageUrlToConvert = [{ url: data.default_img }];
            this.productForm.price = data.price;
            this.productForm.discount = data.discount;
            this.productForm.amount = data.amount;
            this.productForm.delivery_time = data.delivery_time;
          }),
          apiShop.getProductImages(this.productId).then(({ data }) => {
            this.productForm.imagesToConvert.length = 0;
            data.forEach((d: any) => {
              if (d.img_url.includes("default")) return;

              this.productForm.imagesToConvert.push({ url: d.img_url });
            });
          })
        ]);
      }
      this.loaded = true;
      this.productForm.ongId = this.ongId;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async onCreateSubmit(e: any) {
      const imageUrlToBase64 = await parseFiles(
        this.productForm.imageUrlToConvert
      );

      const images: any[] = await parseFiles(this.productForm.imagesToConvert);

      const body = {
        ...this.productForm,
        imageUrl: imageUrlToBase64[0],
        active: this.productForm.status == "enabled" ? true : false,
        images: Array.isArray(images) ? images : [images],
        imageUrlToConvert: undefined,
        imagesToConvert: undefined
      };
      if (!this.productId) {
        apiShop
          .postProduct(body)
          .then(() => {
            this.$notify({
              type: "success",
              text: this.$tc("shop.create.notifications.productSaved")
            });
            this.$router.push({ name: "shop" });
          })
          .catch((err: any) => {
            this.$notify({
              type: "error",
              text: this.$tc("common.error.generic")
            });
          });
      } else {
        apiShop
          .updateProduct(this.productId, body)
          .then(() => {
            this.$notify({
              type: "success",
              text: this.$tc("shop.create.notifications.productUpdated")
            });
            this.$router.push({ name: "shop" });
          })
          .catch((err: any) => {
            this.$notify({
              type: "error",
              text: this.$tc("common.error.generic")
            });
          });
      }
    }

    onCreateCancel() {
      this.$router.push({ name: "shopRead" });
    }

    confirmDeleteProduct() {
      this.showDeleteModal = true;
    }

    deleteProduct() {
      if (this.productId) {
        apiShop
          .deleteProduct(this.ongId, this.productId)
          .then(() => {
            this.$notify({
              type: "success",
              text: this.$tc("shop.create.notifications.productRemoved")
            });
            this.$router.push({ name: "shopRead" });
          })
          .catch(() => {
            this.$notify({
              type: "error",
              text: this.$tc("common.error.generic")
            });
            this.showDeleteModal = false;
          });
      }
    }
  }
</script>

<style lang="scss">
  .shop-create {
    font-size: 1rem;

    &__form {
      display: flex;
      flex-wrap: wrap;
      margin-top: 40px;
    }

    &__left {
      flex-basis: 20%;
    }

    &__images {
      width: 100%;
    }

    &__right {
      flex: 1;
      padding-left: 40px;
    }

    &__actions {
      text-align: right;
      margin-top: 100px;
      width: 100%;
    }
  }
</style>
