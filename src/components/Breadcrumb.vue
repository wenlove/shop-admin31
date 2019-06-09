<template>
  <el-breadcrumb separator="/">
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
    //监听路由变化，获取路由matched中的meta
    $route() {
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
.el-breadcrumb {
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}
</style>
