import { RouteConfig } from "vue-router/types/router";

/**
 * - Lazy loading, with named chunks improves performance. Just required modules are loaded in the
 * client browser.
 */
const routes: Array<RouteConfig> = [
  {
    path: "/auth",
    name: "Auth",
    component: () => import(/* webpackChunkName: "auth" */ "../views/Auth.vue"),
    children: [
      {
        path: "signup",
        name: "Signup",
        meta: { noAuth: true },
        component: () =>
          import(/* webpackChunkName: "auth.signup" */ "../views/Signup.vue")
      },
      {
        path: "recover",
        name: "Recover",
        meta: { noAuth: true },
        component: () =>
          import(/* webpackChunkName: "auth.Recover" */ "../views/Recover.vue")
      },
      {
        path: "recover/:hash",
        name: "RecoverHash",
        props: route => ({ hash: route.params.hash }),
        meta: { noAuth: true },
        component: () =>
          import(
            /* webpackChunkName: "auth.RecoverHash" */ "../views/RecoverHash.vue"
          )
      },
      {
        path: "signin",
        name: "Signin",
        meta: { noAuth: true },
        component: () =>
          import(/* webpackChunkName: "auth.signin" */ "../views/Signin.vue")
      },
      {
        path: "onboarding",
        name: "Onboarding",
        component: () =>
          import(
            /* webpackChunkName: "auth.onboarding" */ "../views/Onboarding/index.vue"
          )
      },
      {
        path: "logout",
        name: "Logout",
        beforeEnter: (to, from, next) => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("auth");
          next({ name: "signin" });
        }
      }
    ]
  }
];

export default routes;
