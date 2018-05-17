var app = getApp();
var server = require('../../utils/server');
Page({
    data: {
        duration: 3000,
        ptstate: '',
        SecondsKills: [],
        pro_wapcon: []
    },
    onLoad: function (options) {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
           server.getJSON('https://xcx.so50.com/Pages/Ajax/GetSecondsKillsData.ashx', { SecondsKillid: options.SecondsKillid}, function (res) {
        
            var totalSecond = res.data.SecondsKillids[0].bulk_endtime - Date.parse(new Date())/1000;  

    var interval = setInterval(function () {  
      // 秒数  
      var second = totalSecond;  
  
      // 天数位  
      var day = Math.floor(second / 3600 / 24);  
      var dayStr = day.toString();  
      if (dayStr.length == 1) dayStr = '0' + dayStr;  
  
      // 小时位  
      var hidehr = Math.floor((second - day * 3600 * 24) / 3600);  
      var hr = Math.floor(second / 3600);  
      var hrStr = hr.toString();  
      if (hrStr.length == 1) hrStr = '0' + hrStr;  
  
      // 分钟位  
      var min = Math.floor((second - day * 3600 * 24 - hidehr * 3600) / 60);  
      var minStr = min.toString();  
      if (minStr.length == 1) minStr = '0' + minStr;  
  
      // 秒位  
      var sec = second - day * 3600 * 24 - hidehr * 3600 - min*60;  
      var secStr = sec.toString();  
      if (secStr.length == 1) secStr = '0' + secStr;  

     
      totalSecond--;  
      if (totalSecond < 0) {  
        clearInterval(interval);  
       self.setData({
                       SecondsKills: res.data.SecondsKillids,
            
               ptstate:"已结束",
               pro_wapcon: res.data.pro_wapcon
           });
      }
      else
      {  self.setData({
              SecondsKills: res.data.SecondsKillids,
              ptstate:hrStr+"时"+minStr+"分"+secStr+"秒",
              pro_wapcon: res.data.pro_wapcon
           });
        
      }  
    }.bind(this), 1000);  
         });
         wx.showShareMenu({
  withShareTicket: true
});

    },
      onShareAppMessage: function (res) {
    return {
      title: this.data.SecondsKills[0].sharetitle,
      path: '/page/prom/SecondsKills?SecondsKillid='+this.data.SecondsKillids[0].id,
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
    tapIndex: function(e) {
      wx.redirectTo({
        url: '/page/index/index',
      });
    },
    tapAddCart: function (e) {
        this.addCart(e.target.dataset.id);
     
    },
    addCart: function (id) {
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/UserAddShop.ashx', { pid: id, isord: 1, buy_sum: 1, userid: rd_session }, function (res) {
                 wx.navigateTo({ url: '/page/order/order' });
         });
     },
         tapPddbountyBuy: function (e) {
        this.addPddbountyBuy(e.target.dataset.id, 0);
    },
      addPddbountyBuy: function (id, flag) {
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/SecondsKillBuy.ashx', { SecondsKillid: id, userid: rd_session }, function (res) {
            if (res.data.results[0].errormess != '购买成功') {
                  wx.showModal({
                      title: '提示',
                      content: res.data.results[0].errormess,
                      showCancel: false
                  });
            }
              else {
                  wx.navigateTo({ url: '/page/order/orderskill' });
              }
        });
    },
});