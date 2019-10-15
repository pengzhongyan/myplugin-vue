function pages(name) {
  return () => import(`@pages/${name}.vue`);
}

function component(name) {
  return () => import(`@components/${name}.vue`);
}

const routes = [
  {
    path: "/",
    name: "home",
    component: pages("Home")
  },
  {
    path: "/about",
    name: "about",
    component: pages("About")
  }
];

export default routes;
