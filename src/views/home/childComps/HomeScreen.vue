<template>
  <div class="home-screen">
    <div class="screen w">
      <ul class="screen-ul clear-fix">
        <!-- 区域 学校 地铁 -->
        <li
          :class="{ active: liIndex == index }"
          v-for="(item, index) in sortList"
          :key="index"
          @click="liClick(index)"
        >
          <a href="#">{{ item }}</a>
        </li>
        <li class="screen-ul-li-last">
          <a href="#"></a>
        </li>
      </ul>
      <!-- 区域部分筛选具体条件 -->
      <div class="screen-dl-list" v-show="area">
        <!-- 区域 -->
        <dl class="screen-dl clear-fix">
          <dt>区域：</dt>
          <dd
            v-for="(item, index) in areaList"
            :key="index"
            @click="areaClick(item, index)"
          >
            <a href="#" :class="{ active: areaIndex == index }">{{ item }}</a>
          </dd>
        </dl>
        <!-- 租金 -->
        <dl class="screen-dl clear-fix">
          <dt>租金：</dt>
          <dd
            @click="priceClick(item, index)"
            v-for="(item, index) in priceList"
            :key="index"
          >
            <a href="#" :class="{ active: priceIndex == index }">{{ item }}</a>
          </dd>
        </dl>
        <!-- 户型 -->
        <dl class="screen-dl clear-fix">
          <dt>户型：</dt>
          <dd
            @click="houseClick(item, index)"
            v-for="(item, index) in houseList"
            :key="index"
          >
            <a href="#" :class="{ active: houseIndex == index }">{{ item }}</a>
          </dd>
        </dl>
        <!-- 方式 -->
        <dl class="screen-dl clear-fix">
          <dt>方式：</dt>
          <dd
            @click="patternClick(item, index)"
            v-for="(item, index) in patternList"
            :key="index"
          >
            <a :class="{ active: patternIndex == index }" href="#">{{
              item
            }}</a>
          </dd>
        </dl>
        <!-- 类型 -->
        <dl class="screen-dl clear-fix">
          <dt>类型：</dt>
          <dd
            @click="typeClick(item, index)"
            v-for="(item, index) in typeList"
            :key="index"
          >
            <a :class="{ active: typeIndex == index }" href="#">{{ item }}</a>
          </dd>
        </dl>
        <!-- 朝向 -->
        <dl class="screen-dl clear-fix">
          <dt>朝向：</dt>
          <dd
            @click="orientaClick(item, index)"
            v-for="(item, index) in orientaList"
            :key="index"
          >
            <a :class="{ active: orientaIndex == index }" href="#">{{
              item
            }}</a>
          </dd>
        </dl>
      </div>
      <!-- 地铁部分筛选具体条件 -->
      <div class="screen-dl-list" v-show="subway">
        <!-- 地铁线 -->
        <dl class="screen-dl clear-fix">
          <dt>地铁：</dt>
          <dd
            @click="subClick(item, index)"
            v-for="(item, index) in subList"
            :key="index"
          >
            <a :class="{ active: subIndex == index }" href="#">{{ item }}</a>
          </dd>
        </dl>
        <!-- 距离地铁 -->
        <dl class="screen-dl clear-fix">
          <dt>距离：</dt>
          <dd
            @click="distanceClick(item, index)"
            v-for="(item, index) in distanceList"
            :key="index"
          >
            <a :class="{ active: distanceIndex == index }" href="#">{{
              item
            }}</a>
          </dd>
        </dl>
        <!-- 租金 -->
        <dl class="screen-dl clear-fix">
          <dt>租金：</dt>
          <dd
            @click="priceClick(item, index)"
            v-for="(item, index) in priceList"
            :key="index"
          >
            <a href="#" :class="{ active: priceIndex == index }">{{ item }}</a>
          </dd>
        </dl>
        <!-- 户型 -->
        <dl class="screen-dl clear-fix">
          <dt>户型：</dt>
          <dd
            @click="houseClick(item, index)"
            v-for="(item, index) in houseList"
            :key="index"
          >
            <a href="#" :class="{ active: houseIndex == index }">{{ item }}</a>
          </dd>
        </dl>
        <!-- 方式 -->
        <dl class="screen-dl clear-fix">
          <dt>方式：</dt>
          <dd
            @click="patternClick(item, index)"
            v-for="(item, index) in patternList"
            :key="index"
          >
            <a :class="{ active: patternIndex == index }" href="#">{{
              item
            }}</a>
          </dd>
        </dl>
        <!-- 类型 -->
        <dl class="screen-dl clear-fix">
          <dt>类型：</dt>
          <dd
            @click="typeClick(item, index)"
            v-for="(item, index) in typeList"
            :key="index"
          >
            <a :class="{ active: typeIndex == index }" href="#">{{ item }}</a>
          </dd>
        </dl>
        <!-- 朝向 -->
        <dl class="screen-dl clear-fix">
          <dt>朝向：</dt>
          <dd
            @click="orientaClick(item, index)"
            v-for="(item, index) in orientaList"
            :key="index"
          >
            <a :class="{ active: orientaIndex == index }" href="#">{{
              item
            }}</a>
          </dd>
        </dl>
      </div>
      <!-- 学校部分筛选具体条件 -->
      <div class="screen-dl-list" v-show="school">
        <!-- 学校 -->
        <dl class="screen-dl clear-fix">
          <dt>类别：</dt>
          <dd
            @click="schClick(item, index)"
            v-for="(item, index) in schList"
            :key="index"
          >
            <a :class="{ active: schIndex == index }" href="#">{{ item }}</a>
          </dd>
        </dl>
        <!-- 区域 -->
        <dl class="screen-dl clear-fix">
          <dt>区域：</dt>
          <dd
            @click="areaClick(item, index)"
            v-for="(item, index) in areaList"
            :key="index"
          >
            <a :class="{ active: areaIndex == index }" href="#">{{ item }}</a>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAreaHouses,
  getSchoolHouses,
  getSubwayHouses,
} from "../../../network/home";
export default {
  name: "HomeScreen",
  data() {
    return {
      detailList: [],
      areaAll: {
        area: "南康",
        priceLow: 0,
        priceHigh: 1000,
        house: 1,
        pattern: "整租",
        type: "普通住宅",
        orienta: "南北通透",
      },
      subAll: {
        sub: "1号线",
        distanceLow: 0,
        distanceHigh: 500,
        priceLow: 0,
        priceHigh: 1000,
        house: 1,
        pattern: "整租",
        type: "普通住宅",
        orienta: "南北通透",
      },
      schAll: { sch: "幼儿园", area: "南康" },
      areaIndex: 0,
      subIndex: 0,
      schIndex: 0,
      priceIndex: 0,
      patternIndex: 0,
      typeIndex: 0,
      orientaIndex: 0,
      houseIndex: 0,
      distanceIndex: 0,
      liIndex: 0,
      area: true,
      school: false,
      subway: false,
      houseId: "",
      sortList: ["区域", "学校", "地铁"],
      areaList: [
        "南康",
        "上犹",
        "站北",
        "兴国",
        "大余",
        "信丰",
        "石城",
        "于都",
        "章江新区",
        "安远",
        "定南",
        "龙南",
        "开发区",
        "全南",
        "会昌",
        "赣县",
        "崇义",
      ],
      subList: ["1号线", "2号线", "3号线", "4号线", "10号线"],
      distanceList: ["500米以内", "500-800米", "800-1000米"],
      schList: ["幼儿园", "小学", "初中", "高中", "大学"],
      priceList: [
        "1000元以下",
        "1000-2000元",
        "2000-3000元",
        "3000-4000元",
        "4000-5000元",
        "5000元以上",
      ],
      houseList: ["一居", "二居", "三居", "四居", "四居以上"],
      patternList: ["整租", "合租"],
      typeList: [
        "普通住宅",
        "公寓",
        "别墅",
        "平房",
        "民宿",
        "花园洋房",
        "小独栋",
        "空中别墅",
      ],
      orientaList: ["南北通透", "东西向", "朝南", "朝北", "朝东", "朝西"],
    };
  },
  mounted() {
    // 接收从导航点击租房分类下的区域、学校、地铁的点击，并跳转至对应界面
    this.$bus.$on("sortLink", (res) => {
      this.liIndex = res;
      this.liSwitch();
    });
  },
  created() {},
  methods: {
    // 当点击 区域 时，请求符合默认筛选条件的数据
    areaAxios() {
      getAreaHouses(this.areaAll)
        .then((res) => {
          console.log("区域请求数据成功");
          this.$bus.$emit("areaChange", res.data);
        })
        .catch((err) => {
          console.log("区域请求数据失败", err);
        });
    },
    // 当点击 学校 时，请求符合默认筛选条件的数据
    schAxios() {
      getSchoolHouses(this.schAll)
        .then((res) => {
          this.$bus.$emit("areaChange", res.data);
        })
        .catch((err) => {
          console.log("学校请求数据失败", err);
        });
    },
    // 当点击 地铁 时，请求符合默认筛选条件的数据
    subAxios() {
      getSubwayHouses(this.subAll)
        .then((res) => {
          this.$bus.$emit("areaChange", res.data);
        })
        .catch((err) => {
          console.log("地铁请求数据失败", err);
        });
    },
    // 监听 区域 学校 地铁 点击
    liClick(index) {
      this.liIndex = index;
      this.liSwitch();
    },
    // 判断具体是 区域、学校还是地铁
    liSwitch() {
      switch (this.liIndex) {
        case 0:
          this.allIndex();
          this.area = true;
          this.school = false;
          this.subway = false;
          this.areaAxios();
          break;
        case 1:
          this.allIndex();
          this.area = false;
          this.school = true;
          this.subway = false;
          this.schAxios();
          break;
        case 2:
          this.allIndex();
          this.area = false;
          this.school = false;
          this.subway = true;
          this.subAxios();
          break;
        default:
          console.log("错误！");
      }
    },
    // 重置所有index为0
    allIndex() {
      this.areaIndex = 0;
      this.subIndex = 0;
      this.schIndex = 0;
      this.priceIndex = 0;
      this.patternIndex = 0;
      this.typeIndex = 0;
      this.orientaIndex = 0;
      this.houseIndex = 0;
      this.distanceIndex = 0;
    },
    // 监听筛选条件中的区域点击
    areaClick(item, index) {
      this.areaIndex = index;
      if (this.area) {
        this.areaAll.area = item;
        this.areaAxios();
      } else if (this.school) {
        this.schAll.area = item;
        this.schAxios();
      } else {
        console.log("err");
      }
    },
    // 监听筛选条件中的地铁线点击
    subClick(item, index) {
      this.subIndex = index;
      this.subAll.sub = item;
      this.subAxios();
    },
    // 监听筛选条件中的学校点击
    schClick(item, index) {
      this.schIndex = index;
      this.schAll.sch = item;
      this.schAxios();
    },
    // 监听筛选条件中的价格点击
    priceClick(item, index) {
      console.log(index);
      this.priceIndex = index;
      let priceL = 0;
      let priceH = 0;
      switch (index) {
        case 0:
          priceL = 0;
          priceH = 1000;
          break;
        case 1:
          priceL = 1000;
          priceH = 2000;
          break;
        case 2:
          priceL = 2000;
          priceH = 3000;
          break;
        case 3:
          priceL = 3000;
          priceH = 4000;
          break;
        case 4:
          priceL = 4000;
          priceH = 5000;
          break;
        case 5:
          priceL = 5000;
          priceH = 10000000;
          break;
      }
      if (this.area) {
        this.areaAll.priceLow = priceL;
        this.areaAll.priceHigh = priceH;
        this.areaAxios();
      }
      if (this.subway) {
        this.subAll.priceLow = priceL;
        this.subAll.priceHigh = priceH;
        this.subAxios();
      }
    },
    // 监听筛选条件中的户型点击（一居室）点击
    houseClick(item, index) {
      this.houseIndex = index;
      let houseNum = 0;
      switch (index) {
        case 0:
          houseNum = 1;
          break;
        case 1:
          houseNum = 2;
          break;
        case 2:
          houseNum = 3;
          break;
        case 3:
          houseNum = 4;
          break;
        case 4:
          houseNum = 5;
          break;
      }
      if (this.area) {
        this.areaAll.house = houseNum;
        this.areaAxios();
      }
      if (this.subway) {
        this.subAll.house = houseNum;
        this.subAxios();
      }
    },
    // 监听筛选条件中的方式（整租）点击
    patternClick(item, index) {
      this.patternIndex = index;
      if (this.area) {
        this.areaAll.pattern = item;
        this.areaAxios();
      }
      if (this.subway) {
        this.subAll.pattern = item;
        this.subAxios();
      }
    },
    // 监听筛选条件中的类型（普通住宅）点击
    typeClick(item, index) {
      this.typeIndex = index;
      if (this.area) {
        this.areaAll.type = item;
        this.areaAxios();
      }
      if (this.subway) {
        this.subAll.type = item;
        this.subAxios();
      }
    },
    // 监听筛选条件中的朝向（朝南）点击
    orientaClick(item, index) {
      this.orientaIndex = index;
      if (this.area) {
        this.areaAll.orienta = item;
        this.areaAxios();
      }
      if (this.subway) {
        this.subAll.orienta = item;
        this.subAxios();
      }
    },
    // 监听筛选条件中的距离地铁点击
    distanceClick(item, index) {
      this.distanceIndex = index;
      let distanceL = 0;
      let distanceH = 0;
      switch (index) {
        case 0:
          distanceL = 0;
          distanceH = 500;
          break;
        case 1:
          distanceL = 500;
          distanceH = 800;
          break;
        case 2:
          distanceL = 800;
          distanceH = 1000;
          break;
      }
      this.subAll.distanceLow = distanceL;
      this.subAll.distanceHigh = distanceH;
      this.subAxios();
    },
  },
};
</script>

