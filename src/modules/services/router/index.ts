import { RouteConfig } from "vue-router/types/router";

/**
 * - Lazy loading, with named chunks improves performance. Just required modules are loaded in the
 * client browser.
 */
const routes: Array<RouteConfig> = [
  {
    path: "/services",
    name: "services",
    component: () =>
      import(/* webpackChunkName: "services" */ "../views/Services.vue"),
    redirect: { name: "servicesRead" },
    children: [
      {
        path: "read",
        name: "servicesRead",
        component: () =>
          import(/* webpackChunkName: "serviceRead" */ "../views/Read.vue")
      },
      {
        path: "create/:serviceId?",
        name: "servicesCreate",
        component: () =>
          import(/* webpackChunkName: "serviceCreate" */ "../views/Create.vue")
      }
    ]
  }
];

export default routes;
