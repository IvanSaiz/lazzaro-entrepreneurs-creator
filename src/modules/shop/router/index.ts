import { RouteConfig } from "vue-router/types/router";

/**
 * - Lazy loading, with named chunks improves performance. Just required modules are loaded in the
 * client browser.
 */
const routes: Array<RouteConfig> = [
  {
    path: "/shop",
    name: "shop",
    component: () => import(/* webpackChunkName: "shop" */ "../views/Shop.vue"),
    redirect: { name: "shopRead" },
    children: [
      {
        path: "read",
        name: "shopRead",
        component: () =>
          import(/* webpackChunkName: "shopRead" */ "../views/Read.vue")
      },
      {
        path: "create/:productId?",
        props: route => ({ productId: route.params.productId }),
        name: "shopCreate",
        component: () =>
          import(/* webpackChunkName: "shopCreate" */ "../views/Create.vue")
      }
    ]
  }
];

export default routes;
