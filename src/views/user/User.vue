<template>
  <div class="user">
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
        <span slot="title">
          <link-item
            path="/userLogin/profile"
            :user="user.user"
            :active-color="activeColor"
            ><i class="el-icon-user-solid"></i>个人资料</link-item
          >
        </span>
      </el-menu-item>
      <el-menu-item index="3">
        <span slot="title">
          <link-item path="/userLogin/userHouseInfo" :active-color="activeColor"
            ><i class="el-icon-reading"></i>租房信息</link-item
          ></span
        >
      </el-menu-item>
      <el-menu-item index="4">
        <span slot="title"
          ><link-item path="/userLogin/userCollect" :active-color="activeColor"
            ><i class="el-icon-star-on"></i>收藏夹</link-item
          ></span
        >
      </el-menu-item>
      <el-menu-item index="6">
        <span slot="title"
          ><link-item path="/userLogin/editPass" :active-color="activeColor"
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
  name: "User",
  props: {
    user: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  component: {
    LinkItem,
  },
  data() {
    return {
      activeColor: "#D1B3B6",
      isActive: false,
    };
  },
  methods: {
    linkClick() {
      this.isActive = true;
      console.log(111);
    },
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
.user-profile {
  color: #fff;
}
.active {
  color: #d1b3b6;
}
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
