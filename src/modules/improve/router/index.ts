import { RouteConfig } from "vue-router/types/router";

/**
 * - Lazy loading, with named chunks improves performance. Just required modules are loaded in the
 * client browser.
 */
const routes: Array<RouteConfig> = [
  {
    path: "/improve",
    name: "improve",
    // eslint-disable-next-line
    component: () => import(/* webpackChunkName: "improve" */ "../views/Improve.vue"),
    redirect: { name: "readImprove" },
    children: [
      {
        path: "read",
        name: "readImprove",
        component: () =>
          import(/* webpackChunkName: "readImprove" */ "../views/Read.vue")
      },
      {
        path: "tip1",
        name: "tip1",
        component: () =>
          import(/* webpackChunkName: "tip1" */ "../views/Tip1.vue")
      },
      {
        path: "tip2",
        name: "tip2",
        component: () =>
          import(/* webpackChunkName: "tip2" */ "../views/Tip2.vue")
      },
      {
        path: "tip3",
        name: "tip3",
        component: () =>
          import(/* webpackChunkName: "tip3" */ "../views/Tip3.vue")
      },
      {
        path: "tip4",
        name: "tip4",
        component: () =>
          import(/* webpackChunkName: "tip4" */ "../views/Tip4.vue")
      },
      {
        path: "tip5",
        name: "tip5",
        component: () =>
          import(/* webpackChunkName: "tip5" */ "../views/Tip5.vue")
      },
      {
        path: "tip6",
        name: "tip6",
        component: () =>
          import(/* webpackChunkName: "tip6" */ "../views/Tip6.vue")
      },
      {
        path: "tip7",
        name: "tip7",
        component: () =>
          import(/* webpackChunkName: "tip7" */ "../views/Tip7.vue")
      },
      {
        path: "tip8",
        name: "tip8",
        component: () =>
          import(/* webpackChunkName: "tip8" */ "../views/Tip8.vue")
      }
    ]
  }
];

export default routes;
