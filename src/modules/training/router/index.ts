import { RouteConfig } from "vue-router/types/router";
import { sections } from "../views/Home.vue";
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
    redirect: { name: "TrainingHome" },
    children: [
      {
        path: "",
        name: "TrainingHome",
        component: () =>
          import(/* webpackChunkName: "trainingHome" */ "../views/Home.vue")
      },
      ...sections.map(section => ({
        path: section.toLowerCase(),
        name: `Training${section}`,
        component: () =>
          import(
            /* webpackChunkName: "training${section}" */ `../views/sections/${section}.vue`
          )
      }))
    ]
  }
];

export default routes;
