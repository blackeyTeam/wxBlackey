// 获取全局应用程序实例对象
const app = getApp()

Page({
  data: {
    searchValue: '',
    result: {}
  },
  searchValueInput(e) {
    this.setData({
      searchValue: e.detail.value,
    });
  },
  searchMovie() {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/search?q=' + this.data.searchValue,
      header: {
        'content-type': 'json'
      },
      method: 'GET',
      success: res => {
        console.log(res.data)
        this.setData({
          result: res.data
        })
        wx.hideLoading()
      }
    })
  },
  onLoad(options) {
    console.log(options)
    this.setData({
      searchValue: options.q
    })
    this.searchMovie()
  }
})