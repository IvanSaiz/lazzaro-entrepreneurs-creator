import { RouteConfig } from "vue-router/types/router";

const routes: RouteConfig[] = [
  {
    path: "/NFTs",
    name: "NFTs",
    component: () => import(/* webpackChunkName: "NFTs" */ "../views/NFT.vue"),
    redirect: { name: "NFTsRead" },
    children: [
      {
        path: "read",
        name: "NFTsRead",
        component: () =>
          import(/* webpackChunkName: "NFTsRead" */ "../views/Read.vue")
      },
      {
        path: "create",
        name: "createNFT",
        component: () =>
          import(/* webpackChunkName: "CreateNFTForm" */ "../views/Create.vue")
      },
      {
        path: "view/:id",
        name: "viewNFT",
        component: () =>
          import(/* webpackChunkName: "ViewNFTForm" */ "../views/View.vue")
      },
      {
        path: "sell/:id",
        name: "sellNFT",
        component: () =>
          import(/* webpackChunkName: "sellNFTForm" */ "../views/Sell.vue")
      }
    ]
  }
];

export default routes;
