var app = getApp();
var server = require('../../utils/server');
Page({
    data: {
        longitude: '',
        latitude: '',
        area: '',
        address: '',
        goods: {},
        goodsList: [],
        addresses: [],
        cart: {
            count: 0,
            total: 0,
            list: {}
        },
        confirmSubmit: false
    },
    onShow: function (options) {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/Ajax/GetOrderData.ashx', { userid: rd_session }, function (res) {
            self.setData({
                addresses: res.data.addresses,
                confirmSubmit: res.data.confirmSubmit,
                goodsList: res.data.goodsList,
                goods: res.data.goods,
                cart: res.data.cart
            })
        });
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
         server.getJSON('https://xcx.so50.com/Pages/Ajax/UpdateSumorder.ashx', { id: id, buy_sum: 1, isord: 1 }, function (res) {
            self.setData({
                confirmSubmit: res.data.confirmSubmit,
                goodsList: res.data.goodsList,
                goods: res.data.goods,
                cart: res.data.cart
            });
        });

    },
    reduceCart: function (id) {
        var self = this;
        server.getJSON('https://xcx.so50.com/Pages/Ajax/UpdateSumorder.ashx', { id: id, buy_sum: -1, isord: 1 }, function (res) {
            self.setData({
                confirmSubmit: res.data.confirmSubmit,
                goodsList: res.data.goodsList,
                goods: res.data.goods,
                cart: res.data.cart
            });
        });

    },

    follow: function () {
        this.setData({
            followed: !this.data.followed
        });
    },
    onGoodsScroll: function (e) {
        if (e.detail.scrollTop > 10 && !this.data.scrollDown) {
            this.setData({
                scrollDown: true
            });
        } else if (e.detail.scrollTop < 10 && this.data.scrollDown) {
            this.setData({
                scrollDown: false
            });
        }

        var scale = e.detail.scrollWidth / 570,
			scrollTop = e.detail.scrollTop / scale,
			h = 0,
			classifySeleted,
			len = this.data.goodsList.length;
        this.data.goodsList.forEach(function (classify, i) {
            var _h = 70 + classify.goods.length * (46 * 3 + 20 * 2);
            if (scrollTop >= h - 100 / scale) {
                classifySeleted = classify.id;
            }
            h += _h;
        });
        this.setData({
            classifySeleted: classifySeleted
        });
    },
    tapClassify: function (e) {
        var id = e.target.dataset.id;
        this.setData({
            classifyViewed: id
        });
        var self = this;
        setTimeout(function () {
            self.setData({
                classifySeleted: id
            });
        }, 100);
    },
    openLocation: function (e) {
        var self = this;
        self.setData({
            confirmSubmit: false
        });
        var rd_session = wx.getStorageSync('rd_session');
        var value = e.detail.value;
        wx.chooseAddress({
            success: function (res) {

                server.getJSON('https://xcx.so50.com/Pages/Ajax/AddWxShareAddress.ashx', { userid: rd_session, id: value.addid, userName: res.userName, telNumber: res.telNumber, proviceFirstStageName: res.provinceName, addressCitySecondStageName: res.cityName, addressCountiesThirdStageName: res.countyName, detailInfo: res.detailInfo }, function (res1) {
                    self.setData({
                        addresses: res1.data.results
                    })
                });
            },
            fail: function (res) {
                wx.showModal({
                    title: '提示',
                    content: '获取地址失败',
                    showCancel: false
                });
            }
        })
    },
    submit: function (e) {
        var self = this;
        var openid = wx.getStorageSync('openid');
        var rd_session = wx.getStorageSync('rd_session');
        var value = e.detail.value;
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/UserAddOrder.ashx', { userid: rd_session, openid: openid, deliveraddids: value.id, remark: value.remark, invoiceH: value.invoiceH }, function (res) {
            if (res.data.results[0].errormess == '更新成功') {
                //  wx.navigateTo({ url: '/page/order/orderlist' });
                wx.requestPayment({
                    'timeStamp': res.data.results[0].timeStamp,
                    'nonceStr': res.data.results[0].nonceStr,
                    'package': res.data.results[0].package,
                    'signType': 'MD5',
                    'paySign': res.data.results[0].paySign,
                    'success': function (res) {
                        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/UpdateOrderState.ashx', { id: res.data.results[0].id, sp_billno: res.data.results[0].order_no }, function (payres) {
                            wx.navigateTo({ url: '/page/order/buy' });
                        });
                        //                        wx.showModal({
                        //                            title: '提示',
                        //                            content: "支付成功",
                        //                            showCancel: false
                        //                        });
                    },
                    'fail': function (res) {
                      //  console.log(res)
                        //                        wx.showModal({
                        //                            title: '提示',
                        //                            content: "支付失败",
                        //                            showCancel: false
                        //                        });
                    }
                })
            }
            else {
                wx.showModal({
                    title: '',
                    content: res.data.results[0].errormess,
                    showCancel: false
                });
            }
        });
    }
});


