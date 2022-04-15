<template>
  <div class="profile">
    <div class="register-form">
      <el-form
        class="form"
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
      >
        <!-- 房源描述 -->
        <el-form-item
          label-width="120px"
          label="房源描述："
          :label-position="labelPosition"
          prop="desc"
        >
          <el-input
            placeholder="XXXXXX"
            v-model="ruleForm.desc"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 房源地址 -->
        <el-form-item
          label-width="120px"
          label="房源地址："
          :label-position="labelPosition"
          prop="address"
        >
          <el-input
            placeholder="南康"
            v-model.number="ruleForm.address"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 详细地址 -->
        <el-form-item
          label-width="120px"
          label="详细地址："
          :label-position="labelPosition"
          prop="detailAddress"
        >
          <el-input
            v-model="ruleForm.detailAddress"
            placeholder="XXXXXX"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 价格 -->
        <el-form-item
          label-width="120px"
          label="价格："
          :label-position="labelPosition"
          prop="price"
        >
          <el-input
            v-model.number="ruleForm.price"
            placeholder="0"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 类型 -->
        <el-form-item
          prop="type"
          label-width="120px"
          label="类型："
          :label-position="labelPosition"
        >
          <el-input
            v-model="ruleForm.type"
            placeholder="1室1厅1卫"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 户型 -->
        <el-form-item
          label-width="120px"
          label="户型："
          :label-position="labelPosition"
          prop="house"
        >
          <el-input
            v-model="ruleForm.house"
            placeholder="普通住宅"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 方式 -->
        <el-form-item
          label-width="120px"
          label="方式："
          :label-position="labelPosition"
          prop="pattern"
        >
          <el-input
            v-model="ruleForm.pattern"
            placeholder="整租"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 朝向 -->
        <el-form-item
          prop="loca"
          label-width="120px"
          label="朝向："
          :label-position="labelPosition"
        >
          <el-input
            v-model="ruleForm.loca"
            placeholder="朝南"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 建筑面积 -->
        <el-form-item
          label-width="120px"
          label="建筑面积："
          :label-position="labelPosition"
          prop="size"
        >
          <el-input
            v-model.number="ruleForm.size"
            placeholder="0"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 地铁线 -->
        <el-form-item
          prop="subway"
          label-width="120px"
          label="地铁线："
          :label-position="labelPosition"
        >
          <el-input
            placeholder="1号线"
            v-model="ruleForm.subway"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 距离地铁 -->
        <el-form-item
          prop="distance"
          label-width="120px"
          label="距离地铁："
          :label-position="labelPosition"
        >
          <el-input
            placeholder="500"
            v-model.number="ruleForm.distance"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 学校 -->
        <el-form-item
          prop="school"
          label-width="120px"
          label="学校："
          :label-position="labelPosition"
        >
          <el-input
            placeholder="大学"
            v-model="ruleForm.school"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 联系电话 -->
        <el-form-item
          prop="phone"
          label-width="120px"
          label="电话："
          :label-position="labelPosition"
        >
          <el-input
            v-model.number="ruleForm.phone"
            placeholder="181XXXXXXXX"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 房源来自 -->
        <el-form-item
          prop="from"
          label-width="120px"
          label="来自："
          :label-position="labelPosition"
        >
          <el-input
            v-model="ruleForm.from"
            placeholder="个人 / 经纪人"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn">
      <!-- 修改我的发布房源信息按钮 -->
      <el-button @click="submitForm('ruleForm')" type="primary"
        >提交修改</el-button
      >
    </div>
  </div>
</template>

