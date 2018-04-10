// 获取全局应用程序实例对象
const app = getApp()
import http from '../../utils/net.js' //网络请求
import login from '../../utils/login.js' //网络请求
import wxParse from'../../wxParse/wxParse.js';

Page({
  data: {
    activityObj: {},
    friends: 0,
    discountArray:[
      {
        friend:{
          avatarUrl:'../../images/noavatar.png'
        }
      },
      {
        friend: {
          avatarUrl: '../../images/noavatar.png'
        }
      },
      {
        friend: {
          avatarUrl: '../../images/noavatar.png'
        }
      },
      {
        friend: {
          avatarUrl: '../../images/noavatar.png'
        }
      },
      {
        friend: {
          avatarUrl: '../../images/noavatar.png'
        }
      },
      {
        friend: {
          avatarUrl: '../../images/noavatar.png'
        }
      }
    ]
  },
  onLoad: function (options) {
    if (options.id == null) {
      wx.navigateBack()
    } else if (options.id != null && options.openid == null) {
      this.setData({
        id: options.id
      })
    } else if (options.id != null && options.openid != null) {
      this.setData({
        id: options.id
      })
      this.shareDiscount(options.openid)
    }
  },

  onShow: function () {
    this.activityDetail()  //活动详情
    this.getDiscountList() //查询已砍价好友
  },
  toService() {
    wx.navigateTo({
      url: '../service/service'
    })
  },
  toHome() {
    console.log(11111)
    wx.switchTab({
      url: '../index/index'
    })
  },
  //活动详情
  activityDetail: function () {
    let that = this
    request.activityDetail({ id: that.data.id }, {
      success: res => {
        let detail = decodeURIComponent(res.data.data.detail)
        wxParse.wxParse('detail', 'html', detail, that, 5);
        that.setData({
          activityObj: res.data.data
        })
      }
    })
  },

  //获取分享者openid得到折扣
  shareDiscount: function (openid) {
    let that = this
    let userOpenid = wx.getStorageSync("openid")
    if (userOpenid == "") {
      login.login(that.saveShareDiscount(openid))
    } else {
      login.login(that.saveShareDiscount(openid))
    }
  },

  saveShareDiscount: function (openid) {
    request.shareDiscount({ openId: wx.getStorageSync("openid"), friendId: openid, activity: this.data.id }, {
      success: rtn => {
        if (rtn.data.code == 200) {
          wx.showToast({
            title: "您已帮好友获利成功",
            icon: "none",
          })
        } else {
          wx.showToast({
            title: rtn.data.data,
            icon: "none",
          })
        }
      },
      fail: rtn => {

      }
    })
  },

  //查询已砍价好友
  getDiscountList: function () {
    let that = this
    let userOpenid = wx.getStorageSync("openid")
    if (userOpenid == "") {
      login.login(that.discountList())
    }else{
      that.discountList()
    }

  },

  //已砍价列表
  discountList: function () {
    let that = this
    request.getDiscountList({
      openId: wx.getStorageSync("openid"), activity: that.data.id
    }, {
        success: res => {
          console.log(res);
          let friends = res.data.data.length;
          let discountArray = res.data.data.concat(that.data.discountArray);
          discountArray = discountArray.slice(0,6);
          that.setData({
            discountArray: discountArray,
            friends: friends
          })
        },
      })
  },

  onShareAppMessage: function (options) {
    var that = this;
    // 设置菜单中的转发按钮触发转发事件时的转发内容
    var shareObj = {
      title: that.data.activityObj.name,        // 默认是小程序的名称(可以写slogan等)
      path: '/pages/actdetail/actdetail?id=' + that.data.id + "&openid=" + wx.getStorageSync("openid"),        // 默认是当前页面，必须是以‘/’开头的完整路径
      imgUrl: '',     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      success: function (res) {
        // 转发成功之后的回调
        if (res.errMsg == 'shareAppMessage:ok') {
          wx.showToast({
            title: '转发成功',
            icon: 'success',
            duration: 2000
          })
        }
      },
      fail: function (res) {
        // 转发失败之后的回调
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          // 用户取消转发
          wx.showToast({
            title: '取消转发',
            icon: 'none',
            duration: 2000
          })
        } else if (res.errMsg == 'shareAppMessage:fail') {
          // 转发失败，其中 detail message 为详细失败信息
          wx.showToast({
            title: '转发失败',
            icon: 'none',
            duration: 2000
          })
        }
      },
      complete: function () {
        // 转发结束之后的回调（转发成不成功都会执行）
      }
    };
    // 来自页面内的按钮的转发
    if (options.from == 'button') {
      var eData = options.target.dataset;
      console.log(eData.name);     // shareBtn
      // 此处可以修改 shareObj 中的内容
      shareObj.path = '/pages/actdetail/actdetail?id=' + that.data.id + "&openid=" + wx.getStorageSync("openid");
    }
    // 返回shareObj
    return shareObj;
  },
  payTap: function () {
    var self = this;
    wx.request({
      url: 'https://www.hgdqdev.cn/api/wxpay/unifiedorder',
      data: {
        openid: self.data.openid   // 这里正常项目不会只有openid一个参数
      },
      success: function (res) {
        if (res.data.status == 100) {
          var payModel = res.data;
          wx.requestPayment({
            'timeStamp': payModel.timestamp,
            'nonceStr': payModel.nonceStr,
            'package': payModel.package,
            'signType': 'MD5',
            'paySign': payModel.paySign,
            'success': function (res) {
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 2000
              })
            },
            'fail': function (res) {
            }
          })
        }
      },
      fail: function () {

      }
    })
  }
})

//接口请求
let request = {
  activityDetail: (data, frequestHandler) => {
    http.GET("/server/activity/detail", data, frequestHandler)
  },
  shareDiscount: (data, frequestHandler) => {
    http.POST("/server/cut/save", data, frequestHandler)
  },
  getDiscountList: (data, frequestHandler) => {
    http.GET("/server/cut/list", data, frequestHandler)
  },
  pay: (data, frequestHandler) => {
    http.GET("/server/cut/list", data, frequestHandler)
  }
}