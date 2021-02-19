<template>
  <div class="login">
    <a-form-model ref="loginForm" :model="loginForm" :rules="rules" v-bind="layout">
      <a-form-model-item has-feedback label="邮箱" prop="email" required>
        <a-input v-model="loginForm.email" placeholder="请输入邮箱" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password" required>
        <a-input
          v-model="loginForm.password"
          type="password"
          placeholder="请输入密码"
          autocomplete="off"
        />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('loginForm')">
          登录
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('loginForm')">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import api from "../../api/api.js";
export default {
  data() {
    let validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱！"));
      } else {
        if (this.loginForm.email !== "") {
          let reg = /^[\w\.]+@[\w\.-]+\.com$/;
          if (!reg.test(value)) {
            callback(new Error("邮箱格式不正确！"));
          } else {
            this.$refs.loginForm.validateField("email");
            callback();
          }
        }
      }
    };
    let validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码！"));
      } else {
        if (this.loginForm.password !== "") {
          this.$refs.loginForm.validateField("password");
        }
        callback();
      }
    };

    return {
      loginForm: {
        email: "",
        password: ""
      },
      rules: {
        email: [{ validator: validateEmail, trigger: "change" }],
        password: [{ validator: validatePassword, trigger: "change" }]
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          api.login(this.loginForm).then(res => {
            if (res.status === "success") {
              this.$store.dispatch("setUserInfo", res.data);
              this.$router.push({ name: "Home" });
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
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
<style lang="less" scoped>
.login {
  width: 100%;
  .ant-form {
    width: 400px;
    height: 250px;
    margin: 100px auto;
    padding: 20px;
    border: 1px solid #eeeeee;
  }
}
</style>
