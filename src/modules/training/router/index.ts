import { RouteConfig } from "vue-router/types/router";

/**
 * - Lazy loading, with named chunks improves performance. Just required modules are loaded in the
 * client browser.
 */
const routes: Array<RouteConfig> = [
  {
    path: "/training",
    name: "training",
    component: () =>
      import(/* webpackChunkName: "training" */ "../views/Training.vue"),
    redirect: { name: "trainingHome" },
    children: [
      {
        path: "read",
        name: "trainingHome",
        component: () =>
          import(/* webpackChunkName: "trainingHome" */ "../views/Home.vue")
      }
    ]
  }
];

export default routes;
