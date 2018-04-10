//获取应用实例
const app = getApp()

Page({
  data: {
    wxNum: 'msjdhsj',
    mobile: '13475647847'
  },
  onShow: function () {
    
  },
  copy() {
    wx.setClipboardData({
      data: this.data.wxNum,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success'
        })
      }
    })
  },
  call() {
    wx.makePhoneCall({
      phoneNumber: this.data.mobile
    })
  }
})