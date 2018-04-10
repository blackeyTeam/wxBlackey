//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo:{},
    userId: ''
  },
  onShow:function(){
    this.setData({
      userInfo: app.globalData.userInfo,
      userId: wx.getStorageSync("openid")
    })
    console.info(this.data.userInfo)
  },
  toService() {
    wx.navigateTo({
      url: '../service/service'
    })
  },
  toOrders(e) {
    let param = e.currentTarget.dataset.param
    if (this.data.userId) {
      wx.navigateTo({
        url: '../orders/orders?param=' +param+'&openid='+this.data.userId
      })
    } else {
      wx.showToast({
        title: '请先登录',
      })
    }
  }
})