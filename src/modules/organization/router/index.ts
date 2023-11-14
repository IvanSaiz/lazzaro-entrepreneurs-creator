import { RouteConfig } from "vue-router/types/router";

/**
 * - Lazy loading, with named chunks improves performance. Just required modules are loaded in the
 * client browser.
 */
const routes: Array<RouteConfig> = [
  {
    path: "/organization",
    name: "organization",
    // eslint-disable-next-line
    component: () => import(/* webpackChunkName: "organization" */ "../views/Organization.vue"),
    redirect: { name: "organizationRead" },
    children: [
      {
        path: "read",
        name: "organizationRead",
        props: route => ({ step: route.params.step }),
        component: () =>
          import(/* webpackChunkName: "organizationRead" */ "../views/Read.vue")
      }
    ]
  }
];

export default routes;
