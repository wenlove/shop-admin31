<template>
  <el-row type="flex" justify="space-between">
    <div class="arrow" @click="handleClick">
      <i class="el-icon-back"></i>
    </div>
    <div>
      {{user.uname}} {{user.realname}}
      <span @click="handleLogout" class="logout">退出</span>
    </div>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      user: {}
    };
  },
  methods: {
    //点击触发自定义的aside里面的事件
    handleClick() {
      this.$emit("click");
    },

    //用户退出
    handleLogout() {
      this.$axios({
        url: "http://localhost:8899/admin/account/logout",
        method: "GET",
        // 处理session跨域
        withCredentials: true
      }).then(res => {
        const { message, status } = res.data;

        if (status == 0) {
          this.$message.success(message);

          //跳转到登录页
          this.$router.push("/login");

          //清除本地存储
          localStorage.removeItem("user");
        }
      });
    }
  },
  mounted() {
    //读取vuex中的store数据
    this.user = this.$store.state.user;
  }
};
</script>

<style scoped>
.arrow,
.logout {
  cursor: pointer;
}
</style>
