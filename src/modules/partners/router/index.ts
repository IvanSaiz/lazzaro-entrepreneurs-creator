import { RouteConfig } from "vue-router/types/router";

/**
 * - Lazy loading, with named chunks improves performance. Just required modules are loaded in the
 * client browser.
 */
const routes: Array<RouteConfig> = [
  {
    path: "/partners",
    name: "partners",
    component: () =>
      import(/* webpackChunkName: "partners" */ "../views/Partners.vue"),
    redirect: { name: "partnersRead" },
    children: [
      {
        path: "read",
        name: "partnersRead",
        component: () =>
          import(/* webpackChunkName: "partnersRead" */ "../views/Read.vue")
      },
      {
        path: "read/:subscriptionId?",
        name: "partnerDetail",
        props: route => ({ subscriptionId: route.params.subscriptionId }),
        component: () =>
          import(/* webpackChunkName: "partnerDetail" */ "../views/Detail.vue")
      }
    ]
  }
];

export default routes;
