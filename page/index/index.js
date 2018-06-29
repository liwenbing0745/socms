var app = getApp();
var server = require('../../utils/server');
Page({
       data: {
   longitude: 113.324520,
   latitude: 23.099994,
   hiddenLoading: false,
   isGetInfo: false,
   markers: []
},
onLoad: function (options) {

 
},

  markertap(e) {
    console.log(e.markerId)
        wx.redirectTo({
          url: '/page/sqtg/sqtg_index?scene='+e.markerId,
        });
  },
  onGotUserInfo: function(e) {
    var self = this;
    this.setData({
      isGetInfo: true
    });
    wx.login({
        success: function (rescode) {
            server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/UserLoginUser.ashx', { code: rescode.code, rawData: e.detail.rawData, encryptedData: e.detail.encryptedData, iv: e.detail.iv, signature: e.detail.signature }, function (ures) {
                // //console.log('wx.login',ures);
                wx.setStorageSync('rd_session', ures.data.results[0].id);
                wx.setStorageSync('Invitecode', ures.data.results[0].Invitecode);
                if (ures.data.results[0].ssshuqup != "0" || ures.data.results[0].sqtgaudit == "2") {
                    wx.redirectTo({ url: '/page/sqtg/sqtg_index' });
                }
            });

        }
    });

  },
     onReady: function () {
       var self = this;
     var rd_session = wx.getStorageSync('rd_session');
     	if (rd_session) {
         server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/sqtg_pos.ashx', { userid: wx.getStorageSync('rd_session')}, function (res) {
      
 if (res.data.ssshuqup != "0" || res.data.sqtgaudit == "2") {
        wx.redirectTo({
          url: '/page/sqtg/sqtg_index',
        });
    }
    else
    {
      
     wx.getLocation({
         type: 'gcj02', //返回可以用于wx.openLocation的经纬度
         success: function (resLoc) {
             self.setData({
                 longitude: resLoc.longitude,
                 latitude: resLoc.latitude,
                hiddenLoading: true
             });
               server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetMapMarkers.ashx', {longitude: self.data.longitude, latitude: self.data.latitude}, function (resMarkers) {
         console.log(resMarkers)
           self.setData({
                markers: resMarkers.data.markers
                    });
     });
          
         }
     });

     }      
           
        });
      }
  }
});

