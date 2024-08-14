import { createApp, nextTick } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
// Main styles
import "./assets/css/main.css";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ArgonDashboard from "./argon-dashboard";
// Solana
import SolanaWallets from "solana-wallets-vue";
// You can either import the default styles or create your own.
import "solana-wallets-vue/styles.css";

// Toast notification
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";
// Import vue-cookies
import VueCookies from "vue-cookies";
// Import axios
import AxiosPlugin from "./plugin/axios";
// Import common functions
import { l, followStruct } from "./plugin/common";
// Loading overlay
import { LoadingPlugin } from "./plugin/loading";
// Auth
import AuthPlugin from "./plugin/auth";
// Anchor
import AnchorPlugin from "./plugin/anchor";
import { useAnchorWallet } from "solana-wallets-vue";

const app = createApp(App);
app.use(store);
app.use(ArgonDashboard);

// Setting cookies
app.use(VueCookies, {
  expireTimes: "7d",
});
// Provide 'IAxiosUser' and 'IAxiosServer' to all components
app.use(AxiosPlugin);
// Auth
app.use(AuthPlugin);
// Anchor
app.use(AnchorPlugin);

// Provide common functions
app.config.globalProperties.$l = l;
app.config.globalProperties.$followStruct = followStruct;

// Setup loading overlay
app.use(LoadingPlugin);
const loading = app.config.globalProperties.$loading;
const isLogined = app.config.globalProperties.$isLogined;
const resetLogined = app.config.globalProperties.$resetLogined;

// Check if user is logined
router.beforeEach(async (to, from) => {
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.requiresAuth && !(await isLogined())) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: "/signin",
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    };
  } else if (to.meta.redirectIfAuth && (await isLogined())) {
    return {
      path: to.params.redirect || "/dashboard",
    };
  }
  nextTick();
});
// Check wallet connection
router.afterEach((to, from) => {
  const wallet = useAnchorWallet();
  // console.log(wallet);
  if (to.meta.requiresAuth && !wallet.value) {
    resetLogined();
    return {
      path: "/signin",
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    }
  }
  nextTick();
});
// Loading overlay
router.beforeResolve((to, from) => {
  loading.show();
  nextTick();
});
router.afterEach((to, from) => {
  loading.hide();
  nextTick();
});
app.use(router);

// Wallets
// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

import {
  PhantomWalletAdapter,
} from "@solana/wallet-adapter-wallets";

const walletOptions = {
  wallets: [
    new PhantomWalletAdapter(),
  ],
  autoConnect: true,
};

app.use(SolanaWallets, walletOptions)

// Toast notification
app.use(ToastPlugin, {
  duration: 10000,
});

// Init app
app.mount("#app");