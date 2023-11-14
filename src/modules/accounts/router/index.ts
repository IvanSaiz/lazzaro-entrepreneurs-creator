import { RouteConfig } from "vue-router/types/router";

/**
 * - Lazy loading, with named chunks improves performance. Just required modules are loaded in the
 * client browser.
 */
const routes: Array<RouteConfig> = [
  {
    path: "/accounts",
    name: "accounts",
    component: () =>
      import(/* webpackChunkName: "accounts" */ "../views/Accounts.vue"),
    redirect: { name: "accountsRead" },
    children: [
      {
        path: "read",
        name: "accountsRead",
        component: () =>
          import(/* webpackChunkName: "accountsRead" */ "../views/Read.vue")
      }
    ]
  }
];

export default routes;
