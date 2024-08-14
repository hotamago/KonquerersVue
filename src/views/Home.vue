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
    store.state.showNavbar = true;
    store.state.showSidenav = false;
    store.state.showFooter = true;
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
import { UseElementVisibility } from '@vueuse/components'

export default {
    components: {
        UseElementVisibility,
    },
    methods: {
        elementInViewport(el) {
            var top = el.offsetTop;
            var left = el.offsetLeft;
            var width = el.offsetWidth;
            var height = el.offsetHeight;

            while (el.offsetParent) {
                el = el.offsetParent;
                top += el.offsetTop;
                left += el.offsetLeft;
            }

            return (
                top >= window.scrollY &&
                left >= window.scrollX &&
                (top + height) <= (window.scrollY + window.innerHeight) &&
                (left + width) <= (window.scrollX + window.innerWidth)
            );
        },
    }
};
</script>
<style>
body {
    background-color: #f2f2f2 !important;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
    transition: all 1.0s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}

.slide-fade-left-enter-active {
    transition: all 1.0s ease-out;
}

.slide-fade-left-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-left-enter-from,
.slide-fade-left-leave-to {
    transform: translateX(-20px);
    opacity: 0;
}

.slide-fade-top-enter-active {
    transition: all 1.0s ease-out;
}

.slide-fade-top-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-top-enter-from,
.slide-fade-top-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}

.slide-fade-bottom-enter-active {
    transition: all 1.0s ease-out;
}

.slide-fade-bottom-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-bottom-enter-from,
.slide-fade-bottom-leave-to {
    transform: translateY(20px);
    opacity: 0;
}


.bounce-enter-active {
    animation: bounce-in 0.5s;
}

.bounce-leave-active {
    animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.25);
    }

    100% {
        transform: scale(1);
    }
}

/* rules that target nested elements */
.nested-enter-active .inner,
.nested-leave-active .inner {
    transition: all 0.3s ease-in-out;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
    transform: translateX(30px);
    opacity: 0;
}

