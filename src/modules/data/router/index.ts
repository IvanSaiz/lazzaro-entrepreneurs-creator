import { RouteConfig } from "vue-router/types/router";

/**
 * - Lazy loading, with named chunks improves performance. Just required modules are loaded in the
 * client browser.
 */
const routes: Array<RouteConfig> = [
  {
    path: "/data",
    name: "data",
    // eslint-disable-next-line
    component: () => import(/* webpackChunkName: "data" */ "../views/Data.vue"),
    redirect: { name: "dataRead" },
    children: [
      {
        path: "read",
        name: "dataRead",
        props: route => ({ step: route.params.step }),
        component: () =>
          import(/* webpackChunkName: "dataRead" */ "../views/Read.vue")
      }
    ]
  }
];

export default routes;
