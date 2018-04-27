// page/sqmana/mana.js
var app = getApp();
var server = require('../../utils/server');
Page({

  /**
   * 页面的初始数据
   */
    data: {
      sqmcdipmc: "",
      ssshutongzi:"",
      pfaudit: "",
      fxaudit:"",
      sqtgaudit:"",
      ssshuqu:"",
      ssshuqup: "",
      try_user_img:"",
      sqmc:"",
      stroesInfo: {
      todaySales: 0,
      cumSales:0,
      sumSales: 0,
      cumOrder: 0,
      cumMoney: 0
    },
    manaList:[
      {
        id: 0,
        url: '/page/sqmana/sqtg_index',
        img: 'http://wx.so50.com/images/home-pages_03.png',
        text: '店铺装修'
      },
      {
        id: 1,
        url: '/page/sqmana/sqtg_oneClickFight',
        img: 'http://wx.so50.com/images/home-pages_05.png',
        text: '商品管理'
      },
      {
        id: 2,
        url: '/page/sqmana/sqtg_orderDetails',
        img: 'http://wx.so50.com/images/home-pages_07.png',
        text: '订单明细'
      },
      {
        id: 3,
        url: '/page/sqmana/sqtg_all_record',
        img: 'http://wx.so50.com/images/home-pages_12.png',
        text: '我的收入'
      },
      {
        id: 4,
        url: '/page/sqmana/export_index',
        img: 'http://wx.so50.com/images/home-pages_13.png',
        text: '营销工具'
      },
      {
        id: 5,
        url: '/page/sqmana/my_vip',
        img: 'http://wx.so50.com/images/home-pages_14.png',
        text: '我的会员'
      },
      {
        id: 6,
        url: '/page/prom/pfprolist',
        img: 'http://wx.so50.com/images/home_pages_13_03.png',
        text: '批发系统'
      },
      {
        id: 7,
        url: '/page/sqmana/sqtg_upload',
        img: 'http://wx.so50.com/images/home_pages_13_05.png',
        text: '上传商品'
      },
      {
        id: 8,
        url: '/page/sqmana/sqtg_statistics',
        img: 'http://wx.so50.com/images/home_pages_13_07.png',
        text: '数据统计'
    },
      {
          id: 9,
          url: '/page/sqmana/sqtg_disstatis',
          img: 'http://wx.so50.com/images/text(2).png',
          text: '配送清单'
      },
      {
          id: 10,
          url: '/page/sqmana/sqtg_back',
          img: 'http://wx.so50.com/images/history(1).png',
          text: '售后记录'
      },
      {
          id: 11,
          url: '/page/sqmana/feedback',
          img: 'http://wx.so50.com/images/service_xcx.png',
          text: '申请售后'
      }
    ]
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var self = this;
      var rd_session = wx.getStorageSync('rd_session');
      server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/grwdht.ashx', { userid: rd_session }, function (res) {
          self.setData({
              sqmcdipmc: res.data.pro[0].sqmcdipmc,
              ssshutongzi: res.data.pro[0].ssshutongzi,
              pfaudit: res.data.pro[0].pfaudit,
              sqtgaudit: res.data.pro[0].sqtgaudit,
              ssshuqu: res.data.pro[0].ssshuqu,
              ssshuqup: res.data.pro[0].ssshuqup,
              try_user_img: res.data.pro[0].try_user_img,
              sqmc: res.data.pro[0].sqmc,
              fxaudit: res.data.pro[0].fxaudit,
              stroesInfo: res.data.stroesInfo
          
          })
      });

  }
})