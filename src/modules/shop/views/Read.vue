<template lang="pug">
  .shop-read
    header
      h1 {{ $t('shop.read.title') }}
      p {{ $t('shop.read.subtitle') }}

    //- lz modal
    lz-modal.shop-order(v-if="showOrderModal" @close="closeOrderModal")
      h2 {{ $t('shop.read.modalOrder.title') }} {{ modalOrder.code }}

      p.shop-order__user {{ modalOrder.User.firstName }} {{ modalOrder.User.lastName }}
      p.shop-order__user {{ modalOrder.User.email }}

      .form__row.shop-order__inputs
        formulate-input.formulate-input-label--sm(
          type="text"
          v-model="modalOrder.shipment_method_url"
          :label="$t('shop.read.modalOrder.delivery')"
        )
        formulate-input.formulate-input-label--sm(
          type="text"
          v-model="modalOrder.tracking_code"
          :label="$t('shop.read.modalOrder.trackingCode')"
        )
        formulate-input.formulate-input-label--sm(
          type="select"
          :label="$t('shop.read.modalOrder.status.label')"
          v-model="modalOrder.status"
          :options="modalOrderOptions"
        )

      .shop-order__address
        .shop-order__address-header {{ $t('shop.read.modalOrder.billAddress') }}
        ul.shop-order__address-list
          li.shop-order__address-item
          li.shop-order__address-item {{ modalOrder.address }}
          li.shop-order__address-item {{ modalOrder.cp }} {{ modalOrder.city }}
          li.shop-order__address-item {{ modalOrder.country }}

      .shop-order__address
        .shop-order__address-header {{ $t('shop.read.modalOrder.deliveryAddress') }}
        ul.shop-order__address-list
          li.shop-order__address-item
          li.shop-order__address-item {{ modalOrder.address }}
          li.shop-order__address-item {{ modalOrder.cp }} {{ modalOrder.city }}
          li.shop-order__address-item {{ modalOrder.country }}

      lz-table.shop-order__table(
        title=""
        :fields="orderFields"
        :items="modalOrder.OrderDetails"
      )
        template(#name="{ row }") {{ row.Product.title }}
        template(#products="{ row }") {{ row.Product.amount }}
        template(#price="{ row }") {{ row.Product.price }} {{ $t('shop.read.currency.euro') }}
        template(#total="{ row }") {{ row.Product.amount * row.Product.price }} {{ $t('shop.read.currency.euro') }}

      .shop-order__total
        p {{ $t('shop.read.modalOrder.total') }}
        p {{ modalOrder.total }}

      .shop-order__actions
        lz-button(type="secondary" @click="closeOrderModal" :smaller="true") {{ $t('common.actions.cancel') }}
        lz-button(
          type="primary"
          :smaller="true"
          @click="saveOrder(modalOrder)"
        ) {{ $t('common.actions.save') }}

    .shop-read__stepper
      lz-stepper(
        :steps="['products', 'orders']"
        :active="active"
        @click="(step) => { this.active = step; }"
      )
        template(#default="{ step }") {{ $t('shop.read.steps.' + step) }}

    transition(name="fade", mode="out-in")
      section.shop-read__products(v-if="active === 'products'")
        //-
          .shop-read__table-actions
            formulate-input.formulate-input--smaller(
              type="text"
              :placeholder="$t('common.actions.search')"
              v-model="productsQuery"
            )
            lz-button(type="tertiary")
              download-icon
              span {{$t('common.actions.downloadData')}}
        - //
        lz-table(title="" :fields="listFields" :items="products")
          template(#title="{ row: { title }}") {{ title }}
          template(#discount="{ row: { discount }}") {{ discount }}
          template(#price="{ row: { price }}") {{ price }}
          template(#status="{ row: { status }}") {{ status }}
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
            eye-icon(@click="viewOrder(row)")
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import LzButton from "@/components/Button.vue";
  import LzTable from "@/components/Table.vue";
  import LzStepper from "@/components/Stepper.vue";
  import LzModal from "@/components/Modal.vue";
  import { apiShop } from "../api";
  import { namespace } from "vuex-class";

  const auth = namespace("auth");

  @Component({ components: { LzButton, LzTable, LzStepper, LzModal } })
  export default class Read extends Vue {
    @auth.State("id")
    public ongId!: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    active = "products";
    productsQuery = "";
    products: any[] = [];

    showOrderModal = false;
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

    viewOrder(row: any): void {
      this.modalOrder = row;
      this.showOrderModal = true;
    }

    closeOrderModal(): void {
      this.modalOrder = null;
      this.showOrderModal = false;
    }

    saveOrder(row: any): void {
      const body = {
        status: row.status,
        shipment_method_url: row.shipment_method_url,
        tracking_code: row.tracking_code,
        user_email: row.User.email
      };
      apiShop.updateOrder(row.id, body).then(() => {
        this.closeOrderModal();
      });
    }

    onModalPull(): void {
      // console.log("ww");
    }

    mounted() {
      apiShop.getProducts(this.ongId).then(({ data }) => {
        data.forEach((product: any) => {
          product.status = product.active
            ? this.$t("shop.read.productsTable.status.options.enabled")
            : this.$t("shop.read.productsTable.status.options.disabled");
          product.discount =
            product.discount + `${this.$t("shop.read.percent")}`;
          product.price =
            product.price + `${this.$t("shop.read.currency.euro")}`;
          this.products.push(product);
        });
      });
      apiShop.getOrders(this.ongId).then(({ data }) => {
        data.forEach((order: any) => {
          const orderItem = { ...order } as any;
          orderItem.name = order.User.firstName + order.User.lastName;
          orderItem.code = order.tracking_code;
          orderItem.products = order.OrderDetails[0].Product.title;
          orderItem.total =
            order.amount + `${this.$t("shop.read.currency.euro")}`;
          orderItem.status = order.status;
          this.orders.push(orderItem);
        });
      });
    }
  }
</script>

<style lang="scss">
  .shop-read {
    .lz-table {
      &__th--actions {
        display: flex;
        justify-content: space-around;
        text-align: center;

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
