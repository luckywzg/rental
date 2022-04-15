<template>
  <div class="profile">
    <div class="register-form">
      <h3>个人资料</h3>
      <el-form
        class="register-form"
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="用户名" clearable
            ><i slot="prefix" class="el-input__icon el-icon-user"></i
          ></el-input>
        </el-form-item>
        <!-- 用户性别 -->
        <el-form-item prop="sex">
          <el-input v-model.number="ruleForm.sex" placeholder="性别"
            ><i slot="prefix" class="el-input__icon el-icon-female"></i
          ></el-input>
        </el-form-item>
        <!-- 年龄 -->
        <el-form-item prop="age">
          <el-input v-model.number="ruleForm.age" placeholder="年龄"
            ><i slot="prefix" class="el-input__icon el-icon-bell"></i
          ></el-input>
        </el-form-item>
        <!-- 联系电话 -->
        <el-form-item prop="phone">
          <el-input v-model.number="ruleForm.phone" placeholder="电话"
            ><i slot="prefix" class="el-input__icon el-icon-phone-outline"></i
          ></el-input>
        </el-form-item>
        <!-- 地址 -->
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
    <div class="btn">
      <el-button @click="submitForm('ruleForm')">提交修改</el-button>
    </div>
  </div>
</template>

<script>
import { getUserInfo, postUpdateUserInfo } from "../../../network/user";
export default {
  name: "LoginProfile",
  data() {
    // 验证用户名规范
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
      let reg = /^(?![0-9]*$)(?![a-zA-Z]*$[a-zA-Z0-9]{3,10})/;
      matching(value, callback, reg, "请输入3-10位字母和数字组合");
    };
    // 验证性别规范
    var validateSex = (rule, value, callback) => {
      if (value === "男" || value === "女") {
        callback();
      } else {
        callback(new Error("请输入“男”或“女”"));
      }
    };
    // 验证年龄规范
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
    // 验证电话号码规范
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
    // 验证地址规范
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
      update: true,
      ruleForm: {
        username: "",
        sex: "",
        age: "",
        phone: "",
        address: "",
      },
      // 验证规则
      rules: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        sex: [{ validator: validateSex, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        address: [{ validator: checkAddress, trigger: "blur" }],
      },
    };
  },
  mounted() {
    // 获取个人资料
    getUserInfo()
      .then((res) => {
        this.ruleForm.username = res.data.username;
        this.ruleForm.age = res.data.age;
        this.ruleForm.sex = res.data.gender;
        this.ruleForm.phone = res.data.telephone;
        this.ruleForm.address = res.data.address;
      })
      .catch(() => {
        console.log("获取个人资料失败");
      });
  },
  methods: {
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 更新个人资料
          // this.axios
          //   .post("/api/updateUserInfo", {
          //     username: this.ruleForm.username,
          //     age: this.ruleForm.age,
          //     gender: this.ruleForm.sex,
          //     telephone: this.ruleForm.phone,
          //     address: this.ruleForm.address,
          //   })
          postUpdateUserInfo(this.ruleForm)
            .then((res) => {
              if (res.data.success !== undefined) {
                this.$message({
                  message: "修改成功",
                  type: "success",
                });
              } else {
                this.$message({
                  message: "修改失败",
                  type: "error",
                });
              }
            })
            .catch(() => {
              console.log('修改失败');
            });
        } else {
          this.$message.error('请先正确且完整的个人资料！')
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.profile {
  position: absolute;
  width: 500px;
  height: 450px;
  top: 20%;
  left: 20%;
  text-align: center;
  border-radius: 20px;
  background-color: rgb(77, 59, 159, 0.5);
}
h3 {
  font-size: 28px;
  color: #fff;
  margin: 20px 0;
}
.register-form {
  width: 400px;
  height: 360px;
  margin: 0 auto;
}
.el-button {
  font-weight: 700;
  font-size: 18px;
  padding: 15px 50px;
}
.el-button:hover {
  color: #e2858f;
}
</style>
