var app = getApp();
var server = require('../../utils/server');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_index: 1,//底部导航下标
    select_all: "true",//全选判断
    checkActive:false,//购物车disabled判断
    cart: {
            count: 0,
            total: 0,
            list: {}
    },
    goodsList:[]
  },
  // 物品选择框 
  ToCheck:function(e){
    let id = e.currentTarget.dataset.id;//获取产品id  todo:保存产品id到产品表goods，发送服务器
     var self = this;
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/UpdateSumorder.ashx', { id: id,action:"checked" }, function (res) {
                 
                     self.setData({
                select_all: res.data.select_all,
                  checkActive: res.data.confirmSubmit,
                  goodsList: res.data.goods,
              cart: res.data.cart
            });
         });
  
  },
  // 全选框
  selectAll:function(e){
  let dis = "true";
  if(this.data.select_all == "false"){
    dis = "true";
  }else{
    dis = "false";
  }
        var self = this;
     server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/UpdateSumorder.ashx', { userid: wx.getStorageSync('rd_session'),checked:dis,action:"selectAll"}, function (res) {
                 
                   self.setData({
                  select_all: res.data.select_all,
               checkActive: res.data.confirmSubmit,
                  goodsList: res.data.goods,
              cart: res.data.cart
            });
         });
  
  },
  // 删除产品
  deleteCheck:function(e){
     // 请求服务器，修改数据
         var self = this;
         server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/UpdateSumorder.ashx', { id: e.currentTarget.dataset.id,action:"delete"}, function (res) {
            
                   self.setData({
                  select_all: res.data.select_all,
             checkActive: res.data.confirmSubmit,
                  goodsList: res.data.goods,
              cart: res.data.cart
            })
         });
    // this.setData({
    //   goodsList = array
    // })
  },

   onShow: function (options) {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/sqtg_cart.ashx', { userid: rd_session }, function (res) {
      
            self.setData({
                   select_all: res.data.select_all,
            checkActive: res.data.confirmSubmit,
                  goodsList: res.data.goods,
              cart: res.data.cart
          });
          // console.log(res.data.goods);
        });
    },
    tapAddCart: function (e) {
       var self = this;
          self.setData({
            checkActive: false
        });
         server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/UpdateSumorder.ashx', { id: e.target.dataset.id, buy_sum: 1 ,action:"buy_sum"}, function (res) {
            self.setData({
              select_all: res.data.select_all,
              checkActive: res.data.confirmSubmit,
              goodsList: res.data.goods,
              cart: res.data.cart
            });
        });

    },
    tapReduceCart: function (e) {
    var self = this;
        self.setData({
          checkActive: false
        });
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/UpdateSumorder.ashx', { id: e.target.dataset.id, buy_sum: -1  ,action:"buy_sum"}, function (res) {
          self.setData({
              select_all: res.data.select_all,
              checkActive: res.data.confirmSubmit,
              goodsList: res.data.goods,
              cart: res.data.cart
            });
        });
    },
    submit: function (e) {
      wx.navigateTo({ url: '/page/sqtg/sqtg_order' });
    }
})