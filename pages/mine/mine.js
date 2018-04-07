//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo:{}
  },
  onShow:function(){
    this.setData({
      userInfo: app.globalData.userInfo
    })
    console.info(this.data.userInfo)
  }
})