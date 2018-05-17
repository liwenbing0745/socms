var app = getApp();
var server = require('../../utils/server');
Page({
    data: {
      img_index: 2,
        goods: {},
        cart: {
            count: 0,
            total: 0,
            list: {}
        },
        confirmSubmit: true
    },
    onShow: function () {
        this.countCart();
    },
    tapAddCart: function (e) {
        this.setData({
            confirmSubmit: false
        });
        this.addCart(e.target.dataset.id);
    },
    tapReduceCart: function (e) {
        this.setData({
            confirmSubmit: false
        });
        this.reduceCart(e.target.dataset.id);
    },
    addCart: function (id) {
        var self = this;

        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/UpdateShoppingcatSumCart.ashx', { id: id, buy_sum: 1 }, function (res) {
            self.setData({
                goods: res.data.results,
                cart: res.data.cart,
                confirmSubmit: true
            });
        });

    },
    reduceCart: function (id) {
        var self = this;

        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/UpdateShoppingcatSumCart.ashx', { id: id, buy_sum: -1 }, function (res) {
            self.setData({
                goods: res.data.results,
                cart: res.data.cart,
                confirmSubmit: true
            });
        });

    },
    countCart: function () {
        var rd_session = wx.getStorageSync('rd_session');
        var self = this;
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/GetCart.ashx', { userid: rd_session, isord: 0 }, function (res) {
            self.setData({
                goods: res.data.results,
                cart: res.data.cart,
                confirmSubmit: true
            });
        });
    },

    submit: function (e) {
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/SubmitCart.ashx', { userid: rd_session }, function (res) {
               wx.navigateTo({ url: '/page/order/order' });
         });
    }
});

