import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";

import TradeNFT from "../views/TradeNFT.vue";
import InitNFT from "../views/InitNFT.vue";
import MyNFTs from "../views/MyNFTs.vue";
import Signin from "../views/Signin.vue";
import Signup from "../views/Signup.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/trade-nft",
    name: "trade-nft",
    component: TradeNFT,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/init-nft",
    name: "init-nft",
    component: InitNFT,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/my-nfts",
    name: "my-nfts",
    component: MyNFTs,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
    meta: {
      redirectIfAuth: true,
    },
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: {
      redirectIfAuth: true,
    },
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
