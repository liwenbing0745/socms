// page/sqmana/vip_details.js
var app = getApp();
var server = require('../../utils/server');
Page({

  /**
   * 页面的初始数据
   */
    data: {
        page: 1,
        page_size: 10,
        scrollTop: 100,
        userid:0,
        orderLists:[
        ]
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var self = this;
      server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/vip_details.ashx', { userid: options.userid }, function (res) {
          self.setData({
              orderLists: res.data.results,
              userid: options.userid
          })
      });
  },
  loadImages: function () {
      var self = this;
      var rd_session = wx.getStorageSync('rd_session');
      self.data.page = self.data.page + 1;
      server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/vip_details.ashx', { userid: self.data.userid,page: self.data.page, page_size: self.data.page_size }, function (res) {
          if (self.data.page > res.data.allpage) {
          }
          else {
              self.setData({
                  orderLists: res.data.results,
                  page: parseInt(res.data.page),
                  scrollTop: 100
              });
          }
          //console.log('products', res)
      });
  },
  refesh: function () {
      var self = this;
      var rd_session = wx.getStorageSync('rd_session');
      self.data.page = self.data.page - 1;
      server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/vip_details.ashx', { userid: self.data.userid, page: self.data.page, page_size: self.data.page_size }, function (res) {
          if (self.data.page < 1) {
          }
          else {
              self.setData({
                  orderLists: res.data.results,
                  page: parseInt(res.data.page),
                  scrollTop: 100
              });
          }
          //console.log('products', res)
      });
  }
})