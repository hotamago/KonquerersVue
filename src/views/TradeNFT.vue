<script>
import ArgonButton from "@/components/ArgonButton.vue";
import { web3, BN } from "@project-serum/anchor";
import solanaConstant from "@/constant/solana";

export default {
  components: {
    ArgonButton,
  },
  data() {
    return {
      nfts: [
        {
          id: 1,
          id_user: 1,
          public_key: "2mjkSYkFx6EvskzSEtKxcL7UShxm1nBRt5jjNHGRgmhL",
          info_short: {
            name: "NFT 1",
            description: "Description 1",
            carbon: 100,
            price: 100,
          }
        },
        {
          id: 2,
          id_user: 2,
          public_key: "2mjkSYkFx6EvskzSEtKxcL7UShxm1nBRt5jjNHGRgmhL",
          info_short: {
            name: "NFT 2",
            description: "Description 2",
            carbon: 200,
            price: 200,
          }
        },
        {
          id: 3,
          id_user: 3,
          public_key: "2mjkSYkFx6EvskzSEtKxcL7UShxm1nBRt5jjNHGRgmhL",
          info_short: {
            name: "NFT 3",
            description: "Description 3",
            carbon: 300,
            price: 300,
          }
        },
        {
          id: 4,
          id_user: 4,
          public_key: "2mjkSYkFx6EvskzSEtKxcL7UShxm1nBRt5jjNHGRgmhL",
          info_short: {
            name: "NFT 4",
            description: "Description 4",
            carbon: 400,
            price: 400,
          }
        }
      ],
      isShow: true,
      view_nft: {
        index: -1,
        data: {
          id: 1,
          id_user: 1,
          public_key: "2mjkSYkFx6EvskzSEtKxcL7UShxm1nBRt5jjNHGRgmhL",
          info_short: {
            name: "NFT 1",
            description: "Description 1",
            carbon: 100,
            price: 100,
          }
        },
        onchain: {
          owner: "2mjkSYkFx6EvskzSEtKxcL7UShxm1nBRt5jjNHGRgmhL",
          no: "d0-xd83ud0-rfdf",
          url: "https://example.com",
          carbon: 123,
          price: 1203,
        },
        owner: {
          id: 1,
          public_key: "2mjkSYkFx6EvskzSEtKxcL7UShxm1nBRt5jjNHGRgmhL",
          info: {
            name: "hotavn",
            phone_number: "09847383824",
            address: "Hanoi, Vietnam",
            bio: "best company",
          },
        }
      }
    };
  },
  async mounted() {
    this.getNFTs();
    // console.log(new web3.PublicKey("2mjkSYkFx6EvskzSEtKxcL7UShxm1nBRt5jjNHGRgmhL"))
    // console.info(await this.$useAnchor().program.value.account.certificate.fetch(new web3.PublicKey("2mjkSYkFx6EvskzSEtKxcL7UShxm1nBRt5jjNHGRgmhL")));
    // console.log(this.$useAnchor());
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
    strDecodeUTF16(buf) {
      return String.fromCharCode.apply(null, new Uint16Array(buf));
    },
    getNFTs() {
      if (this.$loading.active) return;
      this.$loading.show();
      this.$axiosS.post("trades/get", {}).then((data) => {
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
    async buyItem(index) {
      if (this.$loading.active) return;
      this.$loading.show();
      let item = this.nfts[index];
      // Check if user is buying his own NFT
      if (this.$store.state.accountInfo.id == item.id_user) {
        this.$toast.open({
          message: "You can't buy your own NFT",
          type: "error",
        });
        this.$loading.hide();
        return;
      }
      // Get item info
      const itemOnChain = await this.$useAnchor().program.value.account.certificate.fetch(new web3.PublicKey(item.public_key));

      // Check if user has enough balance
      const balance = await this.$useAnchor().connection.getBalance(this.$useAnchor().wallet.value.publicKey);
      if (balance < item.info_short.price) {
        this.$toast.open({
          message: "You don't have enough balance",
          type: "error",
        });
        this.$loading.hide();
        return;
      }
      // Buy NFT
      try {
        const walletPublicKey = this.$useAnchor().wallet.value.publicKey;
        const dataCertOnChain = await this.$pgAnchor().methods.tradeCertificate().accounts({
          "payer": walletPublicKey,
          "oldOwner": itemOnChain.owner,
          "newOwner": walletPublicKey,
          "certificate": new web3.PublicKey(item.public_key),
          "systemProgram": web3.SystemProgram.programId,
        }).rpc();
        this.$toast.open({
          message: "NFT bought successfully",
          type: "success",
        });
        // Send request to server
        await this.$axios.post(`/trades/buy/${item.id}`, {});
        // Notify
        this.$toast.open({
          message: "NFT bought successfully",
          type: "success",
        });
      } catch (error) {
        this.$toast.open({
          message: "Failed to buy NFT: " + error,
          type: "error",
        });
      } finally {
        this.$loading.hide();
      }
    },
    getImage(index) {
      if (index < 0) index += 5;
      index = index % 5;
      return require(`@/assets/img/trade/demo/${index}.png`);
    },
    
    async getDataOnChain(index) {
      const item = await this.$useAnchor().program.value.account.certificate.fetch(new web3.PublicKey(this.nfts[index].public_key));
      console.log(item);
      item.no = this.strDecodeUTF16(item.no);
      item.url = this.strDecodeUTF16(item.url);
      return item;
    },
    async getDataOwner(index) {
      return (await this.$axiosS.post("users/get", { id: this.nfts[index].id_user }))[0];
    },
    async onViewNFT(index) {
      if (this.$loading.active) return;
      this.$loading.show();

      try {
        this.view_nft.index = index;
        this.view_nft.data = this.nfts[index];
        this.view_nft.onchain = await this.getDataOnChain(index);
        this.view_nft.owner = await this.getDataOwner(index);
        this.view_nft.isShow = true;
      } catch (error) {
        this.$toast.open({
          message: "Failed to get NFT data: " + error,
          type: "error",
        });
      } finally {
        this.$loading.hide();
      }
    },
    onCancelView() {
      this.view_nft.index = -1;
      this.view_nft.isShow = false;
    },
  },
  computed: {
    solanaConstant() {
      return solanaConstant;
    },
    web3() {
      return web3;
    },
  },
};
//:href="`https://explorer.solana.com/address/${items.public_key}?cluster=${solanaConstant.network}`"
</script>
<template>
  <div class="py-4 container-fluid mt-3" v-show="view_nft.isShow" style="
  border-bottom-color: rgb(113 136 133 / 65%);
  border-bottom-style: groove;
">
    <div class="row">
      <div class="col-lg-4 col-12" style="
      justify-content: center;
      display: flex;
  ">
        <div class="ko-card-bg" :style="{ 'background-image': `url('${getImage(view_nft.index)}')` }" style="
        width: 100%;
        min-height: 25em;
        border-radius: 1em;
        "></div>
      </div>
      <div class="col-lg-8 col-12">
        <div class="border-radius-lg">
          <div class="row">
            <h4>@{{ view_nft.owner.info.name }}</h4>
            <h2 class="ko-text">{{ view_nft.data.info_short.name }}</h2>
            <div class="d-flex" style="font-size: x-large;">
              <div class="mx-3"><i class="bi bi-eye"></i> {{ 9999 }}</div>
              <div class="mx-3"><i class="bi bi-heart"></i> {{ 9999 }}</div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="p-5 bg-white border-radius-lg d-flex"
              style="min-height: 16em;display: flex;flex-direction: column;justify-content: space-between;">
              <div class="row">
                <h4>Current price</h4>
                <h2 class="ko-text">
                  {{ view_nft.onchain.price / web3.LAMPORTS_PER_SOL }} SOL
                  <span class="text-dark" style="font-size: large;">
                    / {{ view_nft.onchain.carbon }} ton CO2
                  </span>
                </h2>
              </div>
              <div class="row mt-2">
                <div class="col-lg-6 col-12">
                  <argon-button class="ko-button-buy mx-2 w-100" variant="gradient" color="white" size="md"
                    @click="buyItem(index)" type="button">
                    <div class="ko-show w-100">
                      <span class="me-2">{{ view_nft.onchain.price / web3.LAMPORTS_PER_SOL }}</span>
                      <img :src="require('@/assets/img/solana-sol-logo.png')" alt="coin" class="icon" />
                    </div>
                    <div class="ko-hover w-100">
                      Buy now
                    </div>
                  </argon-button>
                </div>
                <div class="col-lg-6 col-12">
                  <argon-button class="mx-2 w-100" variant="gradient" color="warning" size="md" @click="onCancelView()"
                    type="button">
                    Cancel
                  </argon-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-lg-4 col-12">
        <h3 class="ko-text">Description</h3>
        <p>{{ view_nft.data.info_short.description }}</p>
      </div>
      <div class="col-lg-8 col-12">
        <div class="p-5 bg-white border-radius-lg">
          <div class="row text-dark">
            <div class="col-lg-6 col-12">
              <p><span style="font-weight: 700;">Name: </span>{{ view_nft.owner.info.name }}</p>
              <p><span style="font-weight: 700;">Phone number: </span>{{ view_nft.owner.info.phone_number }}</p>
              <p><span style="font-weight: 700;">Address: </span>{{ view_nft.owner.info.address }}</p>
              <p><span style="font-weight: 700;">Bio: </span>{{ view_nft.owner.info.bio }}</p>
            </div>
            <div class="col-lg-6 col-12">
              <p><span style="font-weight: 700;">Owner: </span>{{ view_nft.onchain.owner }}</p>
              <p><span style="font-weight: 700;">No ID: </span>{{ view_nft.onchain.no }}</p>
              <p><span style="font-weight: 700;">URL: </span><a :href="view_nft.onchain.url" target="_blank">{{
                view_nft.onchain.url }}</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="py-4 container-fluid">
    <div class="row" style="justify-content: space-evenly;">
      <div class="col-lg-3 col-md-4 col-sm-6 col-12 mb-3" v-for="items, index in nfts" :key="index">
        <div class="card ko-card ko-card-bg" :style="{ 'background-image': `url('${getImage(index)}')` }"
          style="border-radius: 1em;">
          <div class="px-2 pt-2 d-flex justify-content-between align-items-start align-content-center">
            <div class="ko-div btn"><span>{{ items.info_short.carbon }}</span> ton CO2</div>
            <button class="ko-button-explore card-link" target="_blank" @click="onViewNFT(index)"><i
                class="bi bi-arrow-up-right"></i></button>
          </div>
          <div class="ko-card-bottom">
            <div class="ko-blur-bg">
              <h4 class="text-white text-center">{{ items.info_short.name }}</h4>
              <div class="ko-card-bottom-content w-100">
                <argon-button class="ko-button-buy" variant="gradient" color="white" size="md" @click="buyItem(index)"
                  type="button">
                  <div class="ko-show w-100">
                    <span class="me-2">{{ items.info_short.price / web3.LAMPORTS_PER_SOL }}</span>
                    <img :src="require('@/assets/img/solana-sol-logo.png')" alt="coin" class="icon" />
                  </div>
                  <div class="ko-hover w-100">
                    Buy now
                  </div>
                </argon-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.ko-card-bg {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.ko-card {
  width: 100%;
  min-height: 20em;
}

.ko-blur-bg {
  width: 100%;
  backdrop-filter: blur(10px);
  padding-bottom: 1em;
  padding-top: 1em;
  border-radius: 0.5em;
}

.ko-card-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  flex: 1 1 auto;
}

.ko-card-bottom-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.ko-button-explore {
  background: #00000040;
  color: white;
  padding: 0.4em;
  border-radius: 0.3em;
  border-width: 0;
}

.ko-button-buy {
  min-width: 15em;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white !important;
  transition: background-color 0.3s ease, color 0.3s ease !important;
}

/* Hover button then change content inside and change color with transcaction */
.ko-button-buy:hover {
  background: #718885 !important;
  color: white !important;
}

.ko-show {
  display: flex;
  align-items: center;
  justify-content: center;
}

.ko-hover {
  display: none;
}

.ko-button-buy:hover .ko-show {
  display: none;
  transition: opacity 0.3s ease;
}

.ko-button-buy:hover .ko-hover {
  display: block;
  transition: opacity 0.3s ease;
}
</style>
