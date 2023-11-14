import { RouteConfig } from "vue-router/types/router";

/**
 * - Lazy loading, with named chunks improves performance. Just required modules are loaded in the
 * client browser.
 */
const routes: Array<RouteConfig> = [
  {
    path: "/consultant",
    name: "consultant",
    // eslint-disable-next-line
    component: () => import(/* webpackChunkName: "consultant" */ "../views/Consultant.vue"),
    redirect: { name: "consultantRead" },
    children: [
      {
        path: "read",
        name: "consultantRead",
        component: () =>
          import(/* webpackChunkName: "consultantRead" */ "../views/Read.vue")
      }
    ]
  }
];

export default routes;
