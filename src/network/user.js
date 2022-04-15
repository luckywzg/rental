import { request } from "./request";

// 获取个人资料 LoginProfile
export function getUserInfo() {
  return request({
    url: "/getUserInfo",
  });
}

// 更新个人资料
export function postUpdateUserInfo(userInfo) {
  return request({
    url: "/updateUserInfo",
    method: "post",
    data: {
      username: userInfo.username,
      age: userInfo.age,
      gender: userInfo.sex,
      telephone: userInfo.phone,
      address: userInfo.address,
    },
  });
}

// 添加收藏房源 UserCollect HomeMain
export function postCollection(uuid) {
  return request({
    url: "/collection",
    method: "post",
    data: { uuid },
  });
}

// 删除收藏房源 UserCollect HomeMain
export function postCancelCollection(uuid) {
  return request({
    url: "/cancelCollection",
    method: "post",
    data: { uuid },
  });
}

// 查询收藏房源 UserCollect
export function getCollection() {
  return request({
    url: "/getCollection",
  });
}

// 添加已租房源 HoumeMain
export function postRentHouse(uuid) {
  return request({
    url: "/rentHouse",
    method: "post",
    data: { uuid },
  });
}

// 删除已租房源 UserHouseInfo
export function postCancelRent(uuid) {
  return request({
    url: "/cancelRent",
    method: "post",
    data: { uuid },
  });
}

// 查看已租房源信息 UserHouseInfo
export function getRentHouse() {
  return request({
    url: "/getRentHouse",
  });
}

// 修改密码 LoginEditPass
export function postEditPassword(password) {
  return request({
    url: "/updatePassword",
    method: "post",
    data: {
      password,
    },
  });
}
