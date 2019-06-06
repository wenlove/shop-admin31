<template>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div class="login-title">登录</div>
        <el-form-item label="账号" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="login-btn">
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
  export default {
    data() {
      var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入账号'));
        }
        setTimeout(() => {
              callback();
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      
      return {
        ruleForm: {
          pass: '',
          name: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          name: [
            { validator: checkName, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
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
  }
</script>


<style lang="less" >
    .demo-ruleForm {
        width: 500px;
        margin: 200px auto;
        .login-title {
            text-align: center;
            color: #0ff;
            padding-bottom: 30px;
        }
        .login-btn {
            text-align: center ;
        }
    }
    
</style>
