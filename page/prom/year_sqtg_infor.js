var app = getApp();
var server = require('../../utils/server');
Page({
    data: {
        duration: 3000,
       tEvaluateSum: 0,
          ptstate: '',
        products: [],
        tEvaluate: [],
        pro_album: [],
        pro_wapcon: []
    },
    onLoad: function (options) {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
           server.getJSON('https://xcx.so50.com/Pages/Ajax/GetsqtgDecData.ashx', { sqtgbountyid: options.sqtgbountyid, userid: rd_session}, function (res) {
        
            var totalSecond = res.data.products[0].bulk_endtime - Date.parse(new Date())/1000;  

    var interval = setInterval(function () {  
      // 秒数  
      var second = totalSecond;  
  
      // 天数位  
      var day = Math.floor(second / 3600 / 24);  
      var dayStr = day.toString();  
      if (dayStr.length == 1) dayStr = '0' + dayStr;  
  
      // 小时位  
      var hr = Math.floor((second - day * 3600 * 24) / 3600);  
      var hrStr = hr.toString();  
      if (hrStr.length == 1) hrStr = '0' + hrStr;  
  
      // 分钟位  
      var min = Math.floor((second - day * 3600 *24 - hr * 3600) / 60);  
      var minStr = min.toString();  
      if (minStr.length == 1) minStr = '0' + minStr;  
  
      // 秒位  
      var sec = second - day * 3600 * 24 - hr * 3600 - min*60;  
      var secStr = sec.toString();  
      if (secStr.length == 1) secStr = '0' + secStr;  

     
      totalSecond--;  
      if (totalSecond < 0) {  
        clearInterval(interval);  
       self.setData({
                       products: res.data.products,
                 tEvaluate: res.data.tEvaluate,
                tEvaluateSum:res.data.tEvaluateSum,
               pro_album: res.data.pro_album,
               ptstate:"拼团已结束",
               pro_wapcon: res.data.pro_wapcon
           });
      }
      else
      {  self.setData({
                       products: res.data.products,
                 tEvaluate: res.data.tEvaluate,
                tEvaluateSum:res.data.tEvaluateSum,
               pro_album: res.data.pro_album,
                 ptstate:dayStr+"天"+hrStr+"时"+minStr+"分"+secStr+"秒",
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
      title: this.data.products[0].sqtgtit1,
      path: '/page/prom/year_sqtg_infor?sqtgbountyid='+this.data.products[0].id,
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
     proReduce: function (e) {
        this.proSum(e.target.dataset.id,-1);
    },
    proAdd: function (e) {
        this.proSum(e.target.dataset.id,1);
    },
    proSum: function (id,buy_sum) {
       var self = this;
         server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/UpdateProDetSum.ashx', { id: id, org_sum:self.data.products[0].buy_sum,buy_sum: buy_sum}, function (res) {
            self.setData({
                 products: res.data.results
             })
        });
     
    },
    tapBuyCart: function (e) {
        this.addCart(e.target.dataset.id, 1);
    },
   
    addCart: function (id, flag) {
         var self = this;
      var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/sqtgbountyBuy.ashx', { bounty_infoid: id, isord: flag, buy_sum:self.data.products[0].buy_sum, userid: rd_session }, function (res) {
           if (res.data.results.errormess != "购买成功") {
                    wx.showModal({
                        title: '温馨提示',
                        content: res.data.results.errormess,
                        showCancel: false
                    });
                }
                else {
                       wx.redirectTo({ url: '/page/prom/year_sqtg_addLess' });
               }
        });
       
    }

});