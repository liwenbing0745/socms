// page/sqmana/sqtg_amount.js
var app = getApp();
var server = require('../../utils/server');
Page({

    /**
    * 页面的初始数据
    */
    data: {
        uid: wx.getStorageSync('rd_session'),
        Invitecode: wx.getStorageSync('Invitecode')
    }
})