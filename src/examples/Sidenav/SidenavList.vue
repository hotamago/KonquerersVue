<script setup>
import SidenavItem from "./SidenavItem.vue";
</script>
<script>
import { web3 } from "@project-serum/anchor";
export default {
  components: {
    SidenavItem,
  },
  methods: {
    logout() {
      this.$resetLogined();
      this.$router.push("/signin");
    },
    airdropSol(){
      this.$useAnchor().connection.requestAirdrop(this.$useAnchor().wallet.value.publicKey, 5*web3.LAMPORTS_PER_SOL).then((res) => {
        this.$toast.open({
          message: "Airdrop successfully",
          type: "success",
        });
      }).catch((err) => {
        this.$toast.open({
          message: "Failed to airdrop: " + err,
          type: "error",
        });
      });
    },
  },
};
</script>
<template>
  <div class="collapse navbar-collapse w-auto h-auto h-100" id="sidenav-collapse-main">
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-item to="/trade-nft" navText="Trade NFT">
          <template v-slot:icon>
            <i class="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item to="/init-nft" navText="Init NFT">
          <template v-slot:icon>
            <i class="ni ni-credit-card text-success text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item to="/my-nfts" navText="My NFTs">
          <template v-slot:icon>
            <i class="ni ni-bag-17 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <div class="nav-link" @click="airdropSol()">
          <div class="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center">
            <i class="ni ni-spaceship text-info text-sm opacity-10"></i>
          </div>
          <span class="nav-link-text">Airdrop SOL</span>
        </div>
      </li>

      <li class="nav-item">
        <sidenav-item to="/signin" navText="Logout" @click="logout">
          <template v-slot:icon>
            <i class="ni ni-button-power text-danger text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
    </ul>
  </div>
</template>
