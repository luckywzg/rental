<template>
  <div class="home-header">
    <el-header height="80px">
      <!-- Header content -->
      <el-row class="w">
        <!-- logo -->
        <el-col :span="8" class="header-left">
          <img src="~assets/img/logo.png" alt="logo" />
        </el-col>
        <!-- 搜索区域 -->
        <el-col :span="16" class="header-right">
          <el-input
            v-model="input"
            placeholder="请输入房源相关信息"
            size="normal"
            clearable
            ><i slot="prefix" class="el-input__icon el-icon-search"></i
          ></el-input>
          <el-button type="primary" size="default" @click="btnClick"
            >搜房源</el-button
          >
        </el-col>
      </el-row>
    </el-header>
  </div>
</template>

<script>
import { getSearchHouses } from "../../../network/home";
export default {
  data() {
    return {
      input: "",
    };
  },
  methods: {
    btnClick() {
      // 发送请求，请求指定关键词的房源
      getSearchHouses(this.input)
        .then((res) => {
          // 请求成功之后发射事件，HomeMain中监听并接收
          this.$bus.$emit("areaChange", res.data);
        })
        .catch((err) => {
          console.log("请求数据失败", err);
        });
    },
  },
};
</script>

<style scoped>
.el-header {
  margin-top: 20px;
}
.el-col {
  height: 60px;
  line-height: 60px;
  text-align: left;
}
.el-input {
  width: 500px;
}
.el-input /deep/ .el-input__inner {
  height: 48px;
  border-radius: 6px 0 0 6px;
  border: 2px solid var(--color-high-text);
}
.el-button {
  height: 48px;
  border-radius: 0 6px 6px 0;
  font-size: 16px;
  border-color: var(--color-high-text);
  background-color: var(--color-high-text);
}
.header-ul {
  margin-left: 450px;
}
.header-ul li {
  float: left;
  font-size: 12px;
  padding: 0 10px;
}
</style>
