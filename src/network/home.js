import { request } from "./request";

// 获取首页房源默认显示信息 Home 
export function getHouses(houseInfo) {
  return request({
    url: "/gethouses",
    method: "post",
    data: {
      city: houseInfo.city,
      price_low: houseInfo.price_low,
      price_up: houseInfo.price_up,
      room_num: houseInfo.room_num,
      mode: houseInfo.mode,
      house_standart: houseInfo.house_standart,
      orientation: houseInfo.orientation,
    },
  });
}

// 获取搜索框根据关键词搜素的房源信息 HomeHeader
export function getSearchHouses(search) {
  return request({
    url: "/gethouses",
    method: "post",
    data: { search },
  });
}

// 获取筛选模块 区域模块选择筛选条件的房源信息 HomeScreen
export function getAreaHouses(areaInfo) {
  return request({
    url: "/gethouses",
    method: "post",
    data: {
      city: areaInfo.area,
      price_low: areaInfo.priceLow,
      price_up: areaInfo.priceHigh,
      room_num: areaInfo.house,
      mode: areaInfo.pattern,
      house_standart: areaInfo.type,
      orientation: areaInfo.orienta,
    },
  });
}
// 获取筛选模块 学校模块选择筛选条件的房源信息 HomeScreen
export function getSchoolHouses(schInfo) {
  return request({
    url: "/gethouses",
    method: "post",
    data: {
      school_type: schInfo.sch,
      city: schInfo.area,
    },
  });
}
// 获取筛选模块 地铁模块选择筛选条件的房源信息 HomeScreen
export function getSubwayHouses(subInfo) {
  return request({
    url: "/gethouses",
    method: "post",
    data: {
      subway_num: subInfo.sub,
      price_low: subInfo.priceLow,
      price_up: subInfo.priceHigh,
      distance_low: subInfo.distanceLow,
      distance_up: subInfo.distanceHigh,
      room_num: subInfo.house,
      mode: subInfo.pattern,
      house_standart: subInfo.type,
      orientation: subInfo.orienta,
    },
  });
}

// 获取房源详情中的轮播图片 HomeMain
export function getImgs(uuid) {
  return request({
    url: "/getImgs",
    method: "post",
    data: {
      uuid,
    },
  });
}
