<template>
  <div class="register">
    <a-form-model ref="registerForm" :model="registerForm" :rules="rules" v-bind="layout">
      <a-form-model-item has-feedback label="用户名" prop="username" required>
        <a-input v-model="registerForm.username" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password" required>
        <a-input v-model="registerForm.password" type="password" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="确认密码" prop="passwordComfirm" required>
        <a-input v-model="registerForm.passwordComfirm" type="password" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="邮箱" prop="email" required>
        <a-input v-model="registerForm.email" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="验证码" prop="code" required>
        <a-input v-model="registerForm.code" />
      </a-form-model-item>
      <a-form-model-item label="角色" prop="role">
        <a-select v-model="registerForm.role" placeholder="请选择角色">
          <a-select-option value="customer">
            普通用户
          </a-select-option>
          <a-select-option value="admin">
            管理员
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 8 }">
        <a-button type="primary" @click="submitForm('registerForm')">
          注册
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('registerForm')">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import api from "@/api/api";
export default {
  data() {
    let checkUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名！"));
      } else {
        if (this.registerForm.username !== "") {
          this.$refs.registerForm.validateField("username");
        }
        callback();
      }
    };
    let checkPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码！"));
      } else {
        if (this.registerForm.password !== "") {
          this.$refs.registerForm.validateField("password");
        }
        callback();
      }
    };
    let checkPasswordConfirm = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入相同的密码！"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次密码不匹配！"));
      } else {
        callback();
      }
    };
    let checkEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱！"));
      } else {
        if (this.registerForm.email !== "") {
          let reg = /^[\w\.]+@[\w\.-]+\.com$/;
          if (!reg.test(value)) {
            callback(new Error("邮箱格式不正确！"));
          } else {
            this.$refs.registerForm.validateField("email");
            callback();
          }
        }
      }
    };
    let checkCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码！"));
      } else {
        if (this.registerForm.code !== "") {
          this.$refs.registerForm.validateField("code");
        }
        callback();
      }
    };
    return {
      registerForm: {
        username: "",
        password: "",
        passwordComfirm: "",
        email: "",
        code: "",
        role: ""
      },
      rules: {
        username: [{ validator: checkUsername, trigger: "change" }],
        password: [{ validator: checkPassword, trigger: "change" }],
        passwordComfirm: [{ validator: checkPasswordConfirm, trigger: "change" }],
        eamil: [{ validator: checkPasswordConfirm, trigger: "change" }],
        code: [{ validator: checkCode, trigger: "change" }],
        email: [{ validator: checkEmail, trigger: "change" }]
      },
      layout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 15 }
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          api.register(this.registerForm).then(res => {
            if (res.status === 200) {
              this.$router.push({ path: "/login" });
            }
          });
        } else {
          console.log("error submit!!");
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
.register {
  width: 100%;
  .ant-form {
    width: 400px;
    margin: 100px auto;
    padding: 20px;
    border: 1px solid #eeeeee;
  }
}
</style>
