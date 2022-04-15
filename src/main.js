import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";

import VueMeta from "vue-meta";

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true,
});

Vue.prototype.axios = axios;
Vue.use(ElementUI);
// 事件总线
Vue.prototype.$bus = new Vue();
// 使用element-ui的el-dialog时 由于滚动条隐藏和出现导致页面抖动问题的解决
ElementUI.Dialog.props.lockScroll.default = false;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
