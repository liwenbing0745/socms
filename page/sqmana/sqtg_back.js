// page/sqmana/my_vip.js
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
            tit:"",
             
    peopleLists:[
     
    ]
  },
  onSearchData: function (e) {//获取用户输入值
   let tit = this.dialog.searchData();
     var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/my_back.ashx', { userid: rd_session,tit:tit, page: self.data.page, page_size: self.data.page_size }, function (res) {
            self.setData({
                peopleLists: res.data.results,
               
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
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/my_back.ashx', { userid: rd_session, page: self.data.page, page_size: self.data.page_size }, function (res) {
         //  console.log('products', res)
            self.setData({
             
                peopleLists: res.data.results
              
            })

        });
  },
    loadImages: function () {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        self.data.page = self.data.page + 1;
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/my_back.ashx', { userid: rd_session, tit: self.data.tit, page: self.data.page, page_size: self.data.page_size }, function (res) {
            if (self.data.page > res.data.allpage) {
            }
            else {
                self.setData({
                
                    peopleLists: res.data.results,
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
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/my_back.ashx', { userid: rd_session, tit: self.data.tit, page: self.data.page, page_size: self.data.page_size }, function (res) {
            if (self.data.page < 1) {
            }
            else {
                self.setData({
                  
                    peopleLists: res.data.results,
                    page: parseInt(res.data.page),
                    scrollTop: 100
                });
            }
            //console.log('products', res)
        });
    }
})