import { onOffFullscreen } from "./modules/tools";

const methods = { onOffFullscreen };

const importMethod = Vue => {
  for (let key in methods) {
    Vue.prototype[key] = methods[key];
  }
};

export default importMethod;
