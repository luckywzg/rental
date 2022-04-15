<template>
  <div class="register-body">
    <div class="register">
      <img src="~assets/img/login.png" alt="" />
      <div class="register-form">
        <el-form
          class="register-form"
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
        >
          <el-form-item prop="username">
            <el-input
              class="user-type"
              v-model="ruleForm.username"
              placeholder="用户名"
              clearable
              ><i slot="prefix" class="el-input__icon el-icon-user"></i
              ><el-select
                class="select"
                v-model="role"
                slot="prepend"
                placeholder="请选择"
              >
                <el-option label="普通用户" value="1"></el-option>
                <el-option label="商家" value="2"></el-option> </el-select
            ></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
              class="register-name"
              v-model="ruleForm.pass"
              placeholder="密码"
              show-password
              clearable
              ><i slot="prefix" class="el-input__icon el-icon-lock"></i
            ></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input
              v-model="ruleForm.checkPass"
              class="again-pass"
              placeholder="确认密码"
              show-password
              clearable
              ><i slot="prefix" class="el-input__icon el-icon-lock"></i
            ></el-input>
          </el-form-item>
          <el-form-item prop="sex">
            <el-input v-model.number="ruleForm.sex" placeholder="性别"
              ><i slot="prefix" class="el-input__icon el-icon-female"></i
            ></el-input>
          </el-form-item>
          <el-form-item prop="age">
            <el-input v-model.number="ruleForm.age" placeholder="年龄"
              ><i slot="prefix" class="el-input__icon el-icon-bell"></i
            ></el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input v-model.number="ruleForm.phone" placeholder="电话"
              ><i slot="prefix" class="el-input__icon el-icon-phone-outline"></i
            ></el-input>
          </el-form-item>
          <el-form-item prop="address">
            <el-input v-model="ruleForm.address" placeholder="地址" clearable
              ><i
                slot="prefix"
                class="el-input__icon el-icon-location-outline"
              ></i
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="info">
        <link-item class="return-home" path="/home"> 返回首页 </link-item>
        <link-item class="to-login" path="/login">
          已有账号？点我登录
        </link-item>
      </div>
      <div class="btn">
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="submitForm('ruleForm')">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from "../../network/register";
import LinkItem from "../../components/common/linkItem/LinkItem.vue";
export default {
  components: { LinkItem },
  name: "Register",
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
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateSex = (rule, value, callback) => {
      if (value === "男" || value === "女") {
        callback();
      } else {
        callback(new Error("请输入“男”或“女”"));
      }
    };
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      } else if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      } else {
        if (value < 18) {
          callback(new Error("必须年满18岁"));
        } else {
          callback();
        }
      }
    };
    var checkPhone = (rule, value, callback) => {
      let matching = (value, callback, reg, message) => {
        if (value === "" || value === undefined || value == null) {
          callback(new Error("电话号码不能为空"));
        } else {
          if (!reg.test(value)) {
            callback(new Error(message));
          } else {
            callback();
          }
        }
      };
      let reg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
      matching(value, callback, reg, "请输入正确的电话号码");
    };
    var checkAddress = (rule, value, callback) => {
      let matching = (value, callback, reg, message) => {
        if (value === "" || value === undefined || value == null) {
          callback(new Error("地址不能为空"));
        } else {
          if (!reg.test(value)) {
            callback(new Error(message));
          } else {
            callback();
          }
        }
      };
      let reg =
        /([^省]+省|.+自治区|[^市]+市)([^自治州]+自治州|[^市]+市|[^盟]+盟|[^地区]+地区|.+区划)([^市]+市|[^县]+县|[^旗]+旗|.+区)/;
      matching(value, callback, reg, "请输入正确的现居住地址(省/市/区)");
    };
    return {
      role: "普通用户",
      ruleForm: {
        pass: "",
        checkPass: "",
        username: "",
        sex: "",
        age: "",
        phone: "",
        address: "",
      },
      rules: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        sex: [{ validator: validateSex, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        address: [{ validator: checkAddress, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        let userType = this.role;
        if (userType == "普通用户") {
          userType = 1;
        } else {
          userType = 2;
        }
        if (valid) {
          // this.axios
          //   .post("/api/register", {
          //     username: this.ruleForm.username,
          //     password: this.ruleForm.pass,
          //     age: this.ruleForm.age,
          //     gender: this.ruleForm.sex,
          //     telephone: this.ruleForm.phone,
          //     address: this.ruleForm.address,
          //     role: userType,
          //   })
          register(this.ruleForm, userType)
            .then((res) => {
              console.log(res);
              if (res.data == "注册成功!") {
                this.$router.push("/login");
              } else {
                this.$message.error(res.data);
              }
            })
            .catch(() => {
              console.log("注册失败");
            });
        } else {
          this.$message.error("请填写正确且完整的个人信息！");
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
.register-body {
  width: 100%;
  height: 100%;
  position: fixed;
  background: url("assets/img/registerbgc.jpg") no-repeat;
}
.register {
  position: absolute;
  width: 500px;
  height: 665px;
  top: 50%;
  left: 50%;
  margin-top: -400px;
  margin-left: -450px;
  border-radius: 50px;
  background-color: rgba(238, 197, 136, 0.4);
}
img {
  width: 280px;
  height: 90px;
  margin-bottom: 30px;
  margin-left: 50px;
}
.register-form {
  width: 350px;
  height: 420px;
  margin: 0 auto;
  text-align: center;
}
.register-form .user-type {
  width: 350px;
}
.el-form-item /deep/ .el-form-item__error {
  color: rgb(194, 19, 19);
  font-weight: 700;
}
.select {
  width: 120px;
  color: #fff;
}
.register-form /deep/ .el-input-group__prepend {
  background-color: transparent;
}
.el-input >>> .el-input__inner {
  color: #fff;
  border-color: rgb(223, 214, 214);
  background-color: rgba(233, 220, 220, 0.1);
}
.el-input >>> .el-input__inner::placeholder {
  color: #fff;
}

.info {
  width: 350px;
  margin: 0 auto;
  text-align: right;
  display: inline-block;
  font-size: 14px;
  padding: 0 10px;
  margin: 20px 0 20px 0;
  color: #fff;
}
.link-item {
  float: left;
}
.to-login {
  float: right;
}
.el-button {
  width: 80px;
  height: 40px;
  color: #fff;
  background-color: rgb(238, 231, 199, 0.2);
  font-size: 16px;
  margin: 0 40px;
}
.el-button:hover {
  background-color: rgb(238, 231, 199, 0.8);
}
</style>
