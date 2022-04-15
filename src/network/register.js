import { request } from "./request";

// 提交注册表单 Register
export function register(registerInfo, userType) {
  return request({
    url: "/register",
    method: "post",
    data: {
      username: registerInfo.username,
      password: registerInfo.pass,
      age: registerInfo.age,
      gender: registerInfo.sex,
      telephone: registerInfo.phone,
      address: registerInfo.address,
      role: userType,
    },
  });
}
