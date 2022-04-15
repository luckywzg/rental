<template>
  <div class="login-body">
    <div class="login">
      <img src="~assets/img/login.png" alt="" />
      <div class="login-form">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          class="login-form"
        >
          <el-form-item prop="username">
            <el-input
              v-model="ruleForm.username"
              autocomplete="off"
              placeholder="用户名"
              clearable
              ><i slot="prefix" class="el-input__icon el-icon-user"></i
            ></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
              class="login-name"
              v-model="ruleForm.pass"
              placeholder="密码"
              show-password
              clearable
              ><i slot="prefix" class="el-input__icon el-icon-lock"></i
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="info">
        <link-item class="return-home" path="/home"> 返回首页 </link-item>
        <link-item class="to-register" path="/register">
          没有账号？点我注册
        </link-item>
      </div>
      <div class="btn">
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="submitForm('ruleForm')">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "../../network/login";
import LinkItem from "../../components/common/linkItem/LinkItem.vue";
export default {
  components: { LinkItem },
  name: "Login",
  data() {
    var checkUsername = (rule, value, callback) => {
      let matching = (value, callback, reg, message) => {
        if (value === "" || value === undefined || value == null) {
          callback(new Error("用户名不能为空"));
        } else {
          if (!reg.test(value)) {
            callback(new Error(message));
          } else {
            callback();
          }
        }
      };
      let reg = /^(?![0-9]*$)(?![a-zA-Z]*$)[a-zA-Z0-9]{3,10}/;
      matching(value, callback, reg, "请输入3-10位字母和数字组合");
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        username: "",
      },
      rules: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.ruleForm.username, this.ruleForm.pass)
            .then((res) => {
              if (res.data.error === undefined) {
                this.$message({
                  type: "success",
                  message: "登录成功！",
                });
                this.$router.push({
                  path: "/home",
                  query: {
                    username: this.ruleForm.username,
                    role: res.data.role,
                    uid: res.data.uid,
                  },
                });
              } else {
                this.$message.error(res.data.error);
              }
            })
            .catch(() => {
              console.log("登录失败！");
            });
        } else {
          this.$message.error("请填写正确且完整的登录信息！");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.login-body {
  width: 100%;
  height: 100%;
  position: fixed;
  background: url("assets/img/loginbgimg.jpg") no-repeat;
}
.login {
  position: absolute;
  width: 500px;
  height: 400px;
  top: 50%;
  left: 50%;
  border-radius: 50px;
  background-color: rgb(126, 252, 210, 0.2);
  margin-top: -300px;
  margin-left: -250px;
}
img {
  width: 280px;
  height: 90px;
  margin-left: 50px;
  margin-bottom: 30px;
}
.login-form {
  width: 350px;
  margin: 0 auto;
  text-align: center;
}
.el-form-item {
  margin-bottom: 0;
}
.login-name {
  margin-top: 22px;
}
.el-input >>> .el-input__inner {
  color: #fff;
  border-color: rgb(190, 166, 166);
  background-color: rgb(115, 156, 202, 0.1);
}
.el-input >>> .el-input__inner::placeholder {
  color: #fff;
}
.again-pass {
  margin-top: 22px;
}
.info {
  width: 350px;
  margin: 0 auto;
  text-align: right;
  display: inline-block;
  font-size: 14px;
  padding: 0 10px;
  margin-top: 20px;
  color: rgb(232, 225, 191);
}
.link-item {
  float: left;
}
.to-register {
  float: right;
}
.el-button {
  width: 80px;
  height: 40px;
  color: #fff;
  background-color: rgb(238, 231, 199, 0.2);
  font-size: 16px;
  margin: 20px 50px 0 50px;
}
.el-button:hover {
  background-color: rgb(238, 231, 199, 0.8);
}
</style>
