import { RouteConfig } from "vue-router/types/router";

/**
 * - Lazy loading, with named chunks improves performance. Just required modules are loaded in the
 * client browser.
 */
const routes: Array<RouteConfig> = [
  {
    path: "/profile",
    name: "profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
    redirect: { name: "profileRead" },
    children: [
      {
        path: "read",
        name: "profileRead",
        component: () =>
          import(/* webpackChunkName: "profileRead" */ "../views/Read.vue")
      }
    ]
  }
];

export default routes;
