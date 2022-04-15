<template>
  <div class="login-info">
    <el-row>
      <!-- 左边菜单 -->
      <el-col :span="4" class="login-left">
        <slot></slot>
      </el-col>
      <!-- 右边对应路由内容展示区 -->
      <el-col :span="20" class="login-right">
        <div class="login-top"></div>
        <el-row>
          <el-col :span="24" :offset="0"> <router-view /></el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "LoginInfo",
};
</script>

<style scoped>
.login-info {
  width: 100%;
  height: 100vh;
  text-align: left;
  background: url(assets/img/login-info.jpg) no-repeat;
  background-attachment: fixed;
}
.login-left {
  display: inline-block;
  width: 20%;
  height: 100vh;
  padding-top: 2.5%;
  padding-left: 1%;
}
.login-right {
  display: inline-block;
  width: 80%;
  height: 100vh;
}
.login-top {
  width: 100%;
  height: 90px;
}
.login-top img {
  width: 100%;
  height: 100%;
}
</style>
