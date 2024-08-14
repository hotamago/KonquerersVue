<script>
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { web3, BN } from "@project-serum/anchor";
import solanaConstant from "@/constant/solana";

export default {
  components: {
    ArgonInput,
    ArgonSwitch,
    ArgonButton,
  },
  data() {
    return {
      init_nft: {
        public_key: "",
        info_short: {
          no_id: "",
          url: "",
          name: "",
          description: "",
          states: {
            is_verified: false,
            is_active: true,
            is_hidden: false,
          },
          carbon: 0,
          price: 0,
        },
      },
      tx_id: "",
    };
  },
  async mounted() {
  },
  methods: {
    strEncodeUTF16(str, len) {
      let buf = new ArrayBuffer(len * 2);
      let bufView = new Uint16Array(buf);
      for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      return bufView;
    },
    hash256_get_16bytes(str) {
      return window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(str)).then((hash) => {
        return new Uint8Array(hash).slice(0, 16);
      });
    },
    convert_bytes_to_u128(bytes) {
      let val = 0n;
      for (let i = 0; i < bytes.length; i++) {
        // eslint-disable-next-line no-undef
        val = val * 256n + BigInt(bytes[i]);
      }
      return val;
    },
    async onSubmit() {
      if (this.$loading.active) return;
      if (this.error_no_id){
        this.$toast.open({
          message: "No ID is required and must not exceed 32 characters",
          type: "error",
        });
        return;
      }
      this.$loading.show();
      this.tx_id = "";

      try {
        // Create NFT by anchor
        const hash256 = Buffer.from(await this.hash256_get_16bytes(this.init_nft.info_short.no_id));
        const hash256R = Buffer.from(await this.hash256_get_16bytes(this.init_nft.info_short.no_id)).reverse();
        const walletPublicKey = this.$useAnchor().wallet.value.publicKey;
        const item_publicKey = web3.PublicKey.findProgramAddressSync(
            [walletPublicKey.toBuffer(), Buffer.from("certificate"), hash256R],
            this.$pgAnchor()._programId,
          )[0];
        const dataCertOnChain = await this.$pgAnchor().methods.initCertificate(
          new BN(hash256),
          this.strEncodeUTF16(this.init_nft.info_short.no_id, 32),
          this.strEncodeUTF16(this.init_nft.info_short.url, 128),
          new BN(this.init_nft.info_short.carbon),
          new BN(this.init_nft.info_short.price),
        ).accounts({
          "payer": walletPublicKey,
          "creator": walletPublicKey,
          "certificate": item_publicKey,
          "rent": web3.SYSVAR_RENT_PUBKEY,
          "systemProgram": web3.SystemProgram.programId,
        }).rpc();
        this.$toast.open({
          message: "NFT created successfully",
          type: "success",
        });
        this.tx_id = dataCertOnChain;

        // Update public key
        this.init_nft.public_key = item_publicKey.toBase58();

        // Send request to server
        await this.$axios.post("/trades/create", this.init_nft);

        // Notify
        this.$toast.open({
          message: "NFT created successfully",
          type: "success",
        });
      } catch (error) {
        this.$toast.open({
          message: "Failed to create NFT: " + error,
          type: "error",
        });
      } finally {
        this.$loading.hide();
      }
    },
  },
  computed: {
    error_no_id() {
      if (this.init_nft.info_short.no_id === "") {
        return true;
      }
      // Size not exceed 32 characters
      if (this.init_nft.info_short.no_id.length > 32) {
        return true;
      }
      return false;
    },
    solanaConstant() {
      return solanaConstant;
    }
  },
};
</script>
<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Create NFT</h6>
            <p v-if="tx_id != ''">Transaction id: <a :href="`https://explorer.solana.com/tx/${tx_id}?cluster=${solanaConstant.network}`" target="_blank">{{ tx_id }}</a></p>
          </div>
          <div class="card-body px-4 pt-0 pb-2">
            <form @submit.prevent="onSubmit">
              <div class="row">
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="form-group mb-3">
                    <label for="name">No ID</label>
                    <argon-input id="name" type="text" placeholder="No ID" aria-label="No ID"
                      v-model="init_nft.info_short.no_id" is-required="true" :error="error_no_id" />
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="form-group mb-3">
                    <label for="public_key">URL</label>
                    <argon-input id="public_key" type="text" placeholder="URL" aria-label="URL"
                      v-model="init_nft.info_short.url" is-required="true" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="form-group mb-3">
                    <label for="name">Name</label>
                    <argon-input id="name" type="text" placeholder="Name" aria-label="Name"
                      v-model="init_nft.info_short.name" is-required="true" />
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="form-group mb-3">
                    <label for="public_key">Public Key</label>
                    <argon-input id="public_key" type="text" placeholder="Public Key" aria-label="Public Key"
                      v-model="init_nft.public_key" is-required="true" is-disabled="true" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="form-group mb-3">
                    <label for="description">Description</label>
                    <argon-input id="description" type="text" placeholder="Description" aria-label="Description"
                      v-model="init_nft.info_short.description" is-required="true" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="form-group mb-3">
                    <label for="carbon">Carbon</label>
                    <argon-input id="carbon" type="number" placeholder="Carbon" aria-label="Carbon"
                      v-model="init_nft.info_short.carbon" is-required="true" />
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="form-group mb-3">
                    <label for="price">Price (SOL)</label>
                    <argon-input id="price" type="number" placeholder="Price" aria-label="Price"
                      v-model="init_nft.info_short.price" is-required="true" />
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="is_hidden">Is Hidden</label>
                  <ArgonSwitch id="is_hidden" v-model="init_nft.info_short.states.is_hidden" />
                </div>
                <div class="text-center">
                  <argon-button class="mt-4" variant="gradient" color="success" size="lg">Create</argon-button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
