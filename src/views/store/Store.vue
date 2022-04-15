<template>
  <div class="store">
    <img src="~assets/img/logo.png" alt="logo" />
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
    >
      <el-menu-item index="1">
        <span slot="title" @click="retrunHome()"
          ><i class="el-icon-s-home"></i>首页</span
        >
      </el-menu-item>
      <el-menu-item index="2">
        <span slot="title"
          ><link-item path="/storeLogin/profile" :active-color="activeColor"
            ><i class="el-icon-user-solid"></i>个人资料</link-item
          ></span
        >
      </el-menu-item>
      <el-menu-item index="3">
        <span slot="title">
          <link-item path="/storeLogin/storeRelease" :active-color="activeColor"
            ><i class="el-icon-reading"></i>我的发布</link-item
          ></span
        >
      </el-menu-item>
      <el-menu-item index="4">
        <span slot="title"
          ><link-item path="/storeLogin/storeRental" :active-color="activeColor"
            ><i class="el-icon-thumb"></i>我要出租</link-item
          ></span
        >
      </el-menu-item>
      <el-menu-item index="5">
        <span slot="title"
          ><link-item path="/storeLogin/storeHouse" :active-color="activeColor"
            ><i class="el-icon-s-shop"></i>房源状态</link-item
          ></span
        >
      </el-menu-item>
      <el-menu-item index="6">
        <span slot="title"
          ><link-item path="/storeLogin/editPass" :active-color="activeColor"
            ><i class="el-icon-edit-outline"></i>修改密码</link-item
          ></span
        >
      </el-menu-item>
      <el-menu-item index="7" @click.native="outLogin">
        <i class="el-icon-switch-button"></i>
        <span slot="title">退出</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import LinkItem from "../../components/common/linkItem/LinkItem.vue";
export default {
  components: { LinkItem },
  name: "Store",
  component: {
    LinkItem,
  },
  data() {
    return {
      activeColor: "#D1B3B6",
      user: {},
    };
  },
  methods: {
    // 返回首页
    retrunHome() {
      this.$router.push({
        path: "/home",
        query: {
          username: this.user.username,
          role: this.user.role,
        },
      });
    },
    // 退出登录
    outLogin() {
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped>
.link-item {
  padding: 0;
}
.login-left img {
  margin-left: 12%;
}
.el-menu {
  width: 90%;
  margin: 10% 5%;
  border-right: 0;
  background-color: transparent;
  color: #fff;
}
.el-menu-item,
span {
  font-size: 16px;
  color: #fff;
}
.el-submenu /deep/ .el-submenu__title:hover {
  background-color: hsl(265, 50%, 71%, 0.2) !important;
  color: #fff;
}
.el-menu-item:hover {
  color: #fff;
  background-color: #af90da33 !important;
}
.is-active {
  color: #fff;
  background-color: hsl(265, 50%, 71%, 0.2);
}
</style>
