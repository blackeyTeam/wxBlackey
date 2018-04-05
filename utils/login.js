const app = getApp()
const login = (callback) =>  {
  // 登录
  wx.login({
    success: res1 => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      // console.info(res1.code)
      wx.getUserInfo({
        success: res2 => {
          wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                app.globalData.userInfo = res.userInfo;
                wx.request({
                  url: app.globalData.server + '/server/userInfo/login',
                  data: {
                    code: res1.code,
                    encrypData: res2.encryptedData,
                    iv: res2.iv
                  },
                  method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  }, // 设置请求的 header 
                  success: res => {
                    if (res.data.code != 200) {
                      wx.showToast({
                        title: res.data.message,
                        icon: "none"
                      })
                      setTimeout(wx.navigateBack(), 1500);
                    }
                    wx.setStorageSync("openid", res.data.data.openid)
                    if (callback ==typeof 'function'){
                      callback()
                    }
                  },
                  fail: res => {

                  }
                })
                // if (this.userInfoReadyCallback) {
                //   this.userInfoReadyCallback(res)
                // }
              }
            }
          })
        },
      })
    }
  })
}

module.exports = {
  login
}