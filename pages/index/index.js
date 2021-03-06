//index.js
//获取应用实例
const app = getApp()
import http from '../../utils/net.js' //网络请求
import login from '../../utils/login.js' //网络请求
Page({
  data: {
    banners: [
      {
        id: '2c90eaab62969a4301629f0e4f460002',
        url: 'https://www.ssqushe.com/opt/application/chiheiA2041524884537762.jpeg'
      }, {
        id: '2c90eaab62b023300162d64753e70000',
        url: 'https://www.ssqushe.com/opt/application/chiheiA3661524840427862.jpeg'
      }, {
        id: '2c90eaab62969a4301629f0e4f460002',
        url: 'https://www.ssqushe.com/opt/application/chiheiA2791524884664783.jpg'
      }
    ],
    bannerSetting: {
      indicatorDots: false,
      autoplay: true,
      circular: true,
      interval: 3000,
      duration: 1000
    },
    size: 5,
    page: 1,
    totalPages: 999,
    activityObjArray:[]
  },

  onLoad: function () {
    login.login()
    this.activityPage()
  },

  onShow:function(){
    
  },

  onReachBottom: function() {
    if (this.data.page === this.data.totalPages) {
      wx.showToast({
        title: '没有更多数据了'
      })
    } else {
      this.data.page++;
      this.activityPage();
    }
  },

  loadMore() {
    this.data.page++;
    this.activityPage()
  },

  activityPage:function(){
    let that = this
    request.activityPage({
      size: that.data.size,
      number: that.data.page
    },{
      success: res => {
        console.log(res);
        if (this.data.page <= res.data.totalPages) {
          that.setData({
            activityObjArray: this.data.activityObjArray.concat(res.data.content),
            totalPages: res.data.totalPages
          })
        }
      },
    })
  }

})

//接口请求
let request = {
  activityPage: (data, frequestHandler) => {
    http.GET("/server/activity/page", data, frequestHandler)
  }
}