/* ... other necessary CSS omitted */
</style>
<template>

    <div class="container my-3 d-flex align-items-center" style="flex-direction: column">
        <div
            class="bg-white border-radius-lg d-flex flex-column justify-content-center align-items-center py-5 ko-card-top w-100">
            <div class="ko-logo-bg">
                <UseElementVisibility v-slot="{ isVisible }">
                    <Transition name="slide-fade" :duration="1800">
                        <h2 class="ko-text text-center" v-show="isVisible">DENCENTRALIZE CARBON<br>DENCENTRALIZE
                            IMPACT
                        </h2>
                    </Transition>
                </UseElementVisibility>
                <UseElementVisibility v-slot="{ isVisible }">
                    <Transition name="slide-fade" :duration="1800">
                        <RouterLink to="/trade-nft" class="ko-button btn btn-lg mt-3" v-show="isVisible">Get
                            started
                        </RouterLink>
                    </Transition>
                </UseElementVisibility>
            </div>
        </div>

        <div class="border-radius-lg mt-4 py-5 ko-card-02">
            <div class="row">
                <div class="col-lg-5 col-12">
                    <div class="d-flex justify-content-left align-items-center w-100 h-100 px-5">
                        <UseElementVisibility v-slot="{ isVisible }">
                            <Transition name="slide-fade-left" :duration="1800">
                                <h2 v-if="isVisible" class="text-white" style="font-size:xxx-large;">The<br>problems
                                </h2>
                            </Transition>
                        </UseElementVisibility>
                    </div>
                </div>
                <div class="col-lg-7 col-12 px-5">
                    <UseElementVisibility v-slot="{ isVisible }">
                        <Transition name="slide-fade" :duration="1800">
                            <img v-if="isVisible" :src="require('@/assets/img/home/card-02.png')" class="img-fluid" />
                        </Transition>
                    </UseElementVisibility>
                </div>
            </div>
        </div>

        <div class="col-lg-12 col-12 mt-4 py-5">
            <UseElementVisibility v-slot="{ isVisible }">
                <Transition name="slide-fade-top" :duration="1800">
                    <h2 v-if="isVisible" class="ko-text text-center" style="font-size:xxx-large;">Our solutions</h2>
                </Transition>
            </UseElementVisibility>
            <div class="container border-radius-lg mt-4 py-5 bg-white">
                <div class="row">
                    <div class="col-lg-6 col-12">
                        <div class="d-flex align-items-start w-100 h-100 px-5"
                            style="flex-direction: column;justify-content: space-around;">
                            <UseElementVisibility v-slot="{ isVisible }">
                                <Transition name="slide-fade-left" :duration="1800">
                                    <h2 v-if="isVisible" class="ko-text" style="font-size:xxx-large;">
                                        Tokenized<br>Carbon Credit</h2>
                                </Transition>
                            </UseElementVisibility>
                            <UseElementVisibility v-slot="{ isVisible }">
                                <Transition name="slide-fade-left" :duration="1800">
                                    <p v-if="isVisible" class="mt-2">
                                        CaEx's marketplace uses blockchain technology to ensure top security and
                                        transparency.
                                        Each carbon credit is an NFT, an immutable and traceable digital asset. Every
                                        transaction is recorded on a public ledger, making data nearly impossible to
                                        alter,
                                        which builds user trust and ensures the authenticity of the carbon credits.
                                    </p>
                                </Transition>
                            </UseElementVisibility>
                            <UseElementVisibility v-slot="{ isVisible }">
                                <Transition name="slide-fade" :duration="1800">
                                    <RouterLink v-if="isVisible" to="/trade-nft"
                                        class="ko-button btn btn-lg mt-3 border-radius-xl" style="max-width: 20em;">Go
                                        to marketplace <i class="bi bi-arrow-up-right" style="font-size: 1em"></i>
                                    </RouterLink>
                                </Transition>
                            </UseElementVisibility>
                        </div>
                    </div>
                    <div class="col-lg-6 col-12 py-3 d-flex justify-content-end align-items-center">
                        <UseElementVisibility v-slot="{ isVisible }">
                            <Transition name="slide-fade" :duration="1800">
                                <img v-if="isVisible" :src="require('@/assets/img/home/card-03.png')" class="img-fluid"
                                    style="max-width: 30em;width: 100%;" />
                            </Transition>
                        </UseElementVisibility>
                    </div>
                </div>
            </div>
            <div class="container border-radius-lg mt-4 py-5 bg-white">
                <div class="row">
                    <div class="col-lg-6 col-12">
                        <div class="d-flex align-items-start w-100 h-100 px-5"
                            style="flex-direction: column;justify-content: space-around;">
                            <UseElementVisibility v-slot="{ isVisible }">
                                <Transition name="slide-fade-left" :duration="1800">
                                    <h2 v-if="isVisible" class="ko-text" style="font-size:xxx-large;">AI-Driven
                                        Support<br>and Assessment
                                    </h2>
                                </Transition>
                            </UseElementVisibility>
                            <UseElementVisibility v-slot="{ isVisible }">
                                <Transition name="slide-fade-left" :duration="1800">
                                    <p v-if="isVisible" class="mt-2">
                                        CaEx enhances user experience with advanced AI tools that assess carbon impact,
                                        recommend credits, and optimize trading strategies. These tailored insights help
                                        users
                                        make informed decisions aligned with global sustainability goals.
                                    </p>
                                </Transition>
                            </UseElementVisibility>
                            <UseElementVisibility v-slot="{ isVisible }">
                                <Transition name="slide-fade" :duration="1800">
                                    <RouterLink v-if="isVisible" to="/trade-nft"
                                        class="ko-button btn btn-lg mt-3 border-radius-xl" style="max-width: 20em;">Find
                                        out more <i class="bi bi-arrow-up-right" style="font-size: 1em"></i>
                                    </RouterLink>
                                </Transition>
                            </UseElementVisibility>
                        </div>
                    </div>
                    <div class="col-lg-6 col-12 py-3 d-flex justify-content-end align-items-center">
                        <UseElementVisibility v-slot="{ isVisible }">
                            <Transition name="slide-fade" :duration="1800">
                                <img v-if="isVisible" :src="require('@/assets/img/home/card-04.png')" class="img-fluid"
                                    style="max-width: 30em;width: 100%;" />
                            </Transition>
                        </UseElementVisibility>
                    </div>
                </div>
            </div>
        </div>

        <div class="border-radius-lg mt-4 py-5 ko-card-02 d-flex flex-column justify-content-evenly align-items-center">
            <UseElementVisibility v-slot="{ isVisible }">
                <Transition name="slide-fade-top" :duration="1800">
                    <h2 v-if="isVisible" class="text-white text-center" style="font-size:xxx-large;">Why choose CaEx ?
                    </h2>
                </Transition>
            </UseElementVisibility>
            <div class="row mx-5 mt-3">
                <div class="col-lg-3 col-12 ko-item-card-05 ko-item-card-05-s">
                    <UseElementVisibility v-slot="{ isVisible }">
                        <Transition name="slide-fade-top" :duration="1800">
                            <div v-if="isVisible"
                                class="ko-item-content-card-05 border-radius-lg py-3 px-4 d-flex flex-column justify-content-evenly align-items-start">
                                <img :src="require('@/assets/img/home/icon-card-05/01.png')"
                                    style="max-width: 3.4em;" />
                                <h4 class="text-white">Transparency</h4>
                                <p class="text-white">Increase project data transparency, leading to significant
                                    benefits
                                    for all market participants.</p>
                            </div>
                        </Transition>
                    </UseElementVisibility>
                </div>
                <div class="col-lg-3 col-12 ko-item-card-05 ko-item-card-05-e">
                    <UseElementVisibility v-slot="{ isVisible }">
                        <Transition name="slide-fade-bottom" :duration="1800">
                            <div v-if="isVisible"
                                class="ko-item-content-card-05 border-radius-lg py-3 px-4 d-flex flex-column justify-content-evenly align-items-start">
                                <img :src="require('@/assets/img/home/icon-card-05/02.png')"
                                    style="max-width: 3.4em;" />
                                <h4 class="text-white">Efficiency</h4>
                                <p class="text-white">By streamlining these processes with blockchain, you can complete
                                    transactions faster and more efficiently.</p>
                            </div>

                        </Transition>
                    </UseElementVisibility>
                </div>
                <div class="col-lg-3 col-12 ko-item-card-05 ko-item-card-05-s">
                    <UseElementVisibility v-slot="{ isVisible }">
                        <Transition name="slide-fade-top" :duration="1800">
                            <div v-if="isVisible"
                                class="ko-item-content-card-05 border-radius-lg py-3 px-4 d-flex flex-column justify-content-evenly align-items-start">
                                <img :src="require('@/assets/img/home/icon-card-05/03.png')"
                                    style="max-width: 3.4em;" />
                                <h4 class="text-white">Accessibility</h4>
                                <p class="text-white">Tasty design resources made with care for each pixel. NFTs and
                                    game
                                    resources.</p>
                            </div>
                        </Transition>
                    </UseElementVisibility>
                </div>
                <div class="col-lg-3 col-12 ko-item-card-05 ko-item-card-05-e">
                    <UseElementVisibility v-slot="{ isVisible }">
                        <Transition name="slide-fade-bottom" :duration="1800">
                            <div v-if="isVisible"
                                class="ko-item-content-card-05 border-radius-lg py-3 px-4 d-flex flex-column justify-content-evenly align-items-start">
                                <img :src="require('@/assets/img/home/icon-card-05/04.png')"
                                    style="max-width: 3.4em;" />
                                <h4 class="text-white">Secure</h4>
                                <p class="text-white">By creating a record that can’t be altered and is encrypted
                                    end-to-end,
                                    the blockchain helps prevent fraud and unauthorized activity.</p>
                            </div>
                        </Transition>
                    </UseElementVisibility>
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-12 col-12 mt-4 py-5">
        <UseElementVisibility v-slot="{ isVisible }">
            <Transition name="slide-fade-top" :duration="1800">
                <h2 v-if="isVisible" class="ko-text text-center" style="font-size:xxx-large;">How it work?</h2>
            </Transition>
        </UseElementVisibility>
        <div class="container border-radius-lg mt-4 py-5">
            <div class="row" style="min-height: 21em">
                <div class="col-lg-6 col-12 py-3 d-flex justify-content-center align-items-center">
                    <UseElementVisibility v-slot="{ isVisible }">
                        <Transition name="slide-fade-left" :duration="1800">
                            <img v-if="isVisible" :src="require('@/assets/img/home/card-06/01.png')" class="img-fluid"
                                style="max-height: 20em;width: 100%;" />
                        </Transition>
                    </UseElementVisibility>
                </div>
                <div class="col-lg-6 col-12">
                    <UseElementVisibility v-slot="{ isVisible }">
                        <Transition name="slide-fade" :duration="1800">
                            <div v-if="isVisible"
                                class="d-flex justify-content-start align-items-start w-100 h-100 px-5"
                                style="flex-direction: column;">
                                <h3 class="text-black">01</h3>
                                <h2 class="ko-text" style="font-size:xxx-large;">Setup and connect your wallet.</h2>
                                <p class="mt-2">
                                    Use Phantom, Metamask or any wallet to connect to multiple chains the app.
                                </p>
                                <RouterLink to="/trade-nft" class="mt-3 text-black" style="max-width: 20em;">Learn more
                                    <i class="bi bi-arrow-up-right" style="font-size: 1em"></i>
                                </RouterLink>
                            </div>
                        </Transition>
                    </UseElementVisibility>
                </div>
            </div>
            <div class="row mt-6" style="min-height: 26em">
                <div class="col-lg-6 col-12">
                    <UseElementVisibility v-slot="{ isVisible }">
                        <Transition name="slide-fade-left" :duration="1800">
                            <div v-if="isVisible"
                                class="d-flex justify-content-start align-items-start w-100 h-100 px-5"
                                style="flex-direction: column;">
                                <h3 class="text-black">02</h3>
                                <h2 class="ko-text" style="font-size:xxx-large;">Create your own<br>Carbon Credit NFT
                                </h2>
                                <p class="mt-2">
                                    Starting the production on the procedurally generated planets and the smart contract
                                    for
                                    minting.
                                </p>
                                <RouterLink to="/trade-nft" class="mt-3 text-black" style="max-width: 20em;">Learn more
                                    <i class="bi bi-arrow-up-right" style="font-size: 1em"></i>
                                </RouterLink>
                            </div>
                        </Transition>
                    </UseElementVisibility>
                </div>
                <div class="col-lg-6 col-12 py-3 d-flex justify-content-center align-items-center">
                    <UseElementVisibility v-slot="{ isVisible }">
                        <Transition name="slide-fade" :duration="1800">
                            <img v-if="isVisible" :src="require('@/assets/img/home/card-06/02.png')" class="img-fluid"
                                style="max-height: 25em;width: 100%;" />
                        </Transition>
                    </UseElementVisibility>
                </div>
            </div>
            <div class="row mt-6" style="min-height: 21em">
                <div class="col-lg-6 col-12 py-3 d-flex justify-content-center align-items-center">
                    <UseElementVisibility v-slot="{ isVisible }">
                        <Transition name="slide-fade-left" :duration="1800">
                            <img v-if="isVisible" :src="require('@/assets/img/home/card-06/03.png')" class="img-fluid"
                                style="max-height: 20em;width: 100%;" />
                        </Transition>
                    </UseElementVisibility>
                </div>
                <div class="col-lg-6 col-12">
                    <UseElementVisibility v-slot="{ isVisible }">
                        <Transition name="slide-fade" :duration="1800">
                            <div v-if="isVisible"
                                class="d-flex justify-content-start align-items-start w-100 h-100 px-5"
                                style="flex-direction: column;">
                                <h3 class="text-black">03</h3>
                                <h2 class="ko-text" style="font-size:xxx-large;">Trading on our marketplace</h2>
                                <p class="mt-2">
                                    Starting the production on the procedurally generated planets and the smart contract
                                    for
                                    minting.
                                </p>
                                <RouterLink to="/trade-nft" class="mt-3 text-black" style="max-width: 20em;">Learn more
                                    <i class="bi bi-arrow-up-right" style="font-size: 1em"></i>
                                </RouterLink>
                            </div>
                        </Transition>
                    </UseElementVisibility>
                </div>
            </div>
        </div>
    </div>

    <div class="container border-radius-lg mt-4 py-5 bg-white">
        <UseElementVisibility v-slot="{ isVisible }">
            <Transition name="slide-fade-top" :duration="1800">
                <h2 v-if="isVisible" class="ko-text text-center" style="font-size:xxx-large;">Each NFT contain</h2>
            </Transition>
        </UseElementVisibility>
        <div class="row mt-5">
            <div class="col-lg-4 col-12 text-center d-flex flex-column justify-content-center text-black">
                <UseElementVisibility v-slot="{ isVisible }">
                    <Transition name="slide-fade-left" :duration="1800">
                        <h3 v-if="isVisible" class="py-2">Type of Credits</h3>
                    </Transition>
                </UseElementVisibility>
                <UseElementVisibility v-slot="{ isVisible }">
                    <Transition name="slide-fade-left" :duration="1800">
                        <h3 v-if="isVisible" class="py-2">Location</h3>
                    </Transition>
                </UseElementVisibility>
                <UseElementVisibility v-slot="{ isVisible }">
                    <Transition name="slide-fade-left" :duration="1800">
                        <h3 v-if="isVisible" class="py-2">Date of retirement</h3>
                    </Transition>
                </UseElementVisibility>
            </div>

            <div class="col-lg-4 col-12 d-flex flex-column justify-content-center">
                <img :src="require('@/assets/img/home/card-07.png')" class="img-fluid"
                    style="max-width: 30em;width: 100%;" />
            </div>

            <div class="col-lg-4 col-12 text-center d-flex flex-column justify-content-center text-black">
                <UseElementVisibility v-slot="{ isVisible }">
                    <Transition name="slide-fade" :duration="1800">
                        <h3 v-if="isVisible" class="py-2">Certifications</h3>
                    </Transition>
                </UseElementVisibility>
                <UseElementVisibility v-slot="{ isVisible }">
                    <Transition name="slide-fade" :duration="1800">
                        <h3 v-if="isVisible" class="py-2">Entity Information</h3>
                    </Transition>
                </UseElementVisibility>
                <UseElementVisibility v-slot="{ isVisible }">
                    <Transition name="slide-fade" :duration="1800">
                        <h3 v-if="isVisible" class="py-2">Credit ID</h3>
                    </Transition>
                </UseElementVisibility>
            </div>

        </div>
    </div>

    <div class="container-fluid ko-bg-card-08 d-flex flex-column justify-content-center align-items-center">
        <h2 class="text-center" style="font-size:xxx-large;">
            <span class="text-black">Let's start</span>
            <br>
            <span class="ko-text">trading</span>
        </h2>
        <p>Invest and manage all your NFTs at one place.</p>
        <RouterLink to="/trade-nft" class="ko-button btn btn-lg mt-3 border-radius-xl" style="max-width: 20em;">
            Trade now <i class="bi bi-arrow-up-right" style="font-size: 1em"></i></RouterLink>
    </div>
