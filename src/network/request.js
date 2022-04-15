import axios from "axios";

// 导出封装的axios，不整个导出，可以配置多个
export function request(config) {
  // 创建实例
  const instance = axios.create({
    //通用配置
    baseURL: "/api",
    timeout: 50000,
  });
  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      // 请求成功拦截

      // 拦截后进行相关操作，例如检测是否携带token，是否在请求时添加动画等

      // 拦截后需将其返回（必须）
      return config;
    },
    (err) => {
      // 请求失败拦截
    }
  );
  // 响应拦截器
  instance.interceptors.response.use(
    (res) => {
      // 响应成功拦截

      // 拦截后进行相关操作，可以对拦截的数据进行处理

      // 拦截后需将其返回（必须）
      return res;

      // 直接返回响应后的数据
      // return res.data
    },
    (err) => {}
  );
  return instance(config);
}

// 第二个封装的axios，默认配置可以不同
export function request2(config) {
  // 创建实例
  const instance2 = axios.create({
    //通用配置
    baseURL: "http://104.168.250.195:8886",
    timeout: 30000,
    headers: {},
  });
  return instance2;
}
