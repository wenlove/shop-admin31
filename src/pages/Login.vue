<template>
  <div class="form-warpper">
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="80px"
      class="demo-form"
    >
      <!-- <div class="login-title">登录</div> -->
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入密码" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="login-btn">
        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        password: "",
        username: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit(formName) {
      //表单验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          //提交的数据
          const data = {
            uname: this.form.username,
            upwd: this.form.password
          };

          //调用axios
          this.$axios({
            url: "http://localhost:8899/admin/account/login",
            method: "post",
            data,
            // 处理session跨域
            withCredentials: true
          }).then(res => {
            // console.log(res);
            //解构赋值
            const {message,status}= res.data;

            // console.log(status)
            if(status==0){
              this.$router.push('/')
            }else {
              this.$message.error(message);
            }
          });
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>


<style lang="less" >
.form-warpper {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  // background-color: #666;
  .demo-form {
    width: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -250px;
    margin-top: -95px;
    .login-title {
      text-align: center;
      color: #000080;
      padding-bottom: 30px;
    }
    .login-btn {
      text-align: center;
    }
  }
}
</style>
