import modal from "./src/modal.vue";

modal.install = (Vue, options) => {
  Vue.component("modal", modal);
};

export default modal;
