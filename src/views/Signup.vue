<script setup>
import { onBeforeUnmount, onBeforeMount } from "vue";
import { useStore } from "vuex";

import ArgonInput from "@/components/ArgonInput.vue";
import ArgonCheckbox from "@/components/ArgonCheckbox.vue";
import ArgonButton from "@/components/ArgonButton.vue";
const body = document.getElementsByTagName("body")[0];

const store = useStore();
onBeforeMount(() => {
  store.state.hideConfigButton = true;
  store.state.showNavbar = false;
  store.state.showSidenav = false;
  store.state.showFooter = false;
  body.classList.remove("bg-gray-100");
});
onBeforeUnmount(() => {
  store.state.hideConfigButton = false;
  store.state.showNavbar = true;
  store.state.showSidenav = true;
  store.state.showFooter = true;
  body.classList.add("bg-gray-100");
});
</script>
<script>
import { WalletMultiButton, useAnchorWallet } from "solana-wallets-vue";
// import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
// import { AnchorProvider, Program } from "@project-serum/anchor";
// import idl from "@/idl.json";
// import { publicKey } from "@project-serum/anchor/dist/cjs/utils";

export default {
  components: {
    WalletMultiButton,
  },
  data() {
    return {
      wallet: null,
      userAccount: {
        public_key: "",
        email: "",
        password: "",
        info: {
          name: "",
          phone_number: "",
          address: "",
          bio: "",
        },
      },
      confirmPassword: "",
    };
  },
  beforeMount() {
    this.wallet = useAnchorWallet();
  },
  watch: {
    wallet: {
      handler(wallet) {
        if (wallet) {
          this.userAccount.public_key = wallet.publicKey.toBase58();
        } else {
          this.userAccount.public_key = "";
        }
      },
      deep: true,
    },
  },
  methods: {
    onSignup() {
      if (this.$loading.active) return;
      // Confirm password
      if (this.userAccount.password !== this.confirmPassword) {
        this.$toast.open({
          message: "Password and confirm password do not match",
          type: "error",
        });
        return;
      }
      // Check empty fields
      for (let key in this.userAccount) {
        if (this.userAccount[key] === "") {
          this.$toast.open({
            message: "Please fill in all fields",
            type: "error",
          });
          return;
        }
      }
      // Set isSending to true to prevent multiple requests
      this.$loading.show();
      // Send request to server
      this.$axiosS.post("/users/register", this.userAccount).then((token) => {
        // Save token to cookies
        this.$cookies.set("x-token", token);
        this.$toast.open({
          message: "Sign up successfully",
          type: "success",
        });
        this.$router.push("/");
      }).catch((error) => {
        this.$toast.open({
          message: "Failed to sign up: " + error,
          type: "error",
        });
      }).finally(() => {
        this.$loading.hide();
      });
    },
  },
};
</script>
<template>
  <!-- <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar isBtn="bg-gradient-light" />
      </div>
    </div>
  </div> -->
  <main class="main-content mt-0">
    <div class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg" style="
        background-image: url(&quot;https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg&quot;);
        background-position: top;
      ">
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5 text-center mx-auto">
            <h1 class="text-white mb-2 mt-5">Welcome!</h1>
            <p class="text-lead text-white">
              Become a member and join our community of professionals!
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center w-100">
        <div class="col-xl-8 col-lg-8 col-md-10 mx-auto">
          <div class="card z-index-0">
            <div class="card-header text-center pt-4">
              <h5>Register with</h5>
            </div>
            <div class="card-body">
              <form role="form" @submit.prevent="onSignup">
                <div class="d-flex">
                  <div class="me-2"><wallet-multi-button
                      v-model:publicKeyBase58="userAccount.public_key"></wallet-multi-button></div>
                  <argon-input class="w-50" id="publicKey" type="text" placeholder="Public Key" aria-label="Public Key"
                    :modelValue="userAccount.public_key" is-required="true" is-disabled="true" />
                </div>
                <argon-input id="email" type="email" placeholder="Email" aria-label="Email" class="me-2"
                  v-model="userAccount.email" is-required="true" />
                <argon-input id="password" type="password" placeholder="Password" aria-label="Password"
                  v-model="userAccount.password" is-required="true" />
                <argon-input id="confirmPassword" type="password" placeholder="Confirm Password"
                  aria-label="Confirm Password" v-model="confirmPassword" is-required="true" />
                <div class="d-flex">
                  <argon-input class="me-2 w-50" id="name" type="text" placeholder="Name" aria-label="Name"
                    v-model="userAccount.info.name" is-required="true" />
                  <argon-input class="w-50" id="phoneNumber" type="text" placeholder="Phone Number"
                    aria-label="Phone Number" v-model="userAccount.info.phone_number" is-required="true" />
                </div>
                <div class="d-flex">
                  <argon-input class="me-2 w-50" id="address" type="text" placeholder="Address" aria-label="Address"
                    v-model="userAccount.info.address" is-required="true" />
                  <argon-input id="bio" class="w-50" type="text" placeholder="Bio" aria-label="Bio"
                    v-model="userAccount.info.bio" />
                </div>

                <div class="text-center">
                  <argon-button fullWidth color="dark" variant="gradient" class="my-4 mb-2" @click="onSignup">Sign up</argon-button>
                </div>
                <p class="text-sm mt-3 mb-0">
                  Already have an account?
                  <a href="javascript:;" class="text-dark font-weight-bolder" @click="$router.push('/signin')">Sign
                    in</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <!-- <app-footer /> -->
</template>
