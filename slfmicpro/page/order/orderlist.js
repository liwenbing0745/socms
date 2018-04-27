var app = getApp();
var server = require('../../utils/server');
Page({
    data: {
        page: 1,
        page_size: 6,
        filterId: 0,
        orderlists: [],
        scrollTop: 100
    },
    onLoad: function () {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/GetOrder.ashx', { userid: rd_session, page: self.data.page, page_size: self.data.page_size }, function (res) {
            self.setData({
                orderlists: res.data.results
            })

        });
    },
    tapFilter: function (e) {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/GetOrder.ashx', { userid: rd_session, order_state: e.target.dataset.id, page: self.data.page, page_size: self.data.page_size }, function (res) {
            self.setData({
                filterId: e.target.dataset.id,
                orderlists: res.data.results
            })
        });
    },
    loadImages: function () {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        self.data.page = self.data.page + 1;
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/GetOrder.ashx', { userid: rd_session, order_state: self.data.filterId, page: self.data.page, page_size: self.data.page_size }, function (res) {
            if (self.data.page > res.data.allpage) {
            }
            else {
                self.setData({
                    orderlists: res.data.results,
                    page: parseInt(res.data.page),
                    scrollTop: 100
                });
            }
            //console.log('products', res)
        });
    },
    refesh: function () {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        self.data.page = self.data.page - 1;
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/GetOrder.ashx', { userid: rd_session, order_state: self.data.filterId, page: self.data.page, page_size: self.data.page_size }, function (res) {
            if (self.data.page < 1) {
            }
            else {
                self.setData({
                    orderlists: res.data.results,
                    page: parseInt(res.data.page),
                    scrollTop: 100
                });
            }
            //console.log('products', res)
        });
    },
    tapPay: function (e) {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        var openid = wx.getStorageSync('openid');
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/SetOrder.ashx', { userid: rd_session, openid: openid, id: e.target.dataset.id, action: 'tapPay' }, function (res) {
            //console.log(res)
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
                        orderlists: res.data.results
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
        });
    },
    tapRei: function (e) {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/SetOrder.ashx', { userid: rd_session, id: e.target.dataset.id, action: 'tapRei' }, function (res) {
            self.setData({
                orderlists: res.data.results
            })
        });
    },
    tapRes: function (e) {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/SetOrder.ashx', { userid: rd_session, id: e.target.dataset.id, action: 'tapRes' }, function (res) {
            self.setData({
                orderlists: res.data.results
            })
        });
    },
    tapDele: function (e) {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/SetOrder.ashx', { userid: rd_session, id: e.target.dataset.id, action: 'tapDele' }, function (res) {
            self.setData({
                orderlists: res.data.results
            })
        })
    }
});

