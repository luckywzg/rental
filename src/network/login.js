import { request } from "./request";

// 提交登录表单 Login
export function login(username, password) {
  return request({
    url: "/login",
    method: "post",
    data: {
      username,
      password,
    },
  });
}
