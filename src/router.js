import Vue from "vue";
import Router from "vue-router";
// import app from "@/main";

import NotFound404 from "./views/NotFound404.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/main",
      name: "Main",
      meta: { finishBarSelf: true, selfConfig: true, title: "" },
      redirect: "/",
      component: () =>
        import(/* webpackChunkName: "main" */ "@/views/Main.vue"),
      children: [
        {
          path: "/cart",
          name: "Cart",
          ops: route => ({ ...route.query }),
          meta: { finishBarSelf: true, selfConfig: true, title: "" },
          component: () =>
            import(/* webpackChunkName: "cart" */ "@/views/Cart/index.vue")
        },
        {
          path: '/order-detail',
          name: 'OrderDetail',
          meta: { finishBarSelf: true, selfConfig: true, title: "" },
          component: () =>
            import(/* webpackChunkName: "order" */ "@/views/Order/detail.vue")
        },
        {
          path: '/order-result',
          name: 'OrderResult',
          component: () => import(/* webpackChunkName: "order" */ "@/views/Order/result.vue"),
          meta: { finishBarSelf: true, selfConfig: true, title: "" },
        }
      ]
    },
    {
      path: "/*",
      name: "404",
      meta: { title: "找不到了~" },
      component: NotFound404
    }
  ]
});

router.beforeResolve((to, from, next) => {
  document.title = to.meta.title ? to.meta.title : "Checkout - SafePal Pay";
  next();
});

//需要缓存的页面
const cacheAlive = [];
//
const cacheAlivePlugin = {
  install(_vue) {
    _vue.mixin({
      beforeCreate() {
        if (!this.$$cacheAlive) {
          this.$$cacheAlive = cacheAlive;
        }
      }
    });
  }
};

Vue.use(cacheAlivePlugin);

export default router;
