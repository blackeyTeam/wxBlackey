//获取应用实例
const app = getApp()
import http from '../../utils/net.js' //网络请求

Page({
  data: {
    userId:'', // 用户ID
    activityId: '', // 活动ID,
    code: '', // 核销码
    orderParam: '', // 订单参数(all,use,used)
    orderData: '',
    hiddenmodel: true // 隐藏弹窗
  },
  onLoad: function (options) {
    console.log(options);
    this.setData({
      userId: options.openid,
      orderParam: options.param,
    })    
    this.orderInit()
  },
  orderInit() {
    request.getOrders({
      openId: wx.getStorageSync("openid"),
      status: this.data.orderParam
    }, {
      success: res => {
        console.log(res)
        if (res.statusCode == 200) {
          this.setData({
            orderData: res.data.content
          })
        }
      }
    })
  },
  onShow: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  cancel() {
    this.setData({
      hiddenmodel: true
    })
  },
  confirm() {
    let that = this    
    if(this.data.code) {
      request.useOrder({
        id: this.data.activityId,
        code: this.data.code
      }, {
          success: res => {
            console.log(res)
            if (res.statusCode == 200) {
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 3000,
                success: function () {
                  setTimeout(function(){
                    that.setData({
                      hiddenmodel: true
                    })
                    that.orderInit()
                  },1000)
                }
              })
            }
          }
        })
    } else {
      wx.showToast({
        title: '请输入核销码',
        icon: 'none'
      })
    }
  },
  toUse(e) {
    this.setData({
      activityId: e.target.dataset.id,
      hiddenmodel: !this.data.hiddenmodel
    })
  },
  inputCode(e) {
    this.setData({
      code: e.detail.value
    })
  },
  searchOrders(e) {
    console.log(e.target.dataset.param)
    this.setData({
      orderParam: e.target.dataset.param
    })
    request.getOrders({
      openId: wx.getStorageSync("openid"),
      status: e.target.dataset.param
      }, {
      success: res => {
        if (res.statusCode == 200) {
          this.setData({
            orderData: res.data.content
          })
        }
      }
    })
  }
})

let request = {
  getOrders: (data, frequestHandler) => {
    http.GET("/server/record/queryOrder", data, frequestHandler)
  },
  useOrder: (data, frequestHandler) => {
    http.POST("/server/record/update", data, frequestHandler)
  }
}