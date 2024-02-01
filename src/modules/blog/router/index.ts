import { RouteConfig } from "vue-router/types/router";

/**
 * - Lazy loading, with named chunks improves performance. Just required modules are loaded in the
 * client browser.
 */
const routes: Array<RouteConfig> = [
  {
    path: "/blog",
    name: "blog",
    component: () => import(/* webpackChunkName: "blog" */ "../views/Blog.vue"),
    redirect: { name: "blogRead" },
    children: [
      {
        path: "read",
        name: "blogRead",
        component: () =>
          import(/* webpackChunkName: "blogRead" */ "../views/Read.vue")
      },
      {
        path: "create/:articleId?",
        props: route => ({ articleId: route.params.articleId }),
        name: "blogCreate",
        component: () =>
          import(/* webpackChunkName: "blogCreate" */ "../views/Create.vue")
      }
    ]
  }
];

export default routes;
