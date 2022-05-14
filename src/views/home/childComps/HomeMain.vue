<template>
  <div class="main-content w">
    <!-- 标题 -->
    <ul class="main-ul clear-fix">
      <li class="active">
        <a href="#">赣州出租房</a>
      </li>
    </ul>
    <div class="main" v-if="detailList.length === 0">
      <!-- 房源信息展示 -->
      <el-row v-for="(item, index) in detail" :key="index">
        <!-- 图片 -->
        <el-col :span="5" class="main-left">
          <img @click="detailClick(item)" :src="item.img_src" alt="房源图" />
        </el-col>
        <!-- 信息 -->
        <el-col :span="19" class="main-center">
          <!-- 房源描述 -->
          <h2 @click="detailClick(item)">{{ item.description }}</h2>
          <!-- 房源价格 -->
          <div class="price">
            <h3>{{ item.price }}</h3>
            <span>元/月</span>
          </div>
          <div>
            <!-- 居室 -->
            <span>{{ item.type_ }}</span>
            <!-- 建筑面积 -->
            <span>{{ item.build_area }}m²</span>
          </div>
          <div>
            <!-- 朝向 -->
            <span>{{ item.orientation }}</span>
            <!-- 户型 -->
            <span>{{ item.house_standard }}</span>
          </div>
          <div>
            <!-- 房源来自 -->
            <p>{{ item.resource_from }}</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="main" v-else>
      <!-- 房源信息展示 -->
      <el-row v-for="(item, index) in detailList" :key="index">
        <el-card shadow="always">
          <!-- 图片 -->
          <el-col :span="5" class="main-left">
            <img @click="detailClick(item)" :src="item.img_src" alt="房源图" />
          </el-col>
          <!-- 信息 -->
          <el-col :span="19" class="main-center">
            <!-- 房源描述 -->
            <h2 @click="detailClick(item)">{{ item.description }}</h2>
            <!-- 房源价格 -->
            <div class="price">
              <h3>{{ item.price }}</h3>
              <span>元/月</span>
            </div>
            <div>
              <!-- 居室 -->
              <span>{{ item.type_ }}</span>
              <!-- 建筑面积 -->
              <span>{{ item.build_area }}m²</span>
            </div>
            <div>
              <!-- 朝向 -->
              <span>{{ item.orientation }}</span>
              <!-- 户型 -->
              <span>{{ item.house_standard }}</span>
            </div>
            <div>
              <!-- 房源来自 -->
              <p>{{ item.resource_from }}</p>
            </div>
          </el-col>
        </el-card>
      </el-row>
    </div>
    <!-- 点击房源图片或者房源描述弹出框 -->
    <el-dialog
      title="房源详情"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <div class="detail-brand">
        <div class="detail-content">
          <!-- 房源描述 -->
          <h1>{{ houseDetailInfo.description }}</h1>
          <!-- 房源ID -->
          <span class="type">房源ID：{{ houseDetailInfo.uuid }}</span>
          <span class="city">[赣州市]</span>
          <!-- 房源地址 -->
          <span>{{ houseDetailInfo.address }}</span>
          <el-row>
            <el-col :span="14">
              <!-- 轮播 -->
              <el-carousel height="300px">
                <el-carousel-item v-for="(item, index) in imgList" :key="index">
                  <!-- 轮播图 -->
                  <img class="carousel-img" :src="item" :alt="item" />
                </el-carousel-item>
              </el-carousel>
            </el-col>
            <el-col :span="10" class="rate-col">
              <div class="rate">
                <div class="rate-top">
                  <!-- 价格 -->
                  <span class="rate-five"> {{ houseDetailInfo.price }} </span>
                  <span class="five-d">元/月</span>
                  <div class="info-first">
                    <div class="info-first-top">
                      <!-- 出租方式 -->
                      <span>{{ houseDetailInfo.mode }}</span>
                      <!-- 户型 -->
                      <span>{{ houseDetailInfo.house_standard }}</span>
                      <!-- 建筑面积 -->
                      <span>{{ houseDetailInfo.build_area }}m²</span>
                    </div>
                    <div class="info-first-bot">
                      <span class="tele">出租方式</span
                      ><span class="tele-phone">户型</span><span>建筑面积</span>
                    </div>
                  </div>
                  <div class="info-first">
                    <div class="info-first-top">
                      <!-- 朝向 -->
                      <span>{{ houseDetailInfo.orientation }}</span>
                      <!-- 类型 -->
                      <span>{{ houseDetailInfo.type_ }}</span>
                      <!-- 联系电话 -->
                      <span>{{ houseDetailInfo.telephone }}</span>
                    </div>
                    <div class="info-first-bot">
                      <span>朝向</span><span>类型</span><span>联系电话</span>
                    </div>
                  </div>
                </div>
                <div class="rate-bot">
                  <!-- 地址 -->
                  <p>地址：{{ houseDetailInfo.address }}</p>
                  <div class="rental">
                    <!-- 收藏按钮 -->
                    <el-button
                      size="default"
                      type="danger"
                      @click="collectClick()"
                      class="collect"
                      ><i
                        class="el-icon-star-off"
                        :class="{ starOn: collectOn }"
                      ></i
                      >{{ collectInfo }}</el-button
                    >
                    <!-- 出租按钮 -->
                    <el-button
                      :disabled="disabled"
                      size="default"
                      type="danger"
                      @click="rentalClick()"
                      >{{ rentalInfo }}</el-button
                    >
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- 弹出框的确定和取消按钮 -->
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getImgs } from "../../../network/home";
import {
  postCollection,
  postCancelCollection,
  postRentHouse,
} from "../../../network/user";
export default {
  name: "HomeMain",
  props: {
    // 接收从首页传递过来的登录用户数据
    user: {
      type: Object,
      default() {
        return {};
      },
    },
    // 接收从首页传递过来的房源信息
    detail: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      collectOn: false,
      disabled: false,
      collectInfo: "收藏",
      rentalInfo: "确定租用",
      houseDetailInfo: {},
      imgList: [],
      dialogVisible: false,
      detailList: [],
    };
  },
  methods: {
    // 房源详情点击
    detailClick(item) {
      // 出租按钮和收藏按钮默认为false
      this.disabled = false;
      this.collectOn = false;
      // 按钮信息
      this.rentalInfo = "确定租用";
      this.collectInfo = "收藏";
      // 获取当前点击的房源信息并保存在houseDetailInfo中
      this.houseDetailInfo = item;
      // 添加是否收藏，是否出租字段
      this.houseDetailInfo.collectInfo = this.collectInfo;
      this.houseDetailInfo.rentalInfo = this.rentalInfo;
      // 打开弹窗
      this.dialogVisible = true;
      // 请求轮播图片
      getImgs(this.houseDetailInfo.uuid)
        .then((res) => {
          console.log("图片请求数据成功");
          this.imgList = res.data;
        })
        .catch((err) => {
          console.log("图片请求数据失败", err);
        });
    },
    // 详情弹窗右上角关闭
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    // 收藏按钮监听点击
    collectClick() {
      // 添加收藏数据
      postCollection(this.houseDetailInfo.uuid)
        .then((res) => {
          console.log(this.user.role);
          if (this.user.role * 1 === 1) {
            if (res.data.success) {
              this.collectInfo = "已收藏";
              this.collectOn = true;
              this.$message({
                message: "收藏成功！",
                type: "success",
                offset: 190,
              });
            }
            if (res.data.error) {
              this.$message({
                message: "请先登录！",
                type: "error",
                offset: 190,
              });
            }
          } else {
            this.$message({
              message: "只有普通用户才能收藏房源哦！",
              type: "error",
              offset: 190,
            });
          }
        })
        .catch(() => {
          postCancelCollection(this.houseDetailInfo.uuid)
            .then((res) => {
              if (res.data.success) {
                this.collectInfo = "收藏";
                this.collectOn = false;
                this.$message({
                  type: "success",
                  message: "取消收藏成功!",
                });
                rows.splice(index, 1);
              } else {
                this.$message({
                  type: "error",
                  message: res.data.error,
                });
              }
            })
            .catch((err) => {
              console.log("取消收藏失败", err);
            });
        });
    },
    // 租房按钮监听点击
    rentalClick() {
      postRentHouse(this.houseDetailInfo.uuid)
        .then((res) => {
          if (this.user.role * 1 === 1) {
            if (res.data.success) {
              this.rentalInfo = "已租用";
              this.disabled = true;
              this.$message({
                message: "租房成功！",
                type: "success",
                offset: 190,
              });
            }
            if (res.data.error) {
              this.$message({
                message: "请先登录！",
                type: "error",
                offset: 190,
              });
            }
          } else {
            this.$message({
              message: "只有普通用户才能租用房源哦！",
              type: "error",
              offset: 190,
            });
          }
        })
        .catch(() => {
          this.$message({
            message: "该房源已租用！",
            type: "error",
            offset: 190,
          });
          this.rentalInfo = "已租用";
          this.disabled = true;
        });
    },
  },
  mounted() {
    // 接收 区域 学校 地铁 点击请求后返回的数据
    this.$bus.$on("areaChange", (res) => {
      this.detailList = res;
    });
  },
};
</script>

