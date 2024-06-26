import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/index",
    name: "Index",
    component: () => import("../views/Index.vue"),
    meta: {
      title: "首页",
    },
    children: [
      {
        path: "/index",
        redirect: "/index/chart",
      },
      {
        path: "chart",
        name: "chart",
        component: () => import("../views/Chart.vue"),
        meta: {
          title: "首页",
        },
      },
      {
        path: "fixed",
        name: "fixed",
        component: () => import("../views/Fixed.vue"),
        meta: {
          title: "固定资产",
        },
      },
      {
        path: "current",
        name: "current",
        component: () => import("../views/Current.vue"),
        meta: {
          title: "流动资产",
        },
      },
      {
        path: "maintenanceInformation",
        name: "maintenanceInformation",
        component: () => import("../views/assetMaintenance/MaintenInfor.vue"),
        meta: {
          title: "维修信息登记",
        },
      },
      {
        path: "assetAcquisition",
        name: "assetAcquisition",
        component: () => import("../views/assetAcquisition/Acquisition.vue"),
        meta: {
          title: "领用&退库",
        },
      },
      {
        path: "changeInformation",
        name: "changeInformation",
        component: () => import("../views/informationChanges/Changes.vue"),
        meta: {
          title: "实物信息变更",
        },
      },
      {
        path: "employees",
        name: "employees",
        component: () => import("../views/employeeManagement/Employee.vue"),
        meta: {
          title: "在职员工信息",
        },
      },
      {
        path: "leave",
        name: "leave",
        component: () => import("../views/employeeManagement/Leave.vue"),
        meta: {
          title: "离职员工信息",
        },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      title: "登录",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  let token = localStorage.getItem("token");
  if (to.path !== "/login" && !token) {
    next("/login");
  } else {
    next();
  }
});

export default router;
