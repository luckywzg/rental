import { request } from "./request";

// 获取所有用户 用户管理 AdminUser
export function getAllUser() {
  return request({
    url: "/getAllUser",
    method: "post",
    data: {
      role: "1",
    },
  });
}

// 获取所有商家 商家管理 AdminStore
export function getAllStore() {
  return request({
    url: "/getAllUser",
    method: "post",
    data: {
      role: "2",
    },
  });
}

//删除用户或商家 用户管理、商家管理 AdminUser、AdminStore
export function postDeleteUser(uid) {
  return request({
    url: "/deleteUser",
    method: "post",
    data: {
      uid,
    },
  });
}

// 获取已发布房源信息 我的发布 LoginRelease
export function getReleases() {
  return request({
    url: "/getReleases",
  });
}

// 删除已发布房源信息 我的发布 LoginRelease
export function postDeleteReleaseHouse(uuid) {
  return request({
    url: "/deleteReleaseHouse",
    method: "post",
    data: {
      uuid,
    },
  });
}

// 更新已发布的房源信息 我的发布 LoginEdit
export function postUpdateHouse(updateInfo) {
  return request({
    url: "/updateHouse",
    method: "post",
    data: {
      uuid: updateInfo.uuid,
      description: updateInfo.desc,
      city: updateInfo.address,
      address: updateInfo.detailAddress,
      price: updateInfo.price,
      house_standard: updateInfo.house,
      mode: updateInfo.pattern,
      type_: updateInfo.type,
      orientation: updateInfo.loca,
      build_area: updateInfo.size,
      telephone: updateInfo.telephone,
      resource_from: updateInfo.from,
      subway_num: updateInfo.subway,
      subway_distance: updateInfo.distance,
      school_type: updateInfo.school,
    },
  });
}

// 添加房源信息 我要出租 LoginRental
export function postAddHouse(formdata) {
  return request({
    url: "/addHouse",
    method: "post",
    data: formdata,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

// 获取已租出房源信息 房源状态 LoginHouse
export function getRentHouseByuid() {
  return request({
    url: "/getRentHouseByuid",
  });
}
