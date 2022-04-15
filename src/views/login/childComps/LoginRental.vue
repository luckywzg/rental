<template>
  <div class="profile">
    <div class="register-form">
      <h3>填写房源信息</h3>
      <!-- enctype需是form-data格式 -->
      <el-form
        class="form"
        :model="ruleForm"
        method="post"
        enctype="Mutilpart/form-data"
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
            placeholder="个人/经纪人"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 上传图片 -->
        <el-form-item
          class="img-update"
          prop="imgs"
          label-width="120px"
          label="图片："
          :label-position="labelPosition"
        >
          <!-- 上传图片 -->
          <el-upload
            class="upload-demo"
            action="/"
            :on-change="handleChange"
            :file-list="fileList"
            :before-upload="beforeUpload"
            :auto-upload="false"
            ref="upload"
            list-type="picture"
            accept="image/png,image/gif,image/jpg,image/jpeg"
          >
            <el-button class="img" size="small" type="primary"
              >点击上传</el-button
            >
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn">
      <el-button :plain="true" @click="submitForm('ruleForm')">提交</el-button>
    </div>
  </div>
</template>

<script>
import { postAddHouse } from "../../../network/admin";
export default {
  name: "LoginRental",
  data() {
    // 必输输入数字值的规范
    var checkNumber = (rule, value, callback) => {
      if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      } else {
        callback();
      }
    };
    // 验证电话号码的规范
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
    // 验证距离地铁的规范
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
      token: { Authorization: sessionStorage.getItem("token") },
      fileList: [],
      labelPosition: "right",
      update: true,
      ruleForm: {
        imgs: "",
        desc: "",
        address: "",
        detailAddress: "",
        price: "",
        type: "",
        house: "",
        pattern: "",
        loca: "",
        size: "",
        phone: "",
        from: "",
        subway: "",
        distance: "",
        school: "",
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
    submitForm(formName) {
      // 当图片为空时，整个表单信息不完整
      if (this.ruleForm.imgs === "") {
        this.$message.error("图片不能为空");
        return false;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 将要携带的信息，装在formdata中，需以文件形式上传
          let formdata = new FormData();
          formdata.append("imgs", this.ruleForm.imgs);
          formdata.append("description", this.ruleForm.desc);
          formdata.append("city", this.ruleForm.address);
          formdata.append("address", this.ruleForm.detailAddress);
          formdata.append("price", this.ruleForm.price);
          formdata.append("type_", this.ruleForm.type);
          formdata.append("mode", this.ruleForm.pattern);
          formdata.append("house_standard", this.ruleForm.house);
          formdata.append("orientation", this.ruleForm.loca);
          formdata.append("build_area", this.ruleForm.size);
          formdata.append("telephone", this.ruleForm.phone);
          formdata.append("resource_from", this.ruleForm.from);
          formdata.append("subway_num", this.ruleForm.subway);
          formdata.append("subway_distance", this.ruleForm.distance);
          formdata.append("school_type", this.ruleForm.school);
          // 发送请求添加房源信息
          postAddHouse(formdata)
            .then((res) => {
              if (res.data.success) {
                this.$message({
                  message: "添加房源成功！",
                  type: "success",
                });
              } else {
                this.$message.error("添加房源失败！");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.$message.error("请填正确且完整的房源信息！");
          return false;
        }
      });
    },
    // 图片上传后，将其保存
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-1);
      this.ruleForm.imgs = file.raw;
    },
    // 图片上传前检测文件大小是否在2M之内
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过2MB");
      }
      return isLt2M;
    },
  },
};
</script>

<style scoped>
.el-form-item .img {
  margin-top: 0;
  padding: 10px 20px;
  background-color: #fff;
  color: #606266;
  margin-left: 70px;
  border-color: #fff;
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
.profile {
  position: absolute;
  width: 1000px;
  /* height: 730px; */
  top: 0;
  left: 5%;
  text-align: center;
  border-radius: 20px;
  background-color: rgb(77, 59, 159, 0.5);
}
h3 {
  font-size: 28px;
  color: #fff;
  margin: 20px 0;
}
.el-form-item {
  display: inline-block;
  width: 380px;
  margin: 10px 15px;
}
.el-form-item /deep/ .el-form-item__label {
  color: #fff;
}
.el-button {
  font-weight: 700;
  font-size: 18px;
  padding: 15px 50px;
}
.el-button:hover {
  color: #3c6dd6;
}
.btn {
  margin-top: 0;
  margin-bottom: 20px;
}
</style>
