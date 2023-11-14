import { RouteConfig } from "vue-router/types/router";

/**
 * - Lazy loading, with named chunks improves performance. Just required modules are loaded in the
 * client browser.
 */
const routes: Array<RouteConfig> = [
  {
    path: "/projects",
    name: "projects",
    component: () =>
      import(/* webpackChunkName: "projects" */ "../views/Projects.vue"),
    redirect: { name: "projectsRead" },
    children: [
      {
        path: "read",
        name: "projectsRead",
        component: () =>
          import(/* webpackChunkName: "projectsRead" */ "../views/Read.vue")
      },
      {
        path: "create/:proyectId?",
        name: "projectsCreate",
        component: () =>
          import(/* webpackChunkName: "projectsCreate" */ "../views/Create.vue")
      }
    ]
  }
];

export default routes;
