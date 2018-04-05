//app.js
App({
  onLaunch: function () {

  },
  globalData: {
    userInfo: null, //微信用户信息
    server: "https://xiaocaiyuan.iisu.cn",   //接口服务器地址
  },
  //退出小程序
  quit: () => {
    wx.navigateBack({
      delta: 0
    })
  },
})