import { RouteConfig } from "vue-router/types/router";

export enum ROUTES {
  READ = "eventsRead",
  CREATE = "eventsCreate"
}

/**
 * - Lazy loading, with named chunks improves performance. Just required modules are loaded in the
 * client browser.
 */
const routes: Array<RouteConfig> = [
  {
    path: "/events",
    name: "events",
    component: () =>
      import(/* webpackChunkName: "events" */ "../views/Events.vue"),
    redirect: { name: ROUTES.READ },
    children: [
      {
        path: "read",
        name: ROUTES.READ,
        component: () =>
          import(/* webpackChunkName: "eventsRead" */ "../views/Read.vue")
      },
      {
        path: "create/:eventId?",
        name: ROUTES.CREATE,
        component: () =>
          import(/* webpackChunkName: "calendarCreate" */ "../views/Create.vue")
      }
    ]
  }
];

export default routes;
