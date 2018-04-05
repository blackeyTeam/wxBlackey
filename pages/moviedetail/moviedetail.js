// 获取全局应用程序实例对象
const app = getApp()

Page({
  data: {
    detail: {},
    labels: '',
    show: true
  },
  showmore() {
    this.setData({
      show: false
    })
  },
  setlabels() {
    let labels = this.data.detail.genres.join('/')
    this.setData({
      labels: labels
    })
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    let detailUrl = 'https://douban.uieee.com/v2/movie/subject/'+options.id
    wx.request({
      url: detailUrl,
      data: {},
      header: {
        'content-type': 'json'
      },
      method: 'GET',
      success: res => {
        console.log(res.data)
        this.setData({
          detail: res.data
        })
        this.setlabels()
        wx.hideLoading()
      }
    })
  }
})