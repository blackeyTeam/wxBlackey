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
    // request.getOrders({
    //   id: this.data.userId,
    //   orderParam: this.data.orderParam
    //   }, {
    //   success: res => {
    //     this.setData({
    //       orderData: res.dat.data
    //     })
    //   }
    // })
  },
  onShow: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    console.info(this.data.userInfo)
  },
  searchOeders(e) {
    console.log(e.target.dataset.param)
    this.setData({
      orderParam: e.target.dataset.param
    })
    // request.getOrders({
    //   id: this.data.userId,
    //   orderParam: e.target.dataset.param
    //   }, {
    //   success: res => {
    //     this.setData({
    //       orderData: res.dat.data
    //     })
    //   }
    // })
  }
})

let request = {
  getOrders: (data, frequestHandler) => {
    http.GET("/server/activity/detail", data, frequestHandler)
  }
}