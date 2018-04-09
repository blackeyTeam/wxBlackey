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
      url: '../service/service',
    })
  },
  toOrdersAll() {
    if (this.data.userId) {
      wx.navigateTo({
        url: '../orders/orders?param=all&openid='+this.data.userId
      })
    } else {
      wx.showToast({
        title: '请先登录',
      })
    }
  },
  toOrdersUse() {
    if (this.data.userId) {
      wx.navigateTo({
        url: '../orders/orders?param=use&openid=' + this.data.userId
      })
    } else {
      wx.showToast({
        title: '请先登录',
      })
    }
  },
  toOrdersUsed() {
    if (this.data.userId) {
      wx.navigateTo({
        url: '../orders/orders?param=used&openid=' + this.data.userId
      })
    } else {
      wx.showToast({
        title: '请先登录',
      })
    }
  }
})