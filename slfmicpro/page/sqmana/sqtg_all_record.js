// page/sqtg/sqtg_all_record.js
var app = getApp();
var server = require('../../utils/server');
Page({

    data: {
      try_user_money:0,
     isAdd:false,
    isShowYg: true,
    page: 1,
    page_size: 10,
    scrollTop: 100,
    orderDetails:[
   
    ]
  },
  searchData:function(){
    this.setData({
      isShowYg: !this.data.isShowYg
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/sqtg_all_record.ashx', { userid: rd_session, page: self.data.page, page_size: self.data.page_size }, function (res) {
            self.setData({
                orderDetails: res.data.results,
                try_user_money: res.data.try_user_money
            })
        });
    },
    loadImages: function () {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
    self.data.page = self.data.page + 1;
    server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/sqtg_all_record.ashx', { userid: rd_session, page: self.data.page, page_size: self.data.page_size }, function (res) {
        self.setData({ scrollTop: 100,
                orderDetails: res.data.results,
                try_user_money: res.data.try_user_money,
                page: parseInt(res.data.page)
            });
            //console.log('products', res)
        });
    },
    refesh: function () {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
     self.data.page = self.data.page - 1;
     server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/sqtg_all_record.ashx', { userid: rd_session, page: self.data.page, page_size: self.data.page_size }, function (res) {
         self.setData({ scrollTop: 100,
                orderDetails: res.data.results,
                try_user_money: res.data.try_user_money,
                page: parseInt(res.data.page)
            });
            //console.log('products', res)
        });
    }

})