import { RouteConfig } from "vue-router/types/router";

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
    redirect: { name: "calendarRead" },
    children: [
      {
        path: "read",
        name: "calendarRead",
        component: () =>
          import(/* webpackChunkName: "calendarRead" */ "../views/Read.vue")
      },
      {
        path: "create/:eventId?",
        name: "calendarCreate",
        component: () =>
          import(/* webpackChunkName: "calendarCreate" */ "../views/Create.vue")
      }
    ]
  }
];

export default routes;
