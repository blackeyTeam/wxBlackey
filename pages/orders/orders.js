//获取应用实例
const app = getApp()
import http from '../../utils/net.js' //网络请求

Page({
  data: {
    userId:'',
    orderParam: '',
    orderData: ''
  },
  onLoad: function (options) {
    console.log(options);
    this.setData({
      userId: options.openid,
      orderParam: options.param,
    })    
    request.getOrders({
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
    console.info(this.data.userInfo)
  },
  searchOrders(e) {
    console.log(e.target.dataset.param)
    this.setData({
      orderParam: e.target.dataset.param
    })
    request.getOrders({
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
    http.POST("/server/record/page", data, frequestHandler)
  }
}