import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "sets-of-shelving-systems",
    meta: {
      title: "Комплекты стеллажных систем",
      breadcrumbs: [
        { name: "Главная", href: "/#" },
        { name: "Системы хранения", href: "/" },
        { name: "Комплекты стеллажных систем" }
      ]
    },
    component: () => import("@/views/product-list/List.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
