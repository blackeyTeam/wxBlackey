//index.js
//获取应用实例
const app = getApp()
import http from '../../utils/net.js' //网络请求
import login from '../../utils/login.js' //网络请求
Page({
  data: {
    activityObjArray:[]
  },

  onLoad: function () {
    login.login()
  },

  onShow:function(){
    this.activityPage()
  },

  activityPage:function(){
    let that = this
    request.activityPage({},{
      success: res => {
        that.setData({
          activityObjArray:res.data.data.content
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
