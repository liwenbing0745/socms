var app = getApp();
var server = require('../../utils/server');

Page({
    openLocationsubmit: function (e) {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        var value = e.detail.value;
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/AddFeedBack.ashx', { userid: rd_session, feedcontent: value.feedcontent, feedcontel: value.feedcontel }, function (res) {
            if (res.data.results.errormess == '更新成功') {
                wx.navigateTo({ url: '/page/sqtg/sqtg_PersonCenter' });
            } 
            wx.showModal({
                title: '提示',
                content: res.data.results.errormess,
                showCancel: false
            });
     
        });
    }
})
