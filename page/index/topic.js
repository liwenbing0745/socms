var app = getApp();
var server = require('../../utils/server');
Page({
    data: {
        banners: [],
        products: []
    },

    onLoad: function (options) {
        var self = this;
        server.getJSON('https://xcx.so50.com/Pages/Ajax/GetTopicData.ashx', { id: options.id }, function (res) {
            self.setData({
                banners: res.data.banners,
                products: res.data.products
            });
         });

        wx.showShareMenu({
            withShareTicket: true
        });
    },
    onShareAppMessage: function (res) {
        var self = this;
    
        return {
            title: '搜农坊-乡村新鲜货体验式购物平台',
            path: '/page/index/topic?id=' + self.data.banners[0].id,
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    }

});

