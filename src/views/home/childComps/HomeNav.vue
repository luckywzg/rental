<template>
  <div class="home-nav">
    <div class="nav w">
      <el-row class="nav-el">
        <!-- 首页左边 -->
        <el-col :span="8">
          <!-- 显示房源城市 赣州市 -->
          <h2 class="nav-city"><i class="el-icon-location"></i>赣州市</h2>
          <div class="lo-re-info">
            <!-- 登录后展示 用户名 -->
            <span
              @click="loginInfoClick()"
              class="profille"
              v-show="user.username"
              ><i slot="prefix" class="el-input__icon el-icon-user"></i
              >{{ user.username }}</span
            >
            <!-- 登录 注册 -->
            <div v-show="!user.username">
              <router-link class="nav-login" to="/login" target="_blank"
                >立即登录</router-link
              >
              /
              <router-link class="nav-register" to="/register" target="_blank"
                >注册</router-link
              >
            </div>
          </div>
        </el-col>
        <!-- 首页右边 -->
        <el-col :span="16" class="nav-right">
          <link-item path="/home"> 首页 </link-item>
          <!-- 租房分类 -->
          <el-dropdown>
            <span class="el-dropdown-link">
              租房分类<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item, index) in sort"
                :key="index"
                @click.native="sortClick(index, item)"
                >{{ item }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <!-- 个人中心 -->
          <el-dropdown @click.native="loginUserClick()">
            <span class="el-dropdown-link">
              个人中心<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="loginUserClick()"
                >我的账户</el-dropdown-item
              >
              <el-dropdown-item @click.native="loginUserClick()"
                >我的收藏</el-dropdown-item
              >
              <el-dropdown-item @click.native="loginUserClick()"
                >我的租房</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <!-- 商家中心 -->
          <el-dropdown @click.native="loginStoreInfoClick()">
            <span class="el-dropdown-link">
              商家中心<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                @click.native="loginStoreInfoClick()"
                v-for="(item, index) in store"
                :key="index"
                >{{ item }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import LinkItem from "../../../components/common/linkItem/LinkItem.vue";

export default {
  name: "HomeNav",
  components: {
    LinkItem,
  },
  props: {
    // 接收首页传递的user信息
    user: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      sort: ["区域", "学校", "地铁"],
      store: ["账户资料", "我的发布", "我的出租", "我的房源"],
    };
  },
  methods: {
    // 登录后展示用户名 被点击方法
    loginInfoClick() {
      if (this.user.role * 1 === 1) {
        // 判断登录是否为普通用户 为普通用户则跳转至用户后台
        this.$router.push({
          path: "/userLogin",
          query: {
            username: this.user.username,
            role: this.user.role,
          },
        });
      } else if (this.user.role * 1 === 2) {
        // 判断登录身份是否为商家 为商家则跳转至商家后台
        this.$router.push({
          path: "/storeLogin",
          query: {
            username: this.user.username,
            role: this.user.role,
          },
        });
      } else if (this.user.role * 1 === 3) {
        // 判断登录身份是否为管理员 为管理员则跳转至管理员后台
        this.$router.push({
          path: "/adminLogin",
          query: {
            username: this.user.username,
            role: this.user.role,
            uid: this.user.uid,
          },
        });
      } else {
        // 登录身份过期
        this.$message({
          message: "请先登录！",
          type: "error",
        });
      }
    },
    // 租房分类点击
    sortClick(index, item) {
      // 发射事件sortLink，控制下方筛选模块中 区域 学习 地铁 展示具体模块
      this.$bus.$emit("sortLink", index);
    },
    // 个人中心点击
    loginUserClick() {
      if (this.user.username) {
        // 判断是否登录，已登录user.username值有值则为true
        if (this.user.role * 1 === 1) {
          // 判断登录身份是否为普通用户
          this.$router.push({
            path: "/userLogin",
            query: {
              username: this.user.username,
              role: this.user.role,
            },
          });
        } else {
          this.$message({
            message: "登录身份需为普通用户！",
            type: "error",
          });
        }
      } else {
        this.$message({
          message: "请先登录！",
          type: "error",
        });
      }
    },
    // 商家中心点击
    loginStoreInfoClick() {
      // 判断是否登录，已登录user.username值有值则为true
      if (this.user.username) {
        if (this.user.role * 1 === 2) {
          // 判断登录身份是否为商家
          this.$router.push({
            path: "/storeLogin",
            query: {
              username: this.user.username,
              role: this.user.role,
            },
          });
        } else {
          this.$message({
            message: "登录身份需为商家！",
            type: "error",
          });
        }
      } else {
        this.$message({
          message: "请先登录！",
          type: "error",
        });
      }
    },
  },
};
</script>
<style scoped>
.home-nav {
  background-color: rgba(242, 242, 242, 0.502);
  border-bottom: 1px solid #e3e5e6;
}
.el-col {
  height: 36px;
  line-height: 36px;
}
.nav-el {
  font-size: 12px;
}
.nav-city {
  display: inline;
  font-weight: normal;
  padding-right: 8px;
  font-size: 12px;
  color: var(--color-high-text);
}
.switch-city {
  cursor: pointer;
}
.lo-re-info {
  display: inline-block;
  padding-left: 30px;
  cursor: pointer;
}
.nav-login {
  font-size: 12px;
  color: var(--color-high-text);
}
.el-input {
  width: 300px;
}
.nav-right {
  text-align: left;
  padding-left: 300px;
  vertical-align: middle;
}
.el-dropdown {
  height: 36px;
  line-height: 36px;
}
.el-dropdown-link {
  cursor: pointer;
  font-size: 12px;
  padding: 0 15px;
}
.el-dropdown-link:hover {
  color: var(--color-high-text);
}
</style>
