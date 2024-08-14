<script setup>
import { onBeforeUnmount, onBeforeMount } from "vue";
import { useStore } from "vuex";
// import Navbar from "@/examples/PageLayout/Navbar.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
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

export default {
  components: {
    WalletMultiButton,
  },
  data() {
    return {
      userAccount: {
        public_key: "",
        password: "",
      },
      wallet: null,
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
    onSignIn() {
      if (this.$loading.active) {
        return;
      }
      // Check if public_key and password are empty
      if (this.userAccount.public_key === "" || this.userAccount.password === "") {
        this.$toast.open({
          message: "Please enter public_key and password",
          type: "error",
        });
        return;
      } else {
        // Set isSending to true to prevent multiple requests
        this.$loading.show();
        // Send request to server
        this.$axiosS.post("/users/login", this.userAccount).then((token) => {
          // Save token to cookies
          this.$cookies.set("x-token", token);
          this.$toast.open({
            message: "Sign in successfully",
            type: "success",
          });
          let redirect = this.$router.currentRoute.value.query.redirect
          this.$router.push(redirect ? redirect : "/");
        }).catch((error) => {
          this.$toast.open({
            message: "Failed to sign in: " + error,
            type: "error",
          });
        }).finally(() => {
          this.$loading.hide();
        });
      }
    },
  },
};
</script>
<template>
  <!-- <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar
          isBlur="blur  border-radius-lg my-3 py-2 start-0 end-0 mx-4 shadow"
          v-bind:darkMode="true"
          isBtn="bg-gradient-success"
        />
      </div>
    </div>
  </div> -->
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div
              class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0"
            >
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Sign In</h4>
                  <p class="mb-0">Enter your email and password to sign in</p>
                </div>
                <div class="card-body">
                  <div class="d-flex">
                    <div class="me-2"><wallet-multi-button
                        v-model:publicKeyBase58="userAccount.public_key"></wallet-multi-button></div>
                    <argon-input id="publicKey" type="text" placeholder="Public Key" aria-label="Public Key"
                      :modelValue="userAccount.public_key" is-required="true" is-disabled="true" />
                  </div>
                  <form role="form" @submit.prevent="onSignIn">
                    <div class="mb-3">
                      <argon-input
                        id="password"
                        type="password"
                        placeholder="Password"
                        name="password"
                        size="lg"
                        v-model="userAccount.password"
                      />
                    </div>
                    <!-- <argon-switch id="rememberMe" name="remember-me"
                      >Remember me</argon-switch
                    > -->

                    <div class="text-center">
                      <argon-button
                        class="mt-4"
                        variant="gradient"
                        color="success"
                        fullWidth
                        size="lg"
                        >Sign in</argon-button
                      >
                    </div>
                    <div class="text-center">
                      <argon-button
                        type="button"
                        class="mt-4"
                        variant="gradient"
                        color="info"
                        fullWidth
                        size="lg"
                        @click="() => $router.push('/signup')"
                        >Sign up</argon-button
                      >
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column"
            >
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                style="
                  background-image: url(&quot;https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg&quot;);
                  background-size: cover;
                "
              >
                <span class="mask bg-gradient-success opacity-6"></span>
                <h4
                  class="mt-5 text-white font-weight-bolder position-relative"
                >
                  "Kiến thức là giới hạn, còn trí tưởng tượng là vô biên" - Albert
                </h4>
                <p class="text-white position-relative">
                  Konquerers là sàn giao dịch tín chỉ carbon trên nền tảng Solana blockchain số 1 Việt Nam!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
