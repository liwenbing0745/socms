// page/sqmana/export_order.js
var app = getApp();
var server = require('../../utils/server');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tEvaluatestr:"",
      recordList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var sqtgbountyid = options.scene;
      var self = this;
      var rd_session = wx.getStorageSync('rd_session');
      server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetexportData.ashx', { userid: rd_session, export: "order" }, function (res) {
          self.setData({
              tEvaluatestr: res.data.tEvaluatestr,
              recordList: res.data.tEvaluate
          });
      });
   
  },
  copyTBL: function (e) {
      var self = this;
      wx.setClipboardData({
          data: self.data.tEvaluatestr.replace(/###/g, "\r\n"),
          success: function (res) {
            
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