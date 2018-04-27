// page/sqmana/sqtg_order_detail.js
var app = getApp();
var server = require('../../utils/server');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      uid: wx.getStorageSync('rd_session'),
      orders: [],
      pros: []
  },
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var self = this;
      server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetOrderDetail.ashx', { id: options.id }, function (res) {
         // console.log('products', res)
          self.setData({
              orders: res.data.results,
              pros: res.data.resultspro
          })
      });
  },
  makePhone: function (e) {
      var self = this;
      wx.makePhoneCall({
          phoneNumber: self.data.orders[0].consigneemobile
      })
  }
  ,
  makemobile: function (e) {
      var self = this;
      wx.makePhoneCall({
          phoneNumber: self.data.orders[0].sqmcdipmcmobile
      })
  },
   tapTake: function (e) {
      wx.showModal({
          title: '提示',
          content: '确认提货?',
          success: function (res) {
              if (res.confirm) {
                  var self = this;
                  var rd_session = wx.getStorageSync('rd_session');
                  server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/SetOrder.ashx', { userid: rd_session, id: e.target.dataset.id, action: 'tapRei' }, function (res) {
                      wx.navigateTo({ url: '/page/sqmana/sqtg_orderDetails' });
                  })

              }
          }
      })

  }
})