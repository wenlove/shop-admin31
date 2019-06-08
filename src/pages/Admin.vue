<template>
  <el-container>
    <el-aside width="auto">
      <Aside :isShow="isShow"></Aside>
    </el-aside>
    <el-container>
      <el-header>
        <Header @click="handleChangeShow"></Header>
      </el-header>
      <el-main>
        <Breadcrumb></Breadcrumb>Main
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
//导入头部组件
import Header from "../components/Header.vue";

//导入侧边栏组件
import Aside from "../components/Aside.vue";

//导入面包屑组件
import Breadcrumb from "../components/Breadcrumb.vue";

export default {
  data() {
    return {
      isShow: false
    };
  },
  components: {
    Header,
    Aside,
    Breadcrumb
  },
  //传递事件改变侧边栏的展开收起
  methods: {
    handleChangeShow() {
      this.isShow = !this.isShow;
    }
  }
};
</script>

<style>
.el-header,
.el-footer {
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #545c64;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

body > div > .el-container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>
