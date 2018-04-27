// page/sqtg/sqtg_position.js
var app = getApp();
var server = require('../../utils/server');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      categories:[],
      detailsLists:[]
  },
  onSearchData:function(e){//获取用户输入值
    let enter = this.dialog.searchData();
     var self = this;
     var rd_session = wx.getStorageSync('rd_session');
       server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/sqtg_position.ashx', { userid: rd_session ,enter: enter}, function (res) {
                  self.setData({
                 categories: res.data.categories,
                detailsLists: res.data.detailsLists
            });
         });
  },
  toIndex:function(){
    wx.redirectTo({
      url: '../index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var self = this;
     var rd_session = wx.getStorageSync('rd_session');
       server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/sqtg_position.ashx', { userid: rd_session }, function (res) {
     // console.log('wx.login',res);
                  self.setData({
                 categories: res.data.categories,
                detailsLists: res.data.detailsLists
            });
         });
  },
   tapPddbountyBuy: function (e) {
     var self = this;
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/orderNumListp.ashx', { userid: wx.getStorageSync('rd_session'), ssshuqu: e.target.dataset.id}, function (res) {
      
//            if (res.data.sqtgaudit == "2") {
//               // wx.redirectTo({ url: '/page/sqmana/mana'});
//                wx.redirectTo({ url: '/page/sqtg/sqtg_PersonCenter'});
//            }else if (res.data.ssshuqup != "0") {
                wx.redirectTo({ url: '/page/sqtg/sqtg_index?scene=' + res.data.ssshuqup });
//            }

        });

    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.dialog = this.selectComponent("#search-box");
  }

})