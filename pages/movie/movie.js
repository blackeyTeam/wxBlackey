// 获取全局应用程序实例对象
const app = getApp()

Page({
  data: {
    searchValue:'',
    showing: {
      title: '',
      subjects: {}
    },
    coming: {
      title: '',
      subjects: {}
    }

  },
  searchValueInput(e) {
    this.setData({
      searchValue: e.detail.value,
    }); 
  },
  tosearch() {
    wx.navigateTo({
      url: '../search/search?q='+this.data.searchValue
    })
  },
  getComing(){
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/coming_soon',
      data: {},
      header: {
        'content-type': 'json'
      },
      method: 'GET',
      success: res => {
        console.log(res.data)
        this.setData({
          coming: {
            title: res.data.title,
            subjects: res.data.subjects
          }
        })
      }
    })
  },
  getShowing(city) {
    // if(city){
    //   let url = 'https://douban.uieee.com/v2/movie/in_theaters?city='+city
    // }else{
    //   let url = 'https://douban.uieee.com/v2/movie/in_theaters'
    // }
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/in_theaters?city=' + city,
      data: {},
      header: {
        'content-type': 'json'
      },
      method: 'GET',
      success: res => {
        console.log(res.data,city)
        this.setData({
          showing: {
            title: res.data.title,
            subjects: res.data.subjects
          }
        })
        wx.hideLoading()
      }
    })
  },
  getCity(latitude, longitude) {
    let ak = 'DxXtz0MOj5xxGArPilZy9X54G78uICZn'
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak='+ak+'&location=' + latitude + ',' + longitude + '&output=json',
      header: {
        'content-type': 'json'
      },
      method: 'GET',
      success: res => {
        let city = res.data.result.addressComponent.city
        city = city.substr(0, city.length - 1)
        this.getShowing(city)
        this.getComing()
      }
    })
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    })
    wx.getLocation({
      success: res => {
        let latitude = res.latitude
        let longitude = res.longitude
        this.getCity(latitude, longitude)
      },
      fail: res => {
        this.getShowing()
        this.getComing()
      }
    })
  }
})
