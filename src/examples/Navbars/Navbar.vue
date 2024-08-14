<script setup>
import { useRoute } from "vue-router";

const getRoute = () => {
  const route = useRoute();
  const routeArr = route.path.split("/");
  return routeArr[1];
}
</script>
<script>
import { WalletMultiButton } from "solana-wallets-vue";

export default {
  components: {
    WalletMultiButton,
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    })
  },
  data() {
    return {
      navCollapse: false,
      windowWidth: window.innerWidth,
      ListItemSideNav: [
        {
          to: "/home",
          text: "Home",
        },
        {
          to: "/trade-nft",
          text: "Marketplace",
        },
        {
          to: "/about",
          text: "About",
        },
      ],
    };
  },
  methods: {
    toggleCollapse() {
      this.navCollapse = !this.navCollapse;
    },
    onDisconnect() {
      this.$router.push("/signin");
    },
  },
  computed: {
    navCollapseValue() {
      return this.navCollapse || this.windowWidth >= 991.98;
    },
  },
};
// navbar-main navbar-expand-lg shadow-none
</script>
<template>
  <nav class="navbar navbar-main navbar-expand-lg shadow-none bg-gradient-white" v-bind="$attrs">
    <div class="collapse navbar-collapse">
      <div class="flex-warp d-flex justify-content-between align-items-center w-100 px-3 border-radius-xl"
        style="background-color: white;">
        <div class="navbar-logo d-flex justify-content-between">
          <img :src="require('@/assets/img/logo-ko-sm.png')" width="30px" />
          <button class="navbar-toggler" type="button" @click="toggleCollapse">
            <i class="bi bi-list"></i>
          </button>
        </div>
        <ul class="navbar-nav d-flex justify-content-between col-lg-5 col-md-7 col-12" v-if="navCollapseValue">
          <li class="nav-item d-flex justify-content-center align-items-center" v-for="item in ListItemSideNav"
            :key="item.to">
            <router-link :to="item.to" class="nav-link ko-navlink"
              :class="getRoute() === item.to.split('/')[1] ? 'active' : ''">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-dot"
                viewBox="0 0 16 16" v-if="getRoute() === item.to.split('/')[1]">
                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
              </svg>
              <span class="nav-link-text">{{ item.text }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-dot"
                viewBox="0 0 16 16" v-if="getRoute() === item.to.split('/')[1]">
                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
              </svg>
            </router-link>
          </li>
        </ul>
        <div class="navbar-left" v-if="navCollapseValue">
          <wallet-multi-button @disconnect="onDisconnect"></wallet-multi-button>
        </div>
      </div>
    </div>
  </nav>
</template>
<style>
.ko-navlink {
  font-weight: 700 !important;
  font-family: 'Open Sans' !important;
}

.nav-item .nav-link {
  color: #dcdcdc !important;
}

.nav-item .active {
  color: rgb(113 136 133) !important;
}

.nav-item .bi-dot {
  font-size: 2rem;
}

.nav-item {
  min-height: 32px;
}

.swv-button {
  background-color: #718885 !important;
  font-size: 0.9em !important;
  height: 35px !important;
  border-radius: 14px !important;
}

.navbar-toggler {
  border-color: black;
}

/* Mobile */
@media (max-width: 991.98px) {
  .navbar .navbar-nav {
    flex-direction: column !important;
  }

  .navbar .navbar-left {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 1em;
    margin-bottom: 1em;
  }

  .navbar-nav {
    flex-wrap: wrap;
  }

  .flex-warp {
    flex-wrap: wrap;
  }

  .navbar .navbar-logo {
    width: 100%;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
  }
}
</style>