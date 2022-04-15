<template>
  <div class="home">
    <!-- 首页导航 -->
    <home-nav :user="user"></home-nav>
    <!-- 首页头部 -->
    <home-header></home-header>
    <!-- 首页筛选 -->
    <home-screen></home-screen>
    <!-- 首页房源 -->
    <home-main :user="user" :detail="detail"></home-main>
    <!-- 首页底部 -->
    <home-footer></home-footer>
  </div>
</template>

<script>
import { getHouses } from "../../network/home";

import HomeScreen from "./childComps/HomeScreen.vue";
import HomeHeader from "./childComps/HomeHeader.vue";
import HomeMain from "./childComps/HomeMain.vue";
import HomeFooter from "./childComps/HomeFooter.vue";
import HomeNav from "./childComps/HomeNav.vue";
export default {
  components: { HomeHeader, HomeScreen, HomeMain, HomeFooter, HomeNav },
  name: "Home",
  data() {
    return {
      user: {},
      detail: [],
      houseInfo: {
        city: "南康",
        price_low: 0,
        price_up: 1000,
        room_num: 1,
        mode: "整租",
        house_standard: "普通住宅",
        orientation: "朝东",
      },
    };
  },
  methods: {},
  created() {
    // axios二次封装后，请求首页房源信息展示数据
    getHouses(this.houseInfo)
      .then((res) => {
        // 最开始的默认数据（区域）
        this.detail = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {
    this.user = this.$route.query;
  },
};
</script>
<style scoped>
.home {
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
  /* background: url(assets/img/homebgc.jpg) no-repeat; */
  /* background-attachment: fixed; */
}
</style>
