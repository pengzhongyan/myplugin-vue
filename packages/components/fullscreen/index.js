import fullscreen from "./src/fullscreen.vue";

fullscreen.install = (Vue, options) => {
  Vue.component("fullscreen", fullscreen);
};

export default fullscreen;
