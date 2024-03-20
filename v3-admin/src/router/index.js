import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path:'/',
        redirect:'/login'
    },
    {
      path: "/index",
      name: "Index",
      component: () => import("../views/Index.vue"),
      meta:{
        title: "首页",
      },
      children:[
        {
            path:'/index',
            redirect:'/index/chart'
        },
        {
            path:'chart',
            name:"chart",
            component: () => import("../views/Chart.vue"),
            meta:{
                title: "图表",
            }
        },
        // 运输工具
        {
            path:'fixed',
            name:"fixed",
            component: () => import("../views/Fixed.vue"),
            meta:{
                title: "运输工具",
            }
        },
      ]
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/Login.vue"),
      meta:{
        title: "登录",
      }
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
