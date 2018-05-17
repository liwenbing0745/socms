var app = getApp();
var server = require('../../utils/server');
Page({
    data: {
        duration: 3000,
       tEvaluateSum: 0,
       tcartSum: 0,
        products: [],
        tEvaluate: [],
        pro_album: [],
        pro_wapcon: []
    },
    onLoad: function (options) {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
           server.getJSON('https://xcx.so50.com/Pages/Ajax/GetProDecDatapf.ashx', { id: options.id, userid: rd_session}, function (res) {
        self.setData({
                       products: res.data.products,
          tcartSum: res.data.CartSum,
                 tEvaluate: res.data.tEvaluate,
                tEvaluateSum:res.data.tEvaluateSum,
               pro_album: res.data.pro_album,
               pro_wapcon: res.data.pro_wapcon
           })
        });
         wx.showShareMenu({
  withShareTicket: true
});
    },
      onShareAppMessage: function (res) {
    return {
      title: this.data.products[0].pro_name,
      path: '/page/product/prodec?id='+this.data.products[0].id,
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
    tapIndex: function(e) {
      wx.redirectTo({
        url: '/page/index/index',
      });
    },
     proReduce: function (e) {
        this.proSum(e.target.dataset.id,-1);
    },
    proAdd: function (e) {
        this.proSum(e.target.dataset.id,1);
    },
    proSum: function (id,buy_sum) {
       var self = this;
         server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/UpdateProDetSumpf.ashx', { id: id, org_sum:self.data.products[0].buy_sum,buy_sum: buy_sum}, function (res) {
            self.setData({
                 products: res.data.results
             })
        });
     
    },

    tapAddCart: function (e) {
        this.addCart(e.target.dataset.id, 0);
        wx.showModal({
                title: '提示',
                content: '已加入购物车',
                showCancel: false
            });
    },
    tapBuyCart: function (e) {
        this.addCart(e.target.dataset.id, 1);
    },
    tapAddColl: function (e) {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/AddProCollBrow.ashx', { proid: e.target.dataset.id, userid: rd_session, action: 'Addpersoncollect' }, function (res) {
           wx.showModal({
               title: '提示',
               content: res.data.results.errormess,
               showCancel: false
           });
        });
    },
    addCart: function (id, flag) {
         var self = this;
      var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/UserAddShoppf.ashx', { pid: id, isord: flag, buy_sum:self.data.products[0].buy_sum, userid: rd_session }, function (res) {
      
          self.setData({
                tcartSum:  res.data.results[0].sum
            })
        });
        if (flag == 1) {
            wx.redirectTo({ url: '/page/order/order' });
        }
    }
});