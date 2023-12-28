import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

// modules
import { authModuleRouter } from "@/modules/auth";
import { errorModuleRouter } from "@/modules/error";
import { webModuleRouter } from "@/modules/web";
import { projectsModuleRouter } from "@/modules/projects";
import { shopModuleRouter } from "@/modules/shop";
import { accountsModuleRouter } from "@/modules/accounts";
import { partnersModuleRouter } from "@/modules/partners";
import { eventsModuleRouter } from "@/modules/events";
import { userModuleRouter } from "@/modules/user";
import { organizationModuleRouter } from "@/modules/organization";
import {
  hasAccessToken,
  hasAuth,
  removeAccessToken,
  removeAuth
} from "@/api/core/auth";
import Main from "@/views/Main/index.vue";
import { profileModuleRouter } from "@/modules/profile";
import { consultantModuleRouter } from "@/modules/consultant";
import { NFTsModuleRouter } from "@/modules/NFT";
import { dataModuleRouter } from "@/modules/data";
import { improveModuleRouter } from "@/modules/improve";
import { servicesModuleRouter } from "@/modules/services";

Vue.use(VueRouter);

/**
 * - Lazy loading, with named chunks improves performance. Just required modules are loaded in the
 * client browser.
 */
const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: { name: "Home" },
    component: Main,
    children: [
      ...webModuleRouter,
      ...projectsModuleRouter,
      ...shopModuleRouter,
      ...accountsModuleRouter,
      ...partnersModuleRouter,
      ...eventsModuleRouter,
      ...userModuleRouter,
      ...profileModuleRouter,
      ...organizationModuleRouter,
      ...consultantModuleRouter,
      ...NFTsModuleRouter,
      ...dataModuleRouter,
      ...improveModuleRouter,
      ...servicesModuleRouter
    ]
  },
  ...authModuleRouter,
  ...errorModuleRouter
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

/**
 * Before each hook responsible for checking if there's a token registered before accesing.
 */
router.beforeEach((to, _, next) => {
  if (["Recover", "RecoverHash"].includes(to.name as string)) return next();

  if (to?.meta?.noAuth !== true && (!hasAccessToken() || !hasAuth())) {
    removeAccessToken();
    removeAuth();
    next({ name: "Signin" });
  }
  next();
});

export default router;
