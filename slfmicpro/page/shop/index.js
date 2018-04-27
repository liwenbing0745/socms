var app = getApp();
var server = require('../../utils/server');
Page({
    data: {
        bountys: []
    },
    onLoad: function () {
        var self = this;
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/pdd_bounty.ashx', { top: 100 }, function (res) {
            self.setData({
                bountys: res.data.results
            })
            //console.log('products', res)
        });
        wx.showShareMenu({
  withShareTicket: true
});
    },
      onShareAppMessage: function (res) {
 
    return {
      title: '搜农坊-乡村新鲜货体验式购物平台',
      path: '/page/shop/index',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }
});

