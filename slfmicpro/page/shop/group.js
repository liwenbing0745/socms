var app = getApp();
var server = require('../../utils/server');
Page({
    data: {
        duration: 3000,
           tEvaluateSum: 0,
    pro_album: [],
        bountys: [],
        tEvaluate: [],
        bounty_infos: [],
        showModalStatus: false
    },

    onLoad: function (options) {
        var self = this;
        server.getJSON('https://xcx.so50.com/Pages/Ajax/Getbounty_infoData.ashx', { bountyid: options.bountyid }, function (res) {
            self.setData({
                bountys: res.data.bountys,
               pro_album: res.data.pro_album,
               tEvaluate: res.data.tEvaluate,
               tEvaluateSum: res.data.tEvaluateSum,
              bounty_infos: res.data.bounty_infos
            })
       
        });
  
        wx.showShareMenu({
            withShareTicket: true
        })
    },

    onShareAppMessage: function (res) {
        var self = this;
        return {
            title: '搜农坊-乡村新鲜货体验式购物平台',
            path: '/page/shop/group?bountyid=' + self.data.bountys[0].id,
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    },
    tapIndex: function(e){
        wx.redirectTo({
          url: '/page/index/index',
        })
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
    tapAddCart: function (e) {
        this.addCart(e.target.dataset.id);
     
    },
    addCart: function (id) {
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/UserAddShop.ashx', { pid: id, isord: 1, buy_sum: 1, userid: rd_session }, function (res) {
                 wx.navigateTo({ url: '/page/order/order' });
         });
     },
    tapPddbountyBuy: function (e) {
        this.addPddbountyBuy(e.target.dataset.id, 0);
    },
    addPddbountyBuy: function (id, flag) {
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/pddbountyBuy.ashx', { bountyid: id, userid: rd_session }, function (res) {
            if (res.data.results[0].errormess != '购买成功') {
                  wx.showModal({
                      title: '提示',
                      content: res.data.results[0].errormess,
                      showCancel: false
                  });
            }
              else {
                  wx.navigateTo({ url: '/page/order/orderbounty' });
              }
        });
    },
    tapPddbounty_infosBuy: function (e) {
        this.addPddbounty_infosBuy(e.target.dataset.id, 0);
    },
    addPddbounty_infosBuy: function (id, flag) {
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/pddbountyBuy.ashx', { bounty_infoid: id, userid: rd_session }, function (res) {
            if (res.data.results[0].errormess != '购买成功') {
                wx.showModal({
                    title: '提示',
                    content: res.data.results[0].errormess,
                    showCancel: false
                });
            }
            else {
                wx.navigateTo({ url: '/page/order/orderbounty' });
            }
        });
    }
})