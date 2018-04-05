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
  wx.showLoading({ title: "加载中...", mask: false })
  wx.request({
    url: app.globalData.server + url,
    data: data,
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: { 'content-type': header }, // 设置请求的 header
    success: res => {
      if ("function" == typeof requestHandler.success) {
        requestHandler.success(res)
      }
    },
    fail: res => {
      if ("function" == typeof requestHandler.fail) {
        requestHandler.fail(res)
      }
    },
    complete: res => {
      wx.hideLoading()
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