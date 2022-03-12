<template>
  <div class="screen w">
    <div class="screen-info"><slot name="top"></slot></div>
    <div class="screen-item-list"><slot name="center"></slot></div>
    <!--<ul class="screen-area-info" v-for="(item,index) in areaAllInfo">-->
    <!--  <li v-for="(itemY,indexY) in item" @click="areaInfoClick(index, indexY) ">-->
    <!--    <a href="#" :class="{sortActive: sortIndex === index && sortIndexY === indexY}">{{itemY}}</a>-->
    <!--  </li>-->
    <!--</ul>-->
    <ul class="screen-area-info" >
      <li v-for="(item,index) in areaInfoList" @click="areaInfoClick(index)">
        <a href="#" :class="{sortActive: sortIndex === index}">{{item}}</a>
      </li>
    </ul>
    <ul class="screen-area-info">
      <li v-for="(item,index) in areaHouseWearList" @click="areaInfoClick(index)">
        <a href="#" :class="{sortActive: sortIndex === index}">{{item}}</a>
      </li>
    </ul>
    <ul class="screen-area-info">
      <li v-for="(item,index) in areaTypeList" @click="areaInfoClick(index)">
        <a href="#" :class="{sortActive: sortIndex === index}">{{item}}</a>
      </li>
    </ul>
    <ul class="screen-area-info">
      <li v-for="(item,index) in areaRentList" @click="areaInfoClick(index)">
        <a href="#" :class="{sortActive: sortIndex === index}">{{item}}</a>
      </li>
    </ul>
    <ul class="screen-area-info">
      <li v-for="(item,index) in areaHouseList" @click="areaInfoClick(index)">
        <a href="#" :class="{sortActive: sortIndex === index}">{{item}}</a>
      </li>
    </ul>
    <ul class="screen-area-info">
      <li v-for="(item,index) in areaOrientationList" @click="areaInfoClick(index)">
        <a href="#" :class="{sortActive: sortIndex === index}">{{item}}</a>
      </li>
    </ul>

  </div>
</template>

<script>
  import ScreenItem from "./ScreenItem";
  export default {
    name: "Screen",
    components: {
      ScreenItem
    },
    methods: {
      areaInfoClick(index) {
        this.sortIndex = index
        console.log(index)
      }
    },
    data() {
      return {
        isActive: false,
        sortIndex: 0,
        sortIndexY: 0,
        areaAllInfo: [['不限', '红谷滩', '新建区', '青山湖', '红谷滩', '新建区', '青山湖', '西山湖', '新建区', '青山湖', '西山湖', '滕王阁', '万达', '秋水广场'],  ['方式', '不限', '整租', '合租'], ['租金', '≤ 500', '500-1000', '1000-1500', '1500-2000', '2000-3000', '3000-4500', '4500-6000', '≥ 8000'], ['户型', '一室一厅', '二室一厅', '三室一厅', '三室两厅', '四室一厅', '四室两厅', '五室一厅', '五室两厅', '五室三厅'], ['类型', '普通住宅', '公寓', '别墅', '平房', '民宿', '花园洋房', '小独栋', '空中别墅'], ['朝向', '东', '南', '西', '北', '南北'],],
        areaInfoList: ['不限', '红谷滩', '新建区', '青山湖', '红谷滩', '新建区', '青山湖', '西山湖', '新建区', '青山湖', '西山湖', '滕王阁', '万达', '秋水广场'],
        areaRentList: ['租金', '≤ 500', '500-1000', '1000-1500', '1500-2000', '2000-3000', '3000-4500', '4500-6000', '≥ 8000'],
        areaHouseList: ['户型', '一室一厅', '二室一厅', '三室一厅', '三室两厅', '四室一厅', '四室两厅', '五室一厅', '五室两厅', '五室三厅'],
        areaTypeList: ['类型', '普通住宅', '公寓', '别墅', '平房', '民宿', '花园洋房', '小独栋', '空中别墅'],
        areaOrientationList: ['朝向', '东', '南', '西', '北', '南北'],
        areaHouseWearList: ['方式', '不限', '整租', '合租'],
      }
    }
  }
</script>

<style scoped>
  .screen {
    font-size: 14px;
    padding-left: 50px;
  }
  .screen-info h1,h2,h3,h4,h5,h6{
    font-weight: 400;
    padding: 10px 0 0 20px;
    color: #918f8f;
    margin-bottom: 30px;
  }
  .screen-item-list {
    display: flex;
    margin: 0 0 10px 50px;
  }
  .screen-area-info {
    display: flex;
    margin-left: 50px;
  }
  .screen-area-info li {
    margin: 15px 30px 10px 0;
  }
  .screen-area-info li:first-child {
    font-weight: 700;
  }
  .sortActive {
    font-weight: 700;
    color: var(--color-high-text);
  }
</style>
