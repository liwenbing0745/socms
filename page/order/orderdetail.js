var app = getApp();
var server = require('../../utils/server');
Page({
    data: {
        orders: [],
          pros: []
    },
    onLoad: function (options) {
        var self = this;
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/GetOrderDetail.ashx', { id: options.id }, function (res) {
            self.setData({
                orders: res.data.results,
                pros: res.data.resultspro
            })
        });

    },
   tapPay: function (e) {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        var openid = wx.getStorageSync('openid');
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/GetOrderDetail.ashx', { userid: rd_session, openid: openid, id: e.target.dataset.id, action: 'tapPay' }, function (res) {
            if (res.data.resultspay.errormess == '') {
               wx.requestPayment({
                'timeStamp': res.data.resultspay.timeStamp,
                'nonceStr': res.data.resultspay.nonceStr,
                'package': res.data.resultspay.package,
                'signType': 'MD5',
                'paySign': res.data.resultspay.paySign,
                'success': function (ress) {
//                    wx.showModal({
//                        title: '提示',
//                        content: "支付成功",
//                        showCancel: false
                    //                    });
                    server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/UpdateOrderState.ashx', { id: res.data.results[0].id, sp_billno: res.data.results[0].order_no }, function (payres) {
                        wx.navigateTo({ url: '/page/order/buy' });
                    });
                    self.setData({
                        orders: res.data.results,
                        pros: res.data.resultspro
                    })
                },
                'fail': function (ress) {
//                    wx.showModal({
//                        title: '提示',
//                        content: "支付失败",
//                        showCancel: false
//                    });
                }
            })
        }
        else {
            wx.showModal({
                title: '温馨提示',
                content: res.data.resultspay.errormess,
                showCancel: false
            });
        }
        });
    },
    tapRei: function (e) {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/GetOrderDetail.ashx', { userid: rd_session, id: e.target.dataset.id, action: 'tapRei' }, function (res) {
            self.setData({
                orders: res.data.results,
                pros: res.data.resultspro
            })
        });
    },
    tapRes: function (e) {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/GetOrderDetail.ashx', { userid: rd_session, id: e.target.dataset.id, action: 'tapRes' }, function (res) {
            self.setData({
                orders: res.data.results,
                pros: res.data.resultspro
            })
        });
    }
});