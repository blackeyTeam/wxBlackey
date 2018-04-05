// 获取全局应用程序实例对象
const app = getApp()

Page({
  data: {
    actdetail: {
      id: '1',
      business: {
        id: '1',
        name: '店名',
        discount: '折扣',
        mainPage: '首页主图',
        saleCode: '消费码',
        remark: '备注',
        address: '上海市',
        mobile: '13673297423',
        telephone: '69571204'
      },
      salePrice: '实际售价',
      discountPrice: '折扣价格',
      rushPrice: '抢购价',
      stock: '库存',
      saleOut: '已售出',
      attention: '注意事项',
      detail: '详细信息',
      name: '活动名称'
    }
  },
  onLoad: function (options) {
    // wx.showLoading({
    //   title: '加载中',
    // })
    // let detailUrl = 'https://douban.uieee.com/v2/movie/subject/' + options.id
    // wx.request({
    //   url: detailUrl,
    //   data: {},
    //   header: {
    //     'content-type': 'json'
    //   },
    //   method: 'GET',
    //   success: res => {
    //     console.log(res.data)
    //     this.setData({
    //       detail: res.data
    //     })
    //     this.setlabels()
    //     wx.hideLoading()
    //   }
    // })
  }
})