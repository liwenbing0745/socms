// page/sqmana/export_pro.js
var app = getApp();
var server = require('../../utils/server');
Page({

  /**
   * 页面的初始数据
   */
    data: {
        productsstr: "",
      products: []
  },
  onLoad: function (options) {
      var sqtgbountyid = options.scene;
      var self = this;
      var rd_session = wx.getStorageSync('rd_session');
      server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetexportData.ashx', { userid: rd_session, export: "pro" }, function (res) {
        //  console.log('wx.login', res);
          self.setData({
            productsstr: res.data.productsstr,
              products: res.data.products
              
          });
      });
  
  },
 
  copyTBL: function (e) {
      var self = this;
      wx.setClipboardData({
          data: self.data.productsstr.replace(/###/g, "\r\n"),
          success: function (res) {
              // self.setData({copyTip:true}),  
              wx.showModal({
                  title: '提示',
                  content: '复制成功',
                  success: function (res) {
                      if (res.confirm) {
                          console.log('确定')
                      } else if (res.cancel) {
                          console.log('取消')
                      }
                  }
              })
          }
      });
  } 
})