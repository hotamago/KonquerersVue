<script setup>
import { useStore } from "vuex";
const store = useStore();
</script>
<template>
  <footer class="py-6 px-lg-8 px-2 footer shadow-none bg-gradient-white" style="background: white;">
    <div class="row">
      <div class="col-lg-8 col-12">
        <h3 class="ko-text">
          CaEx
        </h3>
        <p style="max-width: 600px;">
          Join our Discord channel or follow us on
          Twitter to keep up to date with our latest work
          and announcements.
        </p>
        <div class="mt-2" style="font-size: 24px">
          <a href="https://discord.gg/7v8vJ9f" target="_blank" nofollow="true" class="px-3">
            <i class="bi bi-discord"></i>
          </a>
          <a href="https://twitter.com/koii_network" target="_blank" nofollow="true" class="px-3">
            <i class="bi bi-twitter"></i>
          </a>
          <a href="https://t.me/koii_network" target="_blank" nofollow="true" class="px-3">
            <i class="bi bi-telegram"></i>
          </a>
        </div>
      </div>
      <div class="col-lg-4 col-12">
        <div class="row mb-5">
          <div class="col-lg-6 col-12">
            <h3>
              Quick Links
            </h3>
            <ul>
              <li>
                <a href="/home">Home</a>
              </li>
              <li>
                <a href="/trade-nft">Marketplace</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
            </ul>
          </div>
          <div class="col-lg-6 col-12">
            <h3>
              Community
            </h3>
            <ul>
              <li>
                <a href="https://discord.gg/7v8vJ9f" target="_blank" nofollow="true">Discord</a>
              </li>
              <li>
                <a href="https://twitter.com/koii_network" target="_blank" nofollow="true">Twitter</a>
              </li>
              <li>
                <a href="https://t.me/koii_network" target="_blank" nofollow="true">Telegram</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-6">
      <div class="col-lg-8 col-12">
        <p>
          © 2024 CaEx. All rights reserved.
        </p>
      </div>
      <div class="col-lg-4 col-12">
        <p>
          Made with ❤️ by CaEx
        </p>
      </div>
    </div>
  </footer>
</template>
<style>
footer li {
  list-style-type: none;
  padding: 0.5em 0;
}

footer ul {
  padding-left: 0;
}
</style>