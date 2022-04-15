module.exports = {
  transpileDependencies: true,
  devServer: {
    open: true,
    host: "localhost",
    // hotOnly: false,
    port: 8080,
    https: false,
    proxy: {
      //配置跨域
      "/api": {
        target: "http://104.168.250.195:8886", //这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        secure: false,
        changOrigin: true, //允许跨域
        pathRewrite: {
          /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
            实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
           */
          "^/api": "",
        },
      },
      // "/img": {
      //   target: "http://104.168.250.195:8886",
      //   ws: true,
      //   //https请求需设置此项secure
      //   secure: false,
      //   changOrigin: true,
      //   pathRewrite: {
      //     "^/img": "",
      //   },
      // },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        common: "@/common",
        network: "@/network",
        components: "@/components",
        views: "@/views",
      },
    },
  },
};
