//获取应用实例
const app = getApp()

//GET请求
const GET = (url, data, requestHandler) => {
  request('GET', 'application/json', url, data, requestHandler)
}

//POST请求
const POST = (url, data, requestHandler) => {
  request('POST', 'application/x-www-form-urlencoded', url, data, requestHandler)
}

const request = (method, header, url, data, requestHandler) => {
  wx.showLoading({ title: "加载中..."})
  wx.request({
    url: app.globalData.server + url,
    data: data,
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: { 'content-type': header }, // 设置请求的 header
    success: res => {
      if ("function" == typeof requestHandler.success) {
        requestHandler.success(res)
        // wx.hideLoading()
      }
    },
    fail: res => {
      if ("function" == typeof requestHandler.fail) {
        requestHandler.fail(res)
        // wx.hideLoading()        
      }
    },
    complete: res => {
      setTimeout(function(){
        wx.hideLoading()
      }, 1000);
      // complete
      if ("function" == typeof requestHandler.complete) {
        requestHandler.complete(res)
      }

      if (res.statusCode == 502) {
        wx.showToast({
          title: "无法链接服务器",
          icon: "none"
        })
      }

    }
  })
}

module.exports = {
  GET: GET,
  POST: POST
}