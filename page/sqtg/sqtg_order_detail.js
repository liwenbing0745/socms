// page/sqtg/sqtg_order_detail.js
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
  }
})