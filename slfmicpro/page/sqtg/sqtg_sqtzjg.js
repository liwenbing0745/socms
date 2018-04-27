// page/sqtg/sqtg_sqtz.js
var app = getApp();
var server = require('../../utils/server');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: wx.getStorageSync('rd_session'),
    try_user_nickname: "",
    sqmctihoudian: "",
    mobile: "",
    sqmc: "",
    sqtgaudit:4,
    ssshuqu: "",
    ssshuqup: "",
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    region: ['湖南省', '长沙市', '岳麓区']
    },
  CityChange:function(e){
    this.setData({
      region: e.detail.value
    });
   // console.log(e.detail.value,this.data.region);
  },
    onLoad: function () {
  
     var that = this;
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/orderNumList.ashx', { userid: wx.getStorageSync('rd_session')}, function (res) {
//            if (res.data.ssshuqup != "0") {
//                wx.redirectTo({ url: '/page/sqtg/sqtg_index?scene=' + res.data.ssshuqup });
//            }
           
                that.setData({
                    try_user_nickname: res.data.pro[0].try_user_nickname,
                    sqmctihoudian: res.data.pro[0].sqmctihoudian,
                    sqtgaudit: res.data.pro[0].sqtgaudit,
                    ssshuqu: res.data.pro[0].ssshuqu,
                })
           
        });
 }
})