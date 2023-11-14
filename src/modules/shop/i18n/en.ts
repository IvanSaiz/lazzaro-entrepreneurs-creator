export default {
  read: {
    title: "Shop",
    subtitle: "Manage your products and your orders here",
    steps: {
      products: "Products",
      orders: "Orders"
    },
    modalOrder: {
      title: "Order",
      delivery: "Delivery company",
      trackingCode: "Tracking code",
      status: {
        label: "Status",
        options: {
          pending: "Pending acceptance",
          accepted: "Accepted",
          sent: "Sent",
          delivered: "Delivered"
        }
      },
      billAddress: "Billing address",
      deliveryAddress: "Delivery address",
      table: {
        name: "Name",
        products: "Products",
        price: "Price",
        total: "Total"
      }
    },
    currency: {
      euro: "€"
    },
    percent: "%",
    total: "Total",
    productsTable: {
      name: "Name",
      discount: "Discount",
      products: "Products",
      price: "Price",
      status: {
        label: "Status",
        options: {
          enabled: "Enabled",
          disabled: "Disabled"
        }
      },
      actions: "Actions"
    },
    ordersTable: {
      name: "Name",
      trackingCode: "Tracking code",
      products: "Products",
      total: "Total",
      status: "Satus",
      actions: "Actions"
    },
    newProduct: "New product"
  },
  create: {
    title: "New product",
    subtitle: "Configure your product here",
    form: {
      highlight: {
        label: "Highlight product",
        under: "Highlighted product"
      },
      mainImg: "Primary image",
      addImage: "Add image",
      productName: "Product name",
      description: "Description",
      price: "Price",
      discount: "Discount",
      stock: "Stock",
      deliveryTime: "Delivery time"
    },
    notifications: {
      productSaved: "Product successfully saved",
      productUpgrated: "Product successfully upgraded",
      productRemoved: "Product successfully removed"
    }
  }
};
