var app = getApp();
var server = require('../../utils/server');
Page({
    data: {
        longitude: '',
        latitude: '',
        area: '',
        addresses: [],
        uid: wx.getStorageSync('rd_session')
    },

    onLoad: function (options) {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/Ajax/GetTry_pro_infosqtgData.ashx', { id: options.id, userid: rd_session }, function (res) {
            self.setData({
                addresses: res.data.addresses,
                goods: res.data.goods
            })
        });
    },
    openLocation: function (e) {
        var self = this;

        var rd_session = wx.getStorageSync('rd_session');
        var value = e.detail.value;
        wx.chooseAddress({
            success: function (res) {

                server.getJSON('https://xcx.so50.com/Pages/Ajax/AddWxShareAddresssqtg.ashx', { userid: rd_session, id: value.addid, userName: res.userName, telNumber: res.telNumber, proviceFirstStageName: res.provinceName, addressCitySecondStageName: res.cityName, addressCountiesThirdStageName: res.countyName, detailInfo: res.detailInfo }, function (res1) {
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
    formSubmit: function (e) {
        var that = this;
        var formData = e.detail.value;
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/UpdateTry_sqtgbounty_info.ashx', { uid: wx.getStorageSync('rd_session'), price: formData.price, pfprice: formData.pfprice, deliveraddids: formData.deliveraddids, pro_sqtgpriptts: formData.pro_sqtgpriptts, id: formData.id}, function (res) {
            if (res.data.results.errormess != "") {
                wx.showModal({
                    title: '温馨提示',
                    content: res.data.results.errormess,
                    showCancel: false
                });
            }
            else {
                wx.redirectTo({ url: '/page/prom/year_sqtg_infor?sqtgbountyid=' + res.data.results.sqtgbountyid });
            }
        });
     }
}) 