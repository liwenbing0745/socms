var app = getApp();
var server = require('../../utils/server');
Page({
    data: {
        winWidth: 0,
        winHeight: 0,
        currentTab: 0,
     page : 1,
     page_size: 6,
     pageord: 1,
     pageordend: 1,
        typ: 0,
        filterId: 1,
        searchWords: '',
        placeholder: '输入商品关键字',
        products: [],
        orderlists: [],
        orderlistsend: [],
        scrollTop: 100
    },
    onLoad: function () {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
  
        wx.getSystemInfo({
            success: function (res) {
                self.setData({
                    winWidth: res.windowWidth,
                    winHeight: res.windowHeight
                });
            }

        });  
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/GetProdatasqt.ashx', { showmodel: '',page:self.data.page,page_size: self.data.page_size }, function (res) {
            self.setData({
                showResult: true,
                products: res.data.results
            })
            //console.log('products', res)
        });
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/GetOrdersqt.ashx', { userid: rd_session,sqptlbzt:0,page: self.data.page, page_size: self.data.page_size }, function (res) {
            self.setData({
                 orderlists: res.data.results
            })

        });
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/GetOrdersqt.ashx', { userid: rd_session, sqptlbzt: 1, page: self.data.page, page_size: self.data.page_size }, function (res) {
            self.setData({
                orderlistsend: res.data.results,
            })

        });
        wx.showShareMenu({
            withShareTicket: true
        });
    },

      onShareAppMessage: function (res) {
 
    return {
        title: '搜农坊-乡村新鲜货体验式购物平台',
      path: '/page/index/search',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
    onShow: function () {
        //this.setData({
        //	showResult: false
        //});      
    },
    inputSearch: function (e) {
        this.setData({
            searchWords: e.detail.value
        })
    },
    doSearch: function () {
        var self = this;
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/GetProdatasqt.ashx', { SearchKey: self.data.searchWords, page: self.data.page, page_size: self.data.page_size }, function (res) {
             self.setData({
                showResult: true,
                products: res.data.results
            });
            //console.log('products', res)
        });
    
    },
    tapFilter: function (e) {
        var self = this;
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/GetProdatasqt.ashx', { typ: e.target.dataset.id, page: self.data.page, page_size: self.data.page_size }, function (res) {
            self.setData({
                showResult: true,
                filterId: e.target.dataset.id,
                products: res.data.results,
                typ: e.target.dataset.id
            })
            //console.log('products', res)
        });
    },
     loadImages: function () {
         var self = this;
          self.data.page=self.data.page+1;
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/GetProdatasqt.ashx', { SearchKey: self.data.searchWords,typ: self.data.typ,page:self.data.page,page_size: self.data.page_size }, function (res) {
           if (self.data.page > res.data.allpage) {
            }
            else {   self.setData({
                showResult: true,
                products: res.data.results,
                page: parseInt(res.data.page),
                    scrollTop: 100
            });
            }
            //console.log('products', res)
        });
  
    },
       refesh: function () {
        var self = this;
        self.data.page = self.data.page - 1;
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/GetProdatasqt.ashx', { SearchKey: self.data.searchWords,typ: self.data.typ,page:self.data.page,page_size: self.data.page_size}, function (res) {
            if (self.data.page <1) {
            }
            else {   self.setData({
                showResult: true,
                products: res.data.results,
                page:parseInt(res.data.page),
                    scrollTop: 100
            });
            }
            //console.log('products', res)
        });
     },
    loadImagesord: function () {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');

        self.data.pageord = self.data.pageord + 1;
         server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/GetOrdersqt.ashx', { userid: rd_session,sqptlbzt:0, page: self.data.pageord, page_size: self.data.page_size }, function (res) {
           if (self.data.pageord > res.data.allpage) {
            }
            else {  self.setData({
                orderlists: res.data.results,
                pageord: parseInt(res.data.page),
                    scrollTop: 100
            });
            }
            //console.log('products', res)
        });

    },
    refeshord: function () {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        self.data.pageord = self.data.pageord - 1;
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/GetOrdersqt.ashx', { userid: rd_session, sqptlbzt: 0, page: self.data.pageord, page_size: self.data.page_size }, function (res) {
            if (self.data.pageord <1) {
            }
            else {  self.setData({
                orderlists: res.data.results,
                pageord: parseInt(res.data.page),
                    scrollTop: 100
            });
            }
            //console.log('products', res)
        });
    },
    loadImagesordend: function () {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');

        self.data.pageordend = self.data.pageordend + 1;
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/GetOrdersqt.ashx', { userid: rd_session, sqptlbzt: 1, page: self.data.pageordend, page_size: self.data.page_size }, function (res) {
          if (self.data.pageordend > res.data.allpage) {
            }
            else {   self.setData({
                orderlistsend: res.data.results,
                pageordend: parseInt(res.data.page),
                    scrollTop: 100
            });
            }
            //console.log('products', res)
        });

    },
    refeshordend: function () {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        self.data.pageordend = self.data.pageordend - 1;
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/GetOrdersqt.ashx', { userid: rd_session, sqptlbzt: 1, page: self.data.pageordend, page_size: self.data.page_size }, function (res) {
            if (self.data.pageordend <1) {
            }
            else {  self.setData({
                orderlistsend: res.data.results,
                pageordend: parseInt(res.data.page),
                    scrollTop: 100
            });
            }
            //console.log('products', res)
        });
    },
    Upfilter: function(){
      
    },
    bindChange: function (e) {

        var that = this;
        that.setData({ currentTab: e.detail.current });

    },
    swichNav: function (e) {
        var that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
    }  
});