</template>
<style>
.text-black {
    color: black;
}

.ko-card-top {
    min-height: 41rem;
    background-image: url("@/assets/img/home/top-card.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

.ko-logo-bg {
    background-image: url("@/assets/img/logo-ko.png");
    background-repeat: no-repeat;
    background-size: contain;
    width: 100%;
    height: 36em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-position: center;
}

.ko-card-02 {
    background-color: #718885;
    background-image: url("@/assets/img/home/bg-card-02.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    min-height: 41rem;
}

.ko-item-card-05 {
    min-height: 28em;
}

.ko-item-card-05-s {
    display: flex;
    flex-direction: column;
    justify-content: start;
}

.ko-item-card-05-e {
    display: flex;
    flex-direction: column;
    justify-content: end;
}

@media screen and (max-width: 991.98px) {
    .ko-item-card-05-s {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .ko-item-card-05-e {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}

.ko-item-content-card-05 {
    background-color: #00000026;
    border-radius: 1rem;
    min-height: 22em;
}

.ko-bg-card-08 {
    background-image: url("@/assets/img/home/bg-card-08.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    min-height: 25rem;
}

.ko-bg-card-08-t {
    background-image: url("@/assets/img/home/bg-card-08-t.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top;
}

.ko-bg-card-08-b {
    background-image: url("@/assets/img/home/bg-card-08-b.png");
    background-repeat: no-repeat;
    background-size: 110%;
    background-position: bottom;
}
</style>