<style scoped>
.main-content {
  position: relative;
}
.main {
  width: 1200px;
}
.main-ul {
  padding-top: 30px;
  border-bottom: 2px solid #ff5777;
  margin-bottom: 20px;
}
.main-ul li {
  float: left;
  padding: 10px 30px;
}
.active {
  background-color: #ff5777;
}
.active a {
  color: #fff;
}
.main .el-row {
  height: 180px;
  margin-bottom: 20px;
}
.main .el-row:hover {
  background-color: #fff;
  box-shadow: 0 0 4px 4px pink;
}
.main-left img {
  width: 160px;
  height: 130px;
  margin: 20px 0;
  cursor: pointer;
}
.main-center {
  height: 130px;
  margin: 20px 0;
  position: relative;
  text-align: left;
  padding-left: 25px;
  font-size: 12px;
}
.main-center h2 {
  cursor: pointer;
  font-weight: 700;
  font-size: 18px;
  padding-top: 5px;
}
.main-center h2:hover {
  color: #ff5777;
  text-decoration: underline;
}
.main-center span {
  display: inline-block;
  padding: 15px 10px 0 0;
}
.main-center p {
  padding-top: 15px;
  color: #ff5777;
}
.price {
  position: absolute;
  right: 10px;
}
.price h3 {
  display: inline-block;
  color: #ff5777;
  font-size: 28px;
  padding-right: 2px;
}
.main-right {
  position: absolute;
  display: inline-block;
  right: 0px;
  top: 60px;
  width: 150px;
  text-align: left;
}
.main-right h2 {
  font-size: 18px;
  font-weight: normal;
  padding-bottom: 8px;
}

