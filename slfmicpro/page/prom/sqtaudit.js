var app = getApp();
var server = require('../../utils/server');
Page({
    data: {
        id: wx.getStorageSync('rd_session')

    },

    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数  
    },

    formSubmit: function (e) {
        var that = this;
        var formData = e.detail.value;
        server.getJSON('https://xcx.so50.com/Pages/Ajax/UpdateUserInfo.ashx', { id: wx.getStorageSync('rd_session'), mobile: formData.mobile, try_user_province: formData.try_user_province, try_user_city: formData.try_user_city, try_user_area: formData.try_user_area, try_user_street: formData.try_user_street, tuijren: formData.tuijren, try_user_Address: formData.try_user_Address, sqmc: formData.sqmc, pfaudit: formData.pfaudit, fxaudit: formData.fxaudit, sqtgaudit: formData.sqtgaudit }, function (res) {
            wx.showModal({
                title: '温馨提示',
                content: res.data.errormess,
                showCancel: false
            });
            wx.redirectTo({ url: '/page/sqtg/sqtg_PersonCenter' });
        });

     
      
    }
}) 