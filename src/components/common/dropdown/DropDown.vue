<template>
  <div @mouseenter="areaEnter" @mouseleave="areaLeave" class="center">
    <div  class="header-area">
      {{ areaList[areaListIndex] }}
      <div class="area-item" v-show="isArea">
        <span v-for="(item,index) in areaList" @click="areaItemClick(index)">{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DropDown",
  props: {
    areaList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isAreaActive: false,
      areaListIndex: 0
    }
  },
  computed: {
    isArea() {
      return this.isAreaActive
    }
  },
  methods: {
    areaEnter() {
      this.isAreaActive = !this.isAreaActive
    },
    areaLeave() {
      this.isAreaActive = !this.isAreaActive
    },
    areaItemClick(index) {
      this.areaListIndex = index
    }
  }
}
</script>

<style scoped>
  .center {
    cursor: default;
  }
  .header-area {
    position: relative;
    padding: 5px 0 ;
  }
  .header-area::after {
    content: '\f0d7';
    font-family: 'icomoon';
  }
  .area-item span {
    display: block;
    padding: 5px 40px 5px 15px;
  }
  .area-item span:hover {
    background-color: #6884d5;
    color: #fff;
  }
  .area-item {
    position: absolute;
    top: 30px;
    right: 0;
    background-color: #fff;
    border: 1px solid #b4b2b4;
  }
</style>
