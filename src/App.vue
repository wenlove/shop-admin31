<template>
  <div id="app">
    
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    //请求接口测试
    // axios({
    //   url:"https://api.github.com/users",
    //   method:'get',
    //   params:  {
    //     abc:123
    //   }
    // }).then(res=>{
      
    //   console.log(res)
    // })

    // this.$axios({
    //   url:"https://api.github.com/users",
    //   method:"get"
    // }).then(res=>{
    //   console.log(res)
    // })
  },
}
</script>

<style>

</style>
