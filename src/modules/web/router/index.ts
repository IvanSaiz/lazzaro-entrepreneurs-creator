import { RouteConfig } from "vue-router/types/router";

/**
 * - Lazy loading, with named chunks improves performance. Just required modules are loaded in the
 * client browser.
 */
const routes: Array<RouteConfig> = [
  {
    path: "/web",
    name: "web",
    component: () => import(/* webpackChunkName: "web" */ "../views/Web.vue"),
    redirect: { name: "public" },
    children: [
      {
        path: "public",
        name: "public",
        component: () =>
          import(/* webpackChunkName: "public" */ "../views/Public.vue")
      }
    ]
  }
];

export default routes;
