import uploadavatar from "./src/uploadavatar.vue";

uploadavatar.install = (Vue, options) => {
  Vue.component("uploadavatar", uploadavatar);
};

export default uploadavatar;
