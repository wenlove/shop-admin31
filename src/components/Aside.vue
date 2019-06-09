<template>
  <el-menu
    default-active="1-1"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isShow"
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>购物商场</span>
      </template>

      <el-menu-item index="1-1">
        <template slot="title">
          <router-link to="/admin/goods-list">商品管理</router-link>
        </template>
      </el-menu-item>

      <el-menu-item index="1-2">
        <template slot="title">
          <router-link to="/admin/category-list">栏目管理</router-link>
        </template>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  //使用props声明
  props: ["isShow"]
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-submenu .el-menu-item {
  padding: 0 !important;
}
.el-menu-vertical-demo a {
  color: inherit;
  display: block;
  padding: 0 40px;
}
</style>
