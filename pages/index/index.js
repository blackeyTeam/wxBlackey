//index.js
//获取应用实例
const app = getApp()
import http from '../../utils/net.js' //网络请求
import login from '../../utils/login.js' //网络请求
Page({
  data: {
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
