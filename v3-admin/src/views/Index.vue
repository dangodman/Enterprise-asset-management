<template>
  <el-container class="layout-container-demo">
    <el-aside width="208px">
      <el-scrollbar>
        <h1 class="logo">企业资产管理</h1>
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="1"
          text-color="#fff"
        >
          <router-link to="/index/chart">
            <el-menu-item index="1">
              <template #title>
                <el-icon><message /></el-icon>首页
              </template>
            </el-menu-item>
          </router-link>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><icon-menu /></el-icon>资产管理
            </template>
            <router-link to="/index/fixed"
              ><el-menu-item index="2-1">固定资产</el-menu-item></router-link
            >
            <el-menu-item>流动资产</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><setting /></el-icon>资产维护
            </template>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <el-icon><setting /></el-icon>员工管理
            </template>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header>
        <div class="el-header__title">{{ route.meta.title }}</div>
        <div class="toolbar">
          <el-icon style="margin-right: 20px" color="#979797"
            ><Search
          /></el-icon>
          <el-icon style="margin-right: 20px" color="#979797"><Bell /></el-icon>
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px" color="#979797"
              ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>管理员</span>
        </div>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { Menu as IconMenu, Message, Setting } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
const route = useRoute();
console.log(route.meta.title);
</script>

<style lang="less" scoped>
.logo {
  height: 60px;
  text-align: center;
  line-height: 60px;
}
.layout-container-demo {
  width: 100vw;
  height: 100vh;
}
.layout-container-demo .el-header {
  display: flex;
  justify-content: space-between;
  position: relative;
  background-color: #fff;
  color: #000;
}
.layout-container-demo .el-aside {
  color: #a6adb4;
  background: #001529;
}
.layout-container-demo .el-menu {
  border-right: none;
  background: #001529;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .el-menu-item {
  background: #001529;
}
:deep(.el-sub-menu__title) {
  color: #fff;
}
:deep(.el-menu-item:hover) {
  background: #0075ff;
}
:deep(.el-sub-menu__title:hover) {
  background: #0075ff;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.layout-container-demo .el-main {
  background: #f0f2f5;
}
.el-header__title {
  height: 100%;
  line-height: 60px;
}
</style>
