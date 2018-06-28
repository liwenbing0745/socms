// page/sqtg/sqtg_share.js
var app = getApp();
var server = require('../../utils/server');
Page({

  /**
   * 页面的初始数据
   */
  data: {
   products:[]
  },
  onLoad: function (options) {
     var self = this;
        var rd_session = wx.getStorageSync('rd_session');
           server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetsqtgDecData.ashx', { sqtgbountyid: options.sqtgbountyid, userid: rd_session}, function (res) {
         self.setData({
                       products: res.data.products
           });
          });
         wx.showShareMenu({
  withShareTicket: true
});
  },
  onShareAppMessage: function (res) {
    return {
      title: this.data.products[0].sqtgtit1,
      path: '/page/sqtg/sqtg_pro?scene='+this.data.products[0].id,
      imageUrl: this.data.products[0].pro_pic,
      success: function (res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
},
  saveImg: function () {
    console.log('sava');
    wx.downloadFile({
      url: this.data.products[0].fxewmimg,
      success: function (res) {
        let path = res.tempFilePath
        wx.saveImageToPhotosAlbum({
          filePath: path,
          success(res) {
            wx.showModal({
              title: '提示',
              content: '保存图片成功',
              success: function (res) {
                
              }
            })
          },
          fail(res) {
          //  console.log(res)
          },
          complete(res) {
           // console.log(res)
          }
        })
      }, fail: function (res) {
       // console.log(res)
      }
    })

  }
  
})