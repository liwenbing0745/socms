var app = getApp();
var server = require('../../utils/server');
Page({
    data: {
      img_index: 0,
        ssshuqup: wx.getStorageSync('ssshuqup'),
        sqtgaudit: wx.getStorageSync('sqtgaudit'),
       filterId: 1,
        banners: [],
        xinpin: [],
        xinpinmin: [],
        icons: [
				{
				    id: 1,
				    img: '/imgs/index/options_03.png',
				    name: '特惠拼团',
				    url: '/page/shop/index',
				},
				{
				    id: 2,
				    img: '/imgs/index/options_05.png',
				    name: '精品礼盒',
            url: '/page/index/search'
				},
				{
				    id: 3,
				    img: '/imgs/index/options_07.png',
				    name: '特色馆',
            url: ''
				},
				{
				    id: 4,
				    img: '/imgs/index/options_09.png',
				    name: '产品中心',
            url: '/page/index/search'
				}
		],
        prefectbig: [],
        prefectsmall: [],
        products: [],
        bountys: [],
        ptstate: [],
        SecondsKill: []
    },
    onLoad: function () {
        var self = this;
          var GetIndexDataStorageSecond = wx.getStorageSync('GetIndexDataStorageSecond');
      var res = wx.getStorageSync('GetIndexData');
      if (res) {
       self.setData({
                banners: res.data.banners,
                xinpin: res.data.xinpin,
                xinpinmin: res.data.xinpinmin,
                prefectbig: res.data.prefectbig,
                prefectsmall: res.data.prefectsmall,
                products: res.data.products,
                bountys: res.data.bountys
             })  
            var totalSecond = res.data.SecondsKill[0].bulk_endtime - Date.parse(new Date())/1000;  
             if (totalSecond > 0) {  
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

   //  console.log('wx.login',dayStr+"天"+hrStr+"时"+minStr+"分"+secStr+"秒");
      totalSecond--;  
      self.setData({
        SecondsKill: res.data.SecondsKill,
        ptstate: [dayStr, hrStr, minStr, secStr]
        })  
    }.bind(this), 1000);    
  }
      }
         if (GetIndexDataStorageSecond- Date.parse(new Date())/1000<0) {
   
        server.getJSON('https://xcx.so50.com/Pages/Ajax/GetIndexData.ashx', {userid: wx.getStorageSync('rd_session')}, function (res) {
           wx.setStorageSync('GetIndexData', res);
        var GetIndexDataStorageSecond = Date.parse(new Date())/1000+7200;
         wx.setStorageSync('GetIndexDataStorageSecond', GetIndexDataStorageSecond);

               self.setData({
                banners: res.data.banners,
                xinpin: res.data.xinpin,
                xinpinmin: res.data.xinpinmin,
                prefectbig: res.data.prefectbig,
                prefectsmall: res.data.prefectsmall,
                products: res.data.products,
                bountys: res.data.bountys
             })  
            var totalSecond = res.data.SecondsKill[0].bulk_endtime - Date.parse(new Date())/1000;  
             if (totalSecond > 0) {  
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

   //  console.log('wx.login',dayStr+"天"+hrStr+"时"+minStr+"分"+secStr+"秒");
      totalSecond--;  
      self.setData({
        SecondsKill: res.data.SecondsKill,
        ptstate: [dayStr, hrStr, minStr, secStr]
        })  
    }.bind(this), 1000);    
  }
  });
    }
    wx.showShareMenu({
      withShareTicket: true
    }); 

   

    },

      onShareAppMessage: function (res) {
 
    return {
      title: '搜农坊-乡村新鲜货体验式购物平台',
      path: '/page/index/index',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
    onScroll: function (e) {
        if (e.detail.scrollTop > 100 && !this.data.scrollDown) {
            this.setData({
                scrollDown: true
            });
        } else if (e.detail.scrollTop < 100 && this.data.scrollDown) {
            this.setData({
                scrollDown: false
            });
        }
    },
    tapSearch: function (e) {
      if (e.currentTarget.dataset.id == 2 || e.currentTarget.dataset.id == 4){
        wx.redirectTo({
          url: '/page/index/search',
        });
      }
    },
    tapSearchToo: function (e) {
      wx.redirectTo({
         url: '/page/index/search',
      });
    },
    toNearby: function () {
        var self = this;
        self.setData({
            scrollIntoView: 'nearby'
        });
        self.setData({
            scrollIntoView: null
        });
    },
    tapBanner: function (e) {
        var id = this.data.banners[e.target.dataset.id].id;
           wx.navigateTo({
            url: '/page/index/topic?id= '+id
          })
    },
     onReady: function () {
     var rd_session = wx.getStorageSync('rd_session');
     	if (rd_session) {
         server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/sqtg_pos.ashx', { userid: wx.getStorageSync('rd_session')}, function (res) {
      
 if (res.data.ssshuqup != "0" || res.data.sqtgaudit == "2") {
        wx.redirectTo({
          url: '/page/sqtg/sqtg_index',
        });
    }
    else{
     
     }      
           
        });
      }
  }
});

