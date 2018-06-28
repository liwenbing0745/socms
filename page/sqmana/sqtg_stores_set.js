// page/sqtg/sqtg_stores_set.js
var app = getApp();
var server = require('../../utils/server');
Page({

  /**
   * 页面的初始数据
   */
    data: {
        uid: wx.getStorageSync('rd_session'),
        longitude: 112.93134,
   latitude: 28.23529,
         try_user_nickname:"",
        sqmcdipmc:"",
        ssshutongzi:"",
        pfaudit:"",
        fxaudit:"",
       sqtgaudit:"",
         ssshuqu:"",
        ssshuqup: "",
      try_user_img:"",
        sqmc:"",
        dpdesc:"",
        mobile:"",
        storesImg:"",
        ysIs: "",
        bgImgsid:"0",
        bgImgs:[
        
        ]
  },
  radioChange:function(e){
    console.log(e.detail.value);
  },
  openLocationuser_img: function (e) {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        wx.chooseImage({
            success: function (res) {
                var tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                        url: 'https://xcx.so50.com/Pages/ajaxsqtg/UpLoadImg.ashx',
                    filePath: tempFilePaths[0],
                    name: 'file',
                    formData: {
                        userid: rd_session
                    },
                    success: function (res) {
                      self.setData({
                        try_user_img: res.data
                      })
                    }
                  
                })
            }
        })
    },
      openLocationstoresImg: function (e) {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        wx.chooseImage({
            success: function (res) {
                var tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                       url: 'https://xcx.so50.com/Pages/ajaxsqtg/UpLoadImg.ashx',
                    filePath: tempFilePaths[0],
                    name: 'file',
                    formData: {
                        userid: rd_session
                    },
                    success: function (res) {
                       self.setData({
                          storesImg:res.data
                      })
                    }
                })
            }
        })
    },
    onShow: function () {
    var self = this;
    var rd_session = wx.getStorageSync('rd_session');
     server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetTry_pro_infosqtgData.ashx', { userid: wx.getStorageSync('rd_session'), showmodel: '', page: self.data.page, page_size: self.data.page_size }, function (res) {

        self.setData({
            bgImgs: res.data.bgImgs,
            try_user_nickname: res.data.uro[0].try_user_nickname,
            sqmcdipmc: res.data.uro[0].sqmcdipmc,
            ssshutongzi: res.data.uro[0].ssshutongzi,
            pfaudit: res.data.uro[0].pfaudit,
            fxaudit: res.data.uro[0].fxaudit,
            sqtgaudit: res.data.uro[0].sqtgaudit,
   ssshuqu: res.data.uro[0].ssshuqu,
   ssshuqup: res.data.uro[0].ssshuqup,

            try_user_img: res.data.uro[0].try_user_img,
             sqmc: res.data.uro[0].sqmc,
            dpdesc: res.data.uro[0].dpdesc,
            mobile: res.data.uro[0].mobile,
            ysIs: res.data.uro[0].ysIs,
           storesImg: res.data.uro[0].storesImg
        });

    });
 
},
  onLoad: function () {
      var self = this;
      wx.getLocation({
          type: 'gcj02', //返回可以用于wx.openLocation的经纬度
          success: function (res) {
              self.setData({
                  longitude: res.longitude,
                  latitude: res.latitude
              });

          },
          fail: function (resfail) {
              // 显示提示弹窗
              wx.showModal({
                  title: '授权',
                  content: '请授权使用地理位置',
                  success: function (res) {
                      if (res.confirm) {

                          wx.openSetting({
                              success: function (data) {
                                  if (data) {
                                      if (data.authSetting["scope.userLocation"] == true) {
                                          wx.getLocation({
                                              type: 'gcj02', //返回可以用于wx.openLocation的经纬度
                                              success: function (res) {
                                                  self.setData({
                                                      longitude: res.longitude,
                                                      latitude: res.latitude
                                                  });

                                              }
                                          });
                                      }
                                  }
                              }

                          });
                      }
                  }
              });
          }
      });

      var rd_session = wx.getStorageSync('rd_session');
      server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetTry_pro_infosqtgData.ashx', {userid: wx.getStorageSync('rd_session') ,showmodel: '', page: self.data.page, page_size: self.data.page_size }, function (res) {

          self.setData({
              bgImgs: res.data.bgImgs,
              try_user_nickname: res.data.uro[0].try_user_nickname,
         sqmcdipmc: res.data.uro[0].sqmcdipmc,
            ssshutongzi: res.data.uro[0].ssshutongzi,
            pfaudit: res.data.uro[0].pfaudit,
            fxaudit: res.data.uro[0].fxaudit,
            sqtgaudit: res.data.uro[0].sqtgaudit,
   ssshuqu: res.data.uro[0].ssshuqu,
   ssshuqup: res.data.uro[0].ssshuqup,

            try_user_img: res.data.uro[0].try_user_img,
             sqmc: res.data.uro[0].sqmc,
            dpdesc: res.data.uro[0].dpdesc,
            mobile: res.data.uro[0].mobile,
            ysIs: res.data.uro[0].ysIs,
           storesImg: res.data.uro[0].storesImg
                    });

      });




},

tapbgImgsid: function (e) {
    var self = this;
    self.setData({
        storesImg: e.currentTarget.dataset.id
    })
},
 formSubmit: function (e) {
     var that = this;
      var formData = e.detail.value;
        var formId = e.detail.formId;
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/UpdateUsers.ashx', { uid: wx.getStorageSync('rd_session'), try_user_nickname: formData.try_user_nickname, sqmcdipmc: formData.sqmcdipmc, ssshutongzi: formData.ssshutongzi, dpdesc: formData.dpdesc, mobile: formData.mobile, try_user_img: formData.try_user_img, storesImg: formData.storesImg, ysIs: formData.ysIs, longitude: that.data.longitude, latitude: that.data.latitude }, function (res) {
                that.setData({
                   confirmSubmit: true
                })
       wx.redirectTo({ url: '/page/sqmana/mana'});
              });

  }
})