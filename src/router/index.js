import { createWebHistory, createRouter } from "vue-router";

import Index from "../views/Index.vue";
import Settings from "../views/Settings.vue";
import Design from "../views/Design.vue";

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/design",
    name: "Design",
    component: Design,
  },
];

export const $router = createRouter({
  mode: "history",
  history: createWebHistory(),
  routes,
});
