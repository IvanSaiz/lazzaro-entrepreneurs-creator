<template lang="pug">
.shop-read
  header
    h1 {{ $t('shop.read.title') }}
    p {{ $t('shop.read.subtitle') }}
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

  const auth = namespace("auth");

  @Component({ components: { LzButton, LzTable, LzStepper, LzModal } })
  export default class Read extends Vue {
    @auth.State("id")
    public memberId!: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    active = "products";
    productsQuery = "";
    products: Product[] = [];
    modalOrder = null;

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

    mounted() {
      Products.getAllByMemberId(this.memberId).then(res => {
        this.products = res;
      });
    }
  }
</script>

<style lang="scss">
  .shop-read {
    .lz-table {
      &__td,
      &__th {
        text-align: left;
      }

      &__th--actions,
      &__td--actions {
        display: flex;
        justify-content: space-around;
        text-align: end;

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