<style scoped>
.active {
  color: #ff5777;
}
.home-screen {
  margin-top: 25px;
  border-top: 1px solid #e3e5e6;
}
.screen {
  margin-top: 15px;
}
.screen-ul {
  display: flex;
  width: 1200px;
  margin-top: 10px;
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
  background-color: #fbfbfb;
}
.screen-ul li {
  flex: 20%;
  margin: 0 0 -1px 0;
  border-right: 1px solid #ddd;
  padding: 8px 65px;
}
.screen-ul .screen-ul-li-last {
  flex: 60%;
  text-align: right;
  padding-right: 20px;
}
.screen-ul .screen-ul-li-last {
  color: #ff5777;
}
.screen-ul .screen-ul-li-last a {
  padding-left: 5px;
  color: #ff5777;
}
.screen-ul .active {
  font-weight: 700;
  border-top: 2px solid var(--color-high-text);
  border-bottom: 0;
  background-color: #fff;
}
.screen-dl-list {
  padding: 20px;
  border: 1px solid #ddd;
  background-color: #fff;
}
.screen-dl {
  font-size: 12px;
}
.screen-dl dt {
  float: left;
  padding: 10px 0 0 10px;
}
.screen-dl dd {
  float: left;
  padding: 10px 18px;
}
</style>
