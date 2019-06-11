<template>
  <el-breadcrumb separator="/" class="breadcrumb">
    <el-breadcrumb-item v-for="(item,index) in info" :key="index">{{item}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      info: [] //存储meta的值
    };
  },
  watch: {
    //监听路由变化，获取路由信息
    $route() {
      this.getRoute();
    }
  },
  mounted() {
    //组件加载完成获取路由信息
    this.getRoute();
  },
  methods: {
    //根据路由获取meta
    getRoute() {
      // console.log(this.$route.matched);
      const arr = this.$route.matched;
      let info = [];

      arr.forEach(v => {
        info.push(v.meta);
      });

      this.info = info;
    }
  }
};
</script>

<style>
.breadcrumb {
  margin-bottom: 20px;
}
.el-breadcrumb {
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}
</style>
