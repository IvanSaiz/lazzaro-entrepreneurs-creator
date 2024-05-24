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
      @submit="onSubmit"
      :keep-model-data="true"
    )
      section.shop-create__left
        .form__row
          formulate-input(
            type="image"
            name="default_img"
            :label="$t('shop.create.form.mainImg')"
            :label-class="['required']"
            validation="required|mime:image/jpeg,image/png,image/webp,image/webp"
            :validation-name="$t('shop.create.form.mainImg')"
            label-position="before"
            :value="productForm.default_img"
          )
        .form__row
          formulate-input(
            type="image"
            name="images"
            :label="$t('shop.create.form.images')"
            validation="mime:image/jpeg,image/png,image/webp,image/webp"
            :validation-name="$t('shop.create.form.images')"
            label-position="before"
            :multiple="true"
            :value="productForm.images"
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
            validation="required|number"
            :validation-name="$t('shop.create.form.price')"
          )
          formulate-input(
            type="text"
            name="discount"
            :label="$t('shop.create.form.discount')"
            validation="number"
            :validation-name="$t('shop.create.form.discount')"
            )
        .form__row
          formulate-input(
            type="text"
            name="stock"
            :label="$t('shop.create.form.stock')"
            :label-class="['required']"
            validation="required|number"
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
        lz-button(type="tertiary" @click.prevent="confirmDeleteProduct" v-if="productId") {{$t('common.actions.delete')}}
        lz-button(type="secondary" @click.prevent="onCreateCancel") {{ $t('common.actions.cancel') }}
        lz-button(type="primary") {{ $t('common.actions.save') }}
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import LzTable from "@/components/Table.vue";
  import LzConfirm from "@/components/Confirm.vue";
  import { namespace } from "vuex-class";
  import Products from "../api";
  import LzEditorInput from "@/components/EditorInput.vue";
  import { Product, ProductForm } from "../api/types";

  const auth = namespace("auth");

  @Component({ components: { LzButton, LzTable, LzConfirm, LzEditorInput } })
  export default class ShopCreate extends Vue {
    @auth.State("id")
    public memberId!: string;

    productId: string | null = null;
    showDeleteModal = false;

    loaded = false;
    statusOptions = {
      enabled: this.$t("projects.create.form.status.options.enabled"),
      disabled: this.$t("projects.create.form.status.options.disabled")
    };
    productForm: ProductForm = {
      member_id: this.memberId,
      status: "disabled",
      default_img: "",
      title: "",
      description: "",
      stock: "",
      delivery_time: "",
      discount: "",
      price: "",
      images: ""
    };

    async mounted() {
      this.productId = this.$route.params.productId;
      if (!this.productId) {
        this.loaded = true;
        return;
      }

      const product = await Products.getById(this.productId);

      this.productForm = {
        member_id: this.memberId,
        status: product.active ? "enabled" : "disabled",
        default_img: [{ url: product.default_img }],
        title: product.title,
        description: product.description,
        stock: product.stock.toString(),
        delivery_time: product.delivery_time,
        discount: product.discount.toString(),
        price: product.price.toString(),
        images: product.images.map(i => ({ url: i }))
      };

      this.loaded = true;
    }

    async onSubmit(form: ProductForm) {
      const product: Omit<Product, "id"> = {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        delivery_time: form.delivery_time,
        discount: Number(form.discount),
        stock: Number(form.stock),
        member_id: this.memberId,
        active: form.status === "enabled",
        default_img: form.default_img ? form.default_img[0].url : "",
        images: form.images ? form.images.map(i => i.url) : []
      };

      if (!this.productId) {
        Products.create(product)
          .then(() => {
            this.$notify({
              type: "success",
              text: this.$tc("shop.create.notifications.productSaved")
            });
            this.$router.push({ name: "shopRead" });
          })
          .catch(() => {
            this.$notify({
              type: "error",
              text: this.$tc("common.error.generic")
            });
          });
      } else {
        Products.update(this.productId, product)
          .then(() => {
            this.$notify({
              type: "success",
              text: this.$tc("shop.create.notifications.productUpdated")
            });
            this.$router.push({ name: "shopRead" });
          })
          .catch(() => {
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
      if (!this.productId) {
        return;
      }

      Products.delete(this.productId)
        .then(() => {
          this.$notify({
            type: "success",
            text: this.$tc("shop.create.notifications.productDeleted")
          });
          this.$router.push({ name: "shopRead" });
        })
        .catch(() => {
          this.$notify({
            type: "error",
            text: this.$tc("common.error.generic")
          });
        });
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
