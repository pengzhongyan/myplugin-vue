import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vpay from "./lib";

Vue.config.productionTip = false;
// 使用插件
Vue.use(vpay);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
