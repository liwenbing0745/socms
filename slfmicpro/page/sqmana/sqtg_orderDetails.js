// page/sqmana/sqtg_orderDetails.js
var app = getApp();
var server = require('../../utils/server');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    page_size: 10,
    scrollTop: 100,
    order_state:0,
    todata:0,
    tit:"",
    isTz: false,//判断是否为团长
    activeIndex: 0,
    dataIndex: 0,
    today:[
      {
        text: '今天',
        attr: '1'
      },
      {
        text: '昨天',
        attr: '2'
      },
      {
        text: '一周',
        attr: '3'
      },
      {
        text: '三月',
        attr: '4'
      },
      {
        text: '半年',
        attr: '5'
      },
      {
        text: '一年',
        attr: '6'
      }
    ],
    toactive:[
      {
        text: '全部',
        attr: '0'
      },
      {
        text: '未付款',
        attr: '2'
      },
      {
        text: '待自提',
        attr: '4'
      },
      {
        text: '已提货',
        attr: '5'
      },
      {
        text: '退款单',
        attr: '8'
      }
    ],
    orderDetails:[
     
    ]
  },

  toData: function (e) {//分类
    let inx = e.currentTarget.dataset.index;
  let todata = e.currentTarget.dataset.id;
   var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetOrder.ashx', { userid: rd_session,todata:todata, page: self.data.page, page_size: self.data.page_size }, function (res) {
            self.setData({
             order_state:0,
          tit:"",
                orderDetails: res.data.results,
                 todata: todata,
                  dataIndex: inx
            })

        });
  },
  toActive: function (e) {//综合排名
  let order_state = e.currentTarget.dataset.id;
   let inx = e.currentTarget.dataset.index;
   var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetOrder.ashx', { userid: rd_session,order_state:order_state, page: self.data.page, page_size: self.data.page_size }, function (res) {
            self.setData({
          todata:0,
          tit:"",
                orderDetails: res.data.results,
                 order_state: order_state,
                  activeIndex: inx
            })

        });
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetOrder.ashx', { userid: rd_session, page: self.data.page, page_size: self.data.page_size }, function (res) {
       //   console.log('products', res)
             self.setData({
                orderDetails: res.data.results
              
            })

        });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.dialog = this.selectComponent("#search-box");
  },
  onSearchData: function (e) {//获取用户输入值
    let tit = this.dialog.searchData();
     var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetOrder.ashx', { userid: rd_session,tit:tit, page: self.data.page, page_size: self.data.page_size }, function (res) {
            self.setData({
               order_state:0,
          todata:0,
                orderDetails: res.data.results,
                 tit: tit
            })

        });
  },
   loadImages: function () {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        self.data.page = self.data.page + 1;
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetOrder.ashx', { userid: rd_session, order_state: self.data.order_state, todata: self.data.todata, tit: self.data.tit, page: self.data.page, page_size: self.data.page_size }, function (res) {
            if (self.data.page > res.data.allpage) {
               self.setData({
                    page: self.data.page - 1
                });
            }
            else {
                self.setData({
                    orderDetails: res.data.results,
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
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetOrder.ashx', { userid: rd_session, order_state: self.data.order_state, todata: self.data.todata, tit: self.data.tit, page: self.data.page, page_size: self.data.page_size }, function (res) {
            if (self.data.page < 1) {
                self.setData({
                    page: self.data.page + 1
                });
            }
            else {
                self.setData({
                    orderDetails: res.data.results,
                    page: parseInt(res.data.page),
                    scrollTop: 100
                });
            }
            //console.log('products', res)
        });
    },
    makePhone: function (e) {
       wx.makePhoneCall({
           phoneNumber: e.currentTarget.dataset.id
        })
    },
      tapTake: function (e) {
     wx.showModal({
      title: '提示',
      content: '确认提货?',
      success: function (res) {
        if (res.confirm) {
           var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/SetOrder.ashx', { userid: rd_session, id: e.target.dataset.id, action: 'tapRei' }, function (res) {
           wx.navigateTo({ url: '/page/sqmana/sqtg_orderDetails' });
        })

        } 
      }
    })

        },
      makefeedback: function (e) {
        wx.navigateTo({ url: '/page/sqmana/feedback?id='+ e.target.dataset.id + '&&order=' +e.target.dataset.order });
     }

})