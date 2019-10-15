import vpay from "./src/vpay.vue";

//该插件有一个install方法，第一个参数传入Vue,第二个参数为插件自定义参数
vpay.install = (Vue, options) => {
  //将其注入为Vue组件,'vpay'是组件名，keyboard是我们开发的组件
  Vue.component("vpay", vpay);
};

//导出插件，并在main.js中通过Vue.use()即可使用插件
export default vpay;
