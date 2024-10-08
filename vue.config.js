const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
      config.plugin('polyfills').use(NodePolyfillPlugin)
  },
  // configureWebpack: {
  //   plugins: [new NodePolyfillPlugin()],
  //   optimization: {
  //     splitChunks: {
  //       chunks: "all",
  //     },
  //   },
  // },
});