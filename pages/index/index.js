//index.js
//获取应用实例
const app = getApp()
import http from '../../utils/net.js' //网络请求
import login from '../../utils/login.js' //网络请求
Page({
  data: {
    banners: [
      {
        id: '/pages/index/index',
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      }, {
        id: '/pages/logs/logs',
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      }, {
        id: '/pages/test/test',
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      }
    ],
    bannerSetting: {
      indicatorDots: true,
      autoplay: true,
      circular: true,
      interval: 3000,
      duration: 1000
    },
    size: 5,
    page: 0,
    activityObjArray:[]
  },

  onLoad: function () {
    login.login()
    this.activityPage()
  },

  onShow:function(){
    
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
        that.setData({
          activityObjArray:res.data.content
        })
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
