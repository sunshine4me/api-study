<template>
  <div>
    <br>
    <br>
    <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" style="width:400px;margin:0 auto">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="loginForm.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import { account } from "../utils/api";
export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^[\w][\w\d_]*@\w+\.[A-Za-z]+$/;
      if (regEmail.test(value)) {
        return callback();
      }
      callback(new Error("邮箱不合法"));
    };
    return {
      loginForm: {
        email: '',
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          account.login(this.loginForm.email).then(() => {
            this.$router.push({ path: "/TestCase" });
          })
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
</style>