<script>
import { postUpdateHouse } from "../../../network/admin";
export default {
  name: "LoginEdit",
  props: {
    editData: {
      type: Object,
      default() {
        return {
          uuid: "",
          imgs: [],
          description: "",
          city: "",
          address: "",
          price: "",
          type_: "",
          mode: "",
          house_standard: "",
          orientation: "",
          build_area: "",
          telephone: "",
          resource_from: "",
          subway_num: "",
          subway_distance: "",
          school_type: "",
        };
      },
    },
  },
  data() {
    // 设置输入必须为数字值规则
    var checkNumber = (rule, value, callback) => {
      if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      } else {
        callback();
      }
    };
    // 设置电话号码规则
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
    // 设置距离地铁规则
    var checkDistance = (rule, value, callback) => {
      if (this.ruleForm.subway) {
        if (value === "" || value === undefined || value == null) {
          callback(new Error("距离地铁不能为空"));
        } else if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      success: false,
      fileList: [],
      labelPosition: "right",
      update: true,
      ruleForm: {
        imgs: [],
        uuid: this.editData.uuid,
        desc: this.editData.description,
        address: this.editData.city,
        detailAddress: this.editData.address,
        price: this.editData.price,
        type: this.editData.type_,
        house: this.editData.house_standard,
        pattern: this.editData.mode,
        loca: this.editData.orientation,
        size: this.editData.build_area,
        phone: this.editData.telephone,
        from: this.editData.resource_from,
        subway: this.editData.subway_num,
        distance: this.editData.subway_distance,
        school: this.editData.school_type,
      },
      rules: {
        desc: [
          { required: true, message: "请输入房源描述", trigger: "blur" },
          {
            min: 3,
            max: 40,
            message: "长度在 3 到 40 个字符",
            trigger: ["blur", "change"],
          },
        ],
        address: [
          { required: true, message: "地址不能为空", trigger: "blur" },
          {
            min: 2,
            max: 5,
            message: "长度在 2 到 5 个字符",
            trigger: "blur",
          },
        ],
        detailAddress: [
          { required: true, message: "详细地址不能为空", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "长度在 5 到 20 个字符",
            trigger: "blur",
          },
        ],
        type: [
          { required: true, message: "类型不能为空", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],
        house: [
          { required: true, message: "户型不能为空", trigger: "blur" },
          {
            min: 2,
            max: 5,
            message: "长度在 2 到 5 个字符",
            trigger: "blur",
          },
        ],
        pattern: [
          { required: true, message: "方式不能为空", trigger: "blur" },
          {
            min: 2,
            max: 5,
            message: "长度在 3 到 5 个字符",
            trigger: "blur",
          },
        ],
        loca: [
          { required: true, message: "朝向不能为空", trigger: "blur" },
          {
            min: 2,
            max: 5,
            message: "长度在 2 到 5 个字符",
            trigger: "blur",
          },
        ],
        price: [
          { required: true, message: "价格不能为空", trigger: "blur" },
          { validator: checkNumber, trigger: "blur" },
        ],
        size: [
          { required: true, message: "建筑面积不能为空", trigger: "blur" },
          { validator: checkNumber, trigger: "blur" },
        ],
        subway: [
          { required: false, message: "", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        distance: [{ validator: checkDistance, trigger: "blur" }],
        school: [
          { required: false, message: "", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        from: [
          { required: true, message: "房源来自不能为空", trigger: "blur" },
          {
            min: 2,
            max: 5,
            message: "长度在 2 到 5 个字符",
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "电话号码不能为空", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 提交修改后的我的发布房源信息
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 发送请求更新房源信息
          postUpdateHouse(this.ruleForm)
            .then((res) => {
              console.log(res);
              if (res.data.success) {
                this.success = true;
                this.$message({
                  message: "编辑房源成功！",
                  type: "success",
                });
              } else {
                this.$message.error("编辑房源失败！");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.$message.error("请填写正确且完整的房源信息！");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.profile {
  width: 900px;
  margin: 0 auto;
  text-align: center;
  border-radius: 20px;
}
.el-form-item .img {
  margin-top: 0;
  padding: 10px 20px;
  margin-left: 70px;
}
.el-form .img-update {
  width: 790px;
  text-align: left;
}
.upload-demo {
  width: 260px;
}
.el-upload__tip {
  margin-left: 15px;
  margin-top: 0;
  color: #fff;
}
.upload-demo /deep/ .el-upload-list__item-name {
  color: #fff;
}
.upload-demo /deep/ .el-upload-list__item-name:hover {
  color: #606266;
}

.el-form-item {
  display: inline-block;
  width: 380px;
  margin: 10px 15px;
}
.el-form-item /deep/ .el-form-item__label {
  color: rgb(116, 112, 112);
}
.el-button {
  font-weight: 700;
  font-size: 18px;
  padding: 15px 50px;
}
.btn {
  margin-top: 0;
}
</style>
