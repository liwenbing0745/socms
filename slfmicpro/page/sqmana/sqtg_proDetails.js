// page/sqmana/sqtg_proDetails.js
var app = getApp();
var server = require('../../utils/server');
Page({

  /**
   * 页面的初始数据
   */
    data: { 
    uid: wx.getStorageSync('rd_session'),
      pro: [
    ],
     selectInx: 0,
    array:['水果','礼品','食材','零食']
 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var self = this;
      var rd_session = wx.getStorageSync('rd_session');
      server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetProdatasqt.ashx', { id: options.id, userid: rd_session, page: self.data.page, page_size: self.data.page_size }, function (res) {
         //  console.log('products', res),
         
          self.setData({
              selectInx: res.data.pro[0].selectInx,
              pro: res.data.pro
          
          })

      });

  },
  formSubmit: function (e) {
      // console.log('wx.login', e);
      var that = this;
      that.setData({
          confirmSubmit: false
      });
      var formData = e.detail.value;
      var formId = e.detail.formId;
      server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/UpdatePros.ashx', { uid: wx.getStorageSync('rd_session'), price: formData.price, sort: formData.sort, id: formData.id }, function (res) {
          that.setData({
              confirmSubmit: true
          })
          wx.redirectTo({ url: '/page/sqmana/sqtg_oneClickFight' });
      });

  }
})