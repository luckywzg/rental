<template>
  <div class="edit-pass">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
      <!-- 输入新密码 -->
      <el-form-item prop="oldpass">
        <el-input
          v-model="ruleForm.oldpass"
          placeholder="新密码"
          show-password
          clearable
          ><i slot="prefix" class="el-input__icon el-icon-lock"></i
        ></el-input>
      </el-form-item>
      <!-- 再次确认密码 -->
      <el-form-item prop="newpass">
        <el-input
          v-model="ruleForm.newpass"
          placeholder="确认密码"
          show-password
          clearable
          ><i slot="prefix" class="el-input__icon el-icon-lock"></i
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="btn">
      <el-button @click="submitForm('ruleForm')">提交修改</el-button>
    </div>
  </div>
</template>

<script>
import { postEditPassword } from "../../../network/user";
export default {
  data() {
    // 验证密码是否符合规范
    var validateOldPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    // 验证两次密码是否相同
    var validateNewPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.oldpass) {
        callback(new Error("两次输入密码不同!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldpass: "",
        newpass: "",
      },
      // 验证规则
      rules: {
        oldpass: [{ validator: validateOldPass, trigger: "blur" }],
        newpass: [{ validator: validateNewPass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 发送修改密码请求
          postEditPassword(this.ruleForm.newpass)
            .then((res) => {
              this.$message({
                message: "修改密码成功!",
                type: "success",
              });
            })
            .catch((err) => {
              this.$message({
                message: "修改密码错误!",
                type: "error",
              });
              console.log(err);
            });
        } else {
          this.$message.error("请填写正确且完整的密码！");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.edit-pass {
  width: 500px;
  height: 250px;
  margin: 0 15%;
  padding-top: 50px;
  border-radius: 20px;
  text-align: center;
  background-color: rgb(92, 70, 168, 0.5);
}
.el-form {
  width: 300px;
  margin: 0 auto;
}
.el-button {
  font-weight: 700;
  padding: 12px 40px;
  font-size: 16px;
  color: #d6727f;
}
.el-button:hover {
  color: #333;
}
</style>
