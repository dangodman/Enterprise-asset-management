<template>
  <div class="login-container">
    <div class="login-box">
      <div class="title">企业资管管理系统</div>
      <el-form
        ref="ruleFormRef"
        style="max-width: 300px"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item label="账号 :" prop="username">
          <el-input v-model="ruleForm.username" />
        </el-form-item>
        <el-form-item label="密码 :" prop="pass">
          <el-input
            v-model="ruleForm.pass"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-btn"
            type="primary"
            @click="submitForm(ruleForm)"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const ruleFormRef = ref();

const checkUsername = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入账号"));
  }
};

const validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  }
};

const ruleForm = reactive({
  pass: "",
  username: "",
});

const rules = reactive({
  pass: [{ validator: validatePass, trigger: "blur" }],
  username: [{ validator: checkUsername, trigger: "blur" }],
});

const submitForm = (formEl) => {
  if (!formEl.username || !formEl.pass) return;
  console.log(formEl);
  router.push("/index");
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="less" scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  background: #f0f2f5;
  background: url("https://pic.616pic.com/bg_w1180/00/04/99/FVpeLRccc1.jpg!/fw/1120")
    no-repeat;
  background-size: cover;
  .login-box {
    padding: 50px;
    background: #fff;
    border-radius: 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .title {
      font-size: 20px;
      text-align: center;
      font-weight: 700;
      margin: 30px 0;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
