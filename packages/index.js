//导入components文件、directive文件
import vpay from "./components/vpay";
import fullscreen from "./components/fullscreen";
import modal from "./components/modal";
import uploadavatar from "./components/uploadavatar";

import importMethod from "./utils";

//以数组结构保存，便于遍历
const components = [vpay, fullscreen, modal, uploadavatar];

const install = Vue => {
  if (install.installed) return; //定义的install()
  install.installed = true;
  //注入组件
  components.map(component => {
    Vue.component(component.name, component);
  });
  //注入全局方法
  importMethod(Vue);
};
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue); //定义的install()
}

//单个导入
export { install, importMethod };

export default {
  install, //导出的对象必须具备一个install方法
  ...components
};
