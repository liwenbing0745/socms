var app = getApp();
var server = require('../../utils/server');

Page({   
 data: {
       uid: wx.getStorageSync('rd_session'),
       storesImg:[],
       id: "0",
       order: '',
       Img: ''
   },
   onLoad: function (options) {
       var self = this;
       self.setData({
           id: options.id,
           order: options.order
       })
   },

    openLocationsubmit: function (e) {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        var value = e.detail.value;
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/AddFeedBack.ashx', { userid: rd_session, id: self.data.id, feedcontent: value.feedcontent, feedcontel: value.feedcontel, feedmoney: value.feedmoney, storesImg:self.data.Img }, function (res) {
            if (res.data.results.errormess == '更新成功') {
                wx.navigateTo({ url: '/page/sqmana/sqtg_back' });
            } 
            wx.showModal({
                title: '提示',
                content: res.data.results.errormess,
                showCancel: false
            });
     
        });
    },
     openLocationstoresImg: function (e) {
        var self = this;
         var Imgs="";
        var rd_session = wx.getStorageSync('rd_session');
        wx.chooseImage({
            success: function (res) {
                var tempFilePaths = res.tempFilePaths;
                // 取四张，限制数量
                let len = res.tempFilePaths.length > 4 ? 4 : res.tempFilePaths.length;
                for(let inx = 0;inx < len;inx++){
                    wx.uploadFile({
                        url: 'https://xcx.so50.com/Pages/ajaxsqtg/UpLoadImg.ashx',
                        filePath: tempFilePaths[inx],
                        name: 'file',
                        formData: {
                            userid: rd_session
                        },
                        success: function (res) {
                            Imgs=Imgs+res.data+","
                            self.setData({
                                storesImg:self.data.storesImg.concat(res.data),
                                Img:Imgs
                            })
                        }
                    })
                }
            }
        })
    }
})
