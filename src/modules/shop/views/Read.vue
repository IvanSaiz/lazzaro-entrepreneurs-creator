<template lang="pug">
.shop-read
  lz-confirm(
      v-if="deleteModal"
      @close="deleteModal = false"
      @confirm="deleteItem"
      :descriptionLabel="$t('shop.read.modalDelete.content', { title: itemToDelete.title })"
      :cancelLabel="$t('common.actions.no')"
      :confirmLabel="$t('common.actions.yes')"
  )
  header
    .title
      h1 {{ $t('shop.read.title') }}
      section-toggle(section="shop")
      .view-btn
        a(:href="`${url}/tienda`" target="_blank") {{ $t('shop.read.see') }}
        arrow-up-right-icon
    p {{ $t('shop.read.subtitle') }}
  DesignModal(section="shop")
  .shop-read__stepper
    lz-stepper(
      :steps="['products', 'orders']"
      :active="active"
      @click="(step) => { this.active = step; }"
    )
      template(#default="{ step }") {{ $t('shop.read.steps.' + step) }}
  transition(name="fade", mode="out-in")
    section.shop-read__products(v-if="active === 'products'")
      lz-table(title="" :fields="listFields" :items="products")
        template(#title="{ row: { title }}") {{ title }}
        template(#discount="{ row: { discount }}") {{ discount + "%" }}
        template(#price="{ row: { price }}") {{ $n(price, "currency") }}
        template(#status="{ row: { active }}") {{ active ? $t("shop.read.status.enabled") : $t("shop.read.status.disabled") }}
        template(#actions="{ row }")
          x-icon(
            @click="deleteModal = true; itemToDelete = row"
          )
          eye-icon(
            @click="$router.push({ name: 'shopCreate', params: { productId: row.id } })"
          )
      article.shop-read__create-btn
        lz-button(
          type="primary"
          @click="$router.push({ name: 'shopCreate' })"
        ) {{ $t('shop.read.newProduct') }}
    section.shop-read__orders(v-else-if="active === 'orders'")
      lz-table(title="" :fields="ordersFields" :items="orders")
        template(#name="{ row: { name }}") {{ name }}
        template(#code="{ row: { code }}") {{ code }}
        template(#products="{ row: { products }}") {{ products }}
        template(#total="{ row: { total }}") {{ total }}
        template(#status="{ row: { status }}") {{ status }}
        template(#actions="{ row }")
          eye-icon
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import LzTable from "@/components/Table.vue";
  import LzStepper from "@/components/Stepper.vue";
  import LzModal from "@/components/Modal.vue";
  import Products from "../api";
  import { namespace } from "vuex-class";
  import { Product } from "../api/types";
  import DesignModal from "../components/DesignModal.vue";
  import LzConfirm from "@/components/Confirm.vue";
  import SectionToggle from "@/components/SectionToggle.vue";

  const auth = namespace("auth");

  @Component({
    components: {
      LzButton,
      LzTable,
      LzStepper,
      LzModal,
      DesignModal,
      LzConfirm,
      SectionToggle
    }
  })
  export default class Read extends Vue {
    @auth.State("id")
    public memberId!: string;

    @auth.State("url")
    public url!: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    active = "products";
    products: Product[] = [];

    listFields = [
      { id: "title", label: this.$t("shop.read.productsTable.name") },
      {
        id: "discount",
        label: this.$t("shop.read.productsTable.discount")
      },
      { id: "price", label: this.$t("shop.read.productsTable.price") },
      {
        id: "status",
        label: this.$t("shop.read.productsTable.status.label")
      },
      { id: "actions", label: this.$t("shop.read.productsTable.actions") }
    ];

    orders: any[] = [];

    ordersFields = [
      { id: "name", label: this.$t("shop.read.ordersTable.name") },
      { id: "code", label: this.$t("shop.read.ordersTable.trackingCode") },
      { id: "products", label: this.$t("shop.read.ordersTable.products") },
      { id: "total", label: this.$t("shop.read.ordersTable.total") },
      { id: "status", label: this.$t("shop.read.ordersTable.status") },
      { id: "actions", label: this.$t("shop.read.ordersTable.actions") }
    ];

    orderFields = [
      { id: "name", label: this.$t("shop.read.modalOrder.table.name") },
      {
        id: "products",
        label: this.$t("shop.read.modalOrder.table.products")
      },
      { id: "price", label: this.$t("shop.read.modalOrder.table.price") },
      { id: "total", label: this.$t("shop.read.modalOrder.table.total") }
    ];

    modalOrderOptions = {
      pending: this.$t("shop.read.modalOrder.status.options.pending"),
      accepted: this.$t("shop.read.modalOrder.status.options.accepted"),
      sent: this.$t("shop.read.modalOrder.status.options.sent"),
      delivered: this.$t("shop.read.modalOrder.status.options.delivered")
    };

    deleteModal = false;
    itemToDelete: Product;

    mounted() {
      Products.getAllByMemberId(this.memberId).then(res => {
        this.products = res;
      });
    }

    async deleteItem() {
      if (!this.itemToDelete) return;

      await Products.delete(this.itemToDelete.id)
        .then(() => {
          this.$notify({
            type: "success",
            text: this.$tc("shop.create.notifications.deleted")
          });
          this.$router.push({ name: "shopRead" });
        })
        .catch(() => {
          this.$notify({
            type: "error",
            text: this.$tc("common.error.generic")
          });
        });

      await Products.getAllByMemberId(this.memberId).then(res => {
        this.products = res;
        this.deleteModal = false;
      });
    }

    toggleProducts() {
      // console.log("Toggling products");
      return;
    }
  }
</script>

<style lang="scss">
  .shop-read {
    header {
      .title {
        display: flex;
        align-items: end;
        gap: 18px;
      }

      .view-btn {
        margin-left: auto;
        justify-self: flex-end;
        align-self: flex-end;
        display: flex;
        align-items: center;
        gap: 6px;
        a {
          color: $color-black-02;
          font-weight: 400;
          font-size: 1.4rem;
          line-height: 1.5rem;
        }
        svg {
          stroke: $color-black-02;
        }
      }
    }

    .lz-table {
      &__td,
      &__th {
        text-align: left;
      }

      &__th--actions,
      &__td--actions {
        text-align: end;

        & > * {
          margin-left: 10px;
        }

        svg:hover {
          cursor: pointer;
          stroke: $color-black-01;
        }
      }
    }

    &__table-actions {
      display: flex;
      justify-content: flex-end;
      margin: 20px 0;

      .formulate-input {
        margin-right: 20px;
      }
    }

    &__create-btn {
      text-align: right;
    }

    &__stepper {
      margin: 40px 0;
    }

    .shop-order {
      &__user {
        font-size: 16px;
        color: $color-black-02;
      }

      &__inputs {
        margin-top: 15px;
        margin-bottom: 15px;
      }

      &__address {
        float: left;
        width: 50%;
        margin-bottom: 30px;

        &-header {
          font-weight: 700;
          font-size: 13px;
          color: $color-black-02;
          margin-bottom: 15px;
        }

        &-item {
          line-height: 24px;
        }
      }

      &__total {
        margin-bottom: 30px;
        display: flex;
        justify-content: space-between;
        background-color: $color-black-06;
        padding: 16px 29px;
        font-size: 16px;

        p {
          color: $color-black-02;
        }
      }

      &__actions {
        text-align: right;
      }
    }
  }
</style>
