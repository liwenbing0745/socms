// page/sqtg/bargain_share_img.js
var app = getApp();
var server = require('../../utils/server');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  products:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
        var rd_session = wx.getStorageSync('rd_session');
           server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/BargainNewBarImg.ashx', { sqtgbountyid: options.sqtgbountyid,bargain_infoid: options.bargain_infoid}, function (res) {
         self.setData({
                       products: res.data.products
           });
         self.saveImg();
          });
     wx.showShareMenu({
      withShareTicket: true
    });
  },
   onShareAppMessage: function (res) {
    return {
      title: this.data.products[0].pro_propertyval,
      path: '/page/sqtg/bargain_share?scene='+this.data.products[0].bargain_infoid,
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
      url: this.data.products[0].imgurl,
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