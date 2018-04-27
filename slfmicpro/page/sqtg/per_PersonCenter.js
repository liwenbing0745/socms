// page/sqtg/sqtg_PersonCenter.js
var app = getApp();
var server = require('../../utils/server');
Page({

    /**
    * 页面的初始数据
    */
    data: {
        img_index: 2,
        uid: wx.getStorageSync('rd_session'),
        try_user_nickname: "",
        sqmctihoudian: "",
        try_user_img:"",
        fxaudit: "",
        pfaudit: "",
        sqtgaudit: "",
        ssshuqu:"",
    
        orderList: [
      {
          url: '/page/sqtg/all_orderDetails?order_state=2',
          icon_img: 'http://wx.so50.com/images/个人中心_01_06.png',
          text: "待付款",
          num: 1
      },
      {
        url: '/page/sqtg/sqtg_orderDetails',
        icon_img: 'http://wx.so50.com/images/34模板、框架-线性(1).png',
        text: "社区自提",
        num: 1
      },
      {
          url: '/page/sqtg/all_orderDetails?order_state=4',
          icon_img: 'http://wx.so50.com/images/01运输中、物流-线性(1).png',
          text: "待发货",
          num: 0
      },
      {
          url: '/page/sqtg/all_orderDetails?order_state=5',
          icon_img: 'http://wx.so50.com/images/个人中心_03.png',
          text: "待收货",
          num: 3
      },
      {
          url: '/page/sqtg/sqtg_orderDetails',
          icon_img: 'http://wx.so50.com/images/个人中心_01_11_03.png',
          text: "退款单",
          num: 1
      },
    ],
        manaList: [
      {
          url: '/page/sqtg/sqtg_index',
          icon_img: 'http://wx.so50.com/images/个人中心_01_18.png',
          text: "我的店铺"
      },
      {
          url: '/page/sqmana/sqtg_oneClickFight',
          icon_img: 'http://wx.so50.com/images/个人中心_01_21.png',
          text: "商品管理"
      },
      {
          url: '/page/sqtg/all_orderDetails',
          icon_img: 'http://wx.so50.com/images/个人中心_01_23.png',
          text: "订单管理"
      },
      {
          url: '/page/sqmana/my_vip',
          icon_img: 'http://wx.so50.com/images/个人中心_03_03.png',
          text: "会员管理"
      }
    ]

    },
    /**
    * 生命周期函数--监听页面加载
    */
    onLoad: function (options) {
        var self = this;
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/orderNumList.ashx', { userid: wx.getStorageSync('rd_session'), ssshuqu: options.ssshuqu }, function (res) {
//            if (res.data.ssshuqup != "0") {
//                wx.redirectTo({ url: '/page/sqtg/sqtg_index?scene=' + res.data.ssshuqup });
//            }
           
                self.setData({
                    try_user_nickname: res.data.pro[0].try_user_nickname,
                    sqmctihoudian: res.data.pro[0].sqmctihoudian,
                    try_user_img: res.data.pro[0].try_user_img,
                    fxaudit: res.data.pro[0].fxaudit,
                    pfaudit: res.data.pro[0].pfaudit,
                    sqtgaudit: res.data.pro[0].sqtgaudit,
                    ssshuqu: res.data.pro[0].ssshuqu,
                    orderList: res.data.orderList
                })
           
        });

    },
    makePhone: function (e) {
        wx.makePhoneCall({
            phoneNumber: '400-0731-930'
        })
    },
    tappfaudit: function (e) {
        if (this.data.pfaudit == '2') {
            wx.navigateTo({ url: '/page/prom/pfprolist' });
        }
        else {
            wx.navigateTo({ url: '/page/prom/pfproaudit' });
        }

    },
    tapsqtgaudit: function (e) {
        var self = this;
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/sqtg_pos.ashx', { userid: wx.getStorageSync('rd_session') }, function (res) {
            self.setData({
                try_user_nickname: res.data.try_user_nickname,
                sqmctihoudian: res.data.sqmctihoudian,
                try_user_img: res.data.try_user_img,
                fxaudit: res.data.fxaudit,
                pfaudit: res.data.pfaudit,
                sqtgaudit: res.data.sqtgaudit,
                ssshuqu: res.data.ssshuqu
            })
            if (res.data.sqtgaudit == '2') {
                wx.navigateTo({ url: '/page/sqmana/mana' });
            }
            else {
                wx.navigateTo({ url: '/page/sqtg/sqtg_sqtz' });
            }
        });
    },
    tapfxaudit: function (e) {
        if (this.data.fxaudit == '2') {
            wx.navigateTo({ url: '/page/prom/sqtlist' });
        }
        else {
            wx.navigateTo({ url: '/page/prom/sqtaudit' });
        }
    }
})