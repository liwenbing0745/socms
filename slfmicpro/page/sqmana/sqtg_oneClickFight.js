// page/sqmana/sqtg_oneClickFight.js
var app = getApp();
var server = require('../../utils/server');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
        page_size: 6,
          scrollTop: 100,
          typ:0,
          ord:0,
          tit:"",
    sortSelect: 0,
    sortList:[
      {
        text: '今日爆款',
        attr: '0'
      },
      {
        text: '水果',
        attr: '158'
      },
      {
        text: '零食',
           attr: '281'
   },
      {
        text: '食材',
            attr: '159'
  },
      {
        text: '礼盒',
             attr: '161'
 }
    ],
    complexSelect: 0,
    complexList: [
      {
        text: '综合',
             attr: '0'
 },
      {
        text: '销量',
             attr: '1'
 },
      {
        text: '价格',
             attr: '2'
 }
    ],
    proLists:[
     
    ]
  },
  toSort:function(e){//分类
    let inx = e.currentTarget.dataset.index;
   let typ = e.currentTarget.dataset.id;
     var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetProdata.ashx', { userid: rd_session,typ:typ, ord: self.data.ord, tit: self.data.tit, page: self.data.page, page_size: self.data.page_size }, function (res) {
            self.setData({
                proLists: res.data.results,
                 typ: typ,
                 sortSelect: inx
            })

        });

  },
  toComplex:function(e){//综合排名
    let inx = e.currentTarget.dataset.index;
       let ord = e.currentTarget.dataset.id;
     var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetProdata.ashx', { userid: rd_session,ord:ord, typ: self.data.typ, tit: self.data.tit, page: self.data.page, page_size: self.data.page_size }, function (res) {
            self.setData({
                proLists: res.data.results,
                 ord: ord,
                  complexSelect: inx
            })

        });
  
  },

  onSearchData: function (e) {//获取用户输入值
    let tit = this.dialog.searchData();
      var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetProdata.ashx', { userid: rd_session,tit:tit,ord: self.data.ord, page: self.data.page, page_size: self.data.page_size }, function (res) {
            self.setData({
                proLists: res.data.results,
                 tit: tit
            })

        });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetProdata.ashx', { userid: rd_session,page: self.data.page, page_size: self.data.page_size }, function (res) {
            self.setData({
                proLists: res.data.results
            })

        });
  },
  tapFilters: function (e) {
    let isvalid = e.currentTarget.dataset.isvalid;
    if (isvalid == 1){
    var self = this;
     var rd_session = wx.getStorageSync('rd_session');
       server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/Updatesqtg.ashx', { id: e.currentTarget.dataset.id, isvalid: 0,userid: rd_session,page: self.data.page, page_size: self.data.page_size }, function (res) {
      wx.showModal({
        title: '温馨提示',
        content: '上架成功',
        showCancel: false
      });
       self.setData({
                proLists: res.data.results
            })
       // console.log('products', res)
    });
    }else{
      wx.showModal({
        title: '温馨提示',
        content: '商品已上架，请勿重复上架。',
        showCancel: false
      });
    }
},
tapFilterx: function (e) {
  let isvalid = e.currentTarget.dataset.isvalid;
  if (isvalid == 0) {
    var self = this;
     var rd_session = wx.getStorageSync('rd_session');
       server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/Updatesqtg.ashx', { id: e.currentTarget.dataset.id, isvalid: 1,userid: rd_session,page: self.data.page, page_size: self.data.page_size  }, function (res) {
      wx.showModal({
        title: '温馨提示',
        content: '下架成功',
        showCancel: false
      });
       self.setData({
                proLists: res.data.results
            })
       // console.log('products', res)
    });
  }else{
    wx.showModal({
      title: '温馨提示',
      content: '商品已下架，请勿重复下架。',
      showCancel: false
    });
  }
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.dialog = this.selectComponent("#search-box");
  },
   loadImages: function () {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        self.data.page = self.data.page + 1;
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetProdata.ashx', { userid: rd_session, tit: self.data.tit, typ: self.data.typ, ord: self.data.ord, page: self.data.page, page_size: self.data.page_size }, function (res) {
            if (self.data.page > res.data.allpage) {
            }
            else {
                self.setData({
                    proLists: res.data.results,
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
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetProdata.ashx', { userid: rd_session, tit: self.data.tit, typ: self.data.typ, ord: self.data.ord, page: self.data.page, page_size: self.data.page_size }, function (res) {
            if (self.data.page < 1) {
            }
            else {
                self.setData({
                    proLists: res.data.results,
                    page: parseInt(res.data.page),
                    scrollTop: 100
                });
            }
            //console.log('products', res)
        });
    }
})