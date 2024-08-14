// Import vue-loading-overlay
import { useLoading } from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

// class LoadingPluginXPath
class LoadingPluginXPath {
  constructor() {
    this.loader = null;
    this.loaderPlugin = useLoading({
        canCancel: false,
        loader: "bars",
        lockScroll: true,
        enforceFocus: true,
        color: "#32a852",
        backgroundColor: "#000000",
        isFullPage: true,
        width: 100,
        height: 100,
        opacity: 0.7,
    });
    this.active = false;
  }
  show() {
    if (!this.loader) {
      this.loader = this.loaderPlugin.show();
      this.active = true;
    }
  }
  hide() {
    if (this.loader) {
      this.loader.hide();
      this.loader = null;
      this.active = false;
    }
  }
}

function LoadingPlugin(app, options){
    // Provide loading overlay
    app.config.globalProperties.$loading = new LoadingPluginXPath();
}

export { LoadingPlugin };