.main-right img {
  width: 149px;
  height: 100px;
}
.main-right p {
  font-size: 12px;
  white-space: nowrap;
  padding-top: 13px;
  padding-bottom: 2px;
  padding-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.main-right span {
  width: 20px;
  font-size: 12px;
  padding-left: 10px;
  padding-right: 10px;
}
.main-right .main-right-price {
  font-size: 16px;
  padding-top: 0px;
  padding-bottom: 15px;
  color: #ff5777;
}
.detail-brand {
  width: 1100px;
  height: 480px;
  margin: 0 auto;
  border-bottom: 2px solid #f7f7f7;
  box-shadow: 0 1px 18px 0 rgb(226, 225, 225) inset;
}
.detail-content {
  width: 1035px;
  height: 480px;
  margin: 0 auto;
  text-align: left;
  padding-top: 10px;
  padding-bottom: 10px;
}
.detail-content h1 {
  font-size: 26px;
  color: #333333;
}
.detail-content .type {
  font-style: 14px;
  padding-right: 20px;
  color: #b4b0b0;
}
.city {
  color: var(--color-high-text);
}
.el-carousel {
  width: 580px;
  margin-top: 10px;
  height: 330px;
  border-radius: 10px;
}

.el-carousel__item {
  width: 580px;
  border-radius: 10px;
  height: 330px;
}
.carousel-img {
  width: 580px;
  height: 330px;
  border-radius: 10px;
}
.rate {
  height: 330px;
  margin-top: 10px;
  border: 1px solid #ddd;
}
.rate-top {
  font-size: 14px;
  padding: 10px 15px;
}
.rate-top .rate-five {
  display: inline-block;
  font-weight: 700;
  line-height: 70px;
  text-align: center;
  font-size: 34px;
  color: var(--color-high-text);
  background-color: #fff;
}
.five-d {
  font-size: 14px;
}
.info-first {
  width: 100%;
  height: 80px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}
.info-first span {
  display: inline-block;
  width: 33%;
}
.info-first-top span {
  padding: 15px 10px 0 10px;
  font-size: 18px;
  color: #333;
}
.info-first-bot span {
  font-size: 14px;
  padding-top: 5px;
  color: rgb(145, 143, 143);
}
.rate p {
  margin-top: 10px;
  padding-left: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rental {
  text-align: right;
}
.el-button {
  margin-top: 10px;
  background-color: #ff5777;
  border-color: #ff5777;
  color: #fff;
}
.rental .collect {
  background-color: transparent;
  color: #333;
  border-color: transparent;
}
.starOn {
  color: rgb(255, 153, 0);
}
</style>
