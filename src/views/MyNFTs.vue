<script>
import ArgonButton from "@/components/ArgonButton.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import { web3, BN } from "@project-serum/anchor";
import solanaConstant from "@/constant/solana";

export default {
  components: {
    ArgonButton,
    ArgonSwitch,
    ArgonInput,
  },
  data() {
    return {
      nfts: [],
      tx_id: "",
      edit_nft: {
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
      edit_modal: {
        show: false,
        index: -1,
      },
    };
  },
  async mounted() {
    this.getNFTs();
  },
  methods: {
    getNFTs() {
      if (this.$loading.active) return;
      this.$loading.show();
      this.$axios.post("trades/get", {}).then((data) => {
        this.nfts = data;
      }).catch((error) => {
        this.$toast.open({
          message: "Failed to get NFTS: " + error,
          type: "error",
        });
      }).finally(() => {
        this.$loading.hide();
      });
    },
    editItem(index) {
      let item = this.nfts[index];
      this.edit_nft = JSON.parse(JSON.stringify(item));
      this.edit_modal.index = index;
      this.edit_modal.show = true;
    },
    async onSubmit() {
      if (this.$loading.active) return;
      this.$loading.show();

      try {
        // Get item
        const item = this.edit_nft;

        // Public wallet key
        const walletPublicKey = this.$useAnchor().wallet.value.publicKey;

        // Check if price is changed
        if (this.edit_nft.info_short.price != this.nfts[this.edit_modal.index].info_short.price) {
          // Update price on chain
          const itemOnChain = await this.$useAnchor().program.value.account.certificate.fetch(new web3.PublicKey(this.edit_nft.public_key));
          this.tx_id = await this.$pgAnchor().methods.updatePriceCertificate(
            new BN(this.edit_nft.info_short.price),
          ).accounts({
            "payer": this.$useAnchor().wallet.value.publicKey,
            "owner": walletPublicKey,
            "certificate": new web3.PublicKey(this.edit_nft.public_key),
          }).rpc();
        }

        // Edit NFT on server
        await this.$axios.post(`trades/update/${item.id}`, this.edit_nft);

        // Notify
        this.$toast.open({
          message: "NFT edited successfully",
          type: "success",
        });
        this.getNFTs();
        this.edit_modal.show = false;
      } catch (error) {
        this.$toast.open({
          message: "Failed to edit NFT: " + error,
          type: "error",
        });
      } finally {
        this.$loading.hide();
      }
    },
  },
  computed: {
    solanaConstant() {
      return solanaConstant;
    },
  },
};
</script>
<template>
  <div class="py-4 container-fluid" v-if="edit_modal.show">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Create NFT</h6>
            <p v-if="tx_id != ''">Transaction id: <a
                :href="`https://explorer.solana.com/tx/${tx_id}?cluster=${solanaConstant.network}`" target="_blank">{{
                tx_id }}</a></p>
          </div>
          <div class="card-body px-4 pt-0 pb-2">
            <form @submit.prevent="onSubmit">
              <div class="row">
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="form-group mb-3">
                    <label for="name">No ID</label>
                    <argon-input id="name" type="text" placeholder="No ID" aria-label="No ID"
                      v-model="edit_nft.info_short.no_id" is-required="true" is-disabled="true" />
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="form-group mb-3">
                    <label for="public_key">URL</label>
                    <argon-input id="public_key" type="text" placeholder="URL" aria-label="URL"
                      v-model="edit_nft.info_short.url" is-required="true" is-disabled="true" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="form-group mb-3">
                    <label for="name">Name</label>
                    <argon-input id="name" type="text" placeholder="Name" aria-label="Name"
                      v-model="edit_nft.info_short.name" is-required="true" />
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="form-group mb-3">
                    <label for="public_key">Public Key</label>
                    <argon-input id="public_key" type="text" placeholder="Public Key" aria-label="Public Key"
                      v-model="edit_nft.public_key" is-required="true" is-disabled="true" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="form-group mb-3">
                    <label for="description">Description</label>
                    <argon-input id="description" type="text" placeholder="Description" aria-label="Description"
                      v-model="edit_nft.info_short.description" is-required="true" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="form-group mb-3">
                    <label for="carbon">Carbon</label>
                    <argon-input id="carbon" type="number" placeholder="Carbon" aria-label="Carbon"
                      v-model="edit_nft.info_short.carbon" is-required="true" is-disabled="true" />
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="form-group mb-3">
                    <label for="price">Price (SOL)</label>
                    <argon-input id="price" type="number" placeholder="Price" aria-label="Price"
                      v-model="edit_nft.info_short.price" is-required="true" />
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="is_hidden">Is Hidden</label>
                  <ArgonSwitch id="is_hidden" v-model="edit_nft.info_short.states.is_hidden" />
                </div>
                <div class="text-center">
                  <argon-button class="mt-4 me-2" variant="gradient" color="success" size="lg">Confirm</argon-button>
                  <argon-button class="mt-4" variant="gradient" color="danger" size="lg"
                    @click="edit_modal.show = false">Cancel</argon-button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-4 mb-3" v-for="items, index in nfts" :key="index">
        <div class="card" style="width: 100%;">
          <div class="card-body">
            <h5 class="card-title">{{ items.info_short.name }}</h5>
            <p class="card-text">{{ items.info_short.description }}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Carbon: <span class="badge badge-pill badge-dark">{{ items.info_short.carbon
                }}</span></li>
            <li class="list-group-item">Price: <span class="badge badge-pill badge-info">{{ items.info_short.price
                }}</span></li>
          </ul>
          <div class="card-body">
            <argon-button class="me-3" variant="gradient" color="warning" size="md"
              @click="editItem(index)">Edit</argon-button>
            <a :href="`https://explorer.solana.com/address/${items.public_key}?cluster=${solanaConstant.network}`"
              class="card-link" target="_blank">Explore</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
