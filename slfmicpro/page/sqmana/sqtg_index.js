var app = getApp();
var server = require('../../utils/server');
Page({
    data: {
//      sqstate: {
//         day: 0,
//            hour: 0,
//            min: 0,
//            sec: 0
//        },
    uid: wx.getStorageSync('rd_session'),
     scrollTop: 100,
  user:{},
   storesImg: "",
      try_user_img:"",
   fxxcxewmimg:"",
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    page: 1,
    page_size: 14,
    typ: 0,
    filterId: 0,
    searchWords: '',
    img_index:0,
    isTuanZhang: false,
    isModify:false,
    products: [],
    booking: []
  },
  modifyActive:function(){
      this.setData({
        isModify: true
      })
  },
 formSubmit: function (e) {
     //  console.log('wx.login', e);
      var that = this;
      var formData = e.detail.value;
        var formId = e.detail.formId;
   server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/sendTemplate.ashx', { uid: wx.getStorageSync('rd_session'), formId: formId }, function (sendTemplate) {
    });
          server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/UpdateUsers.ashx', { uid: wx.getStorageSync('rd_session'),sqmcdipmc:formData.sqmcdipmc,ssshutongzi:formData.ssshutongzi,dpdesc:formData.dpdesc,mobile:formData.mobile,try_user_img:formData.try_user_img,storesImg:formData.storesImg,ysIs:formData.ysIs}, function (res) {
              that.setData({
                storesImg:that.data.user.storesImg,
      try_user_img:that.data.user.try_user_img,
                isModify: false,
                 user: res.data.results[0]
            });
       });
    wx.navigateTo({
      url: '../sqtg/sqtg_index',
    })
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
                        storesImg: res.data
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
                        try_user_img: res.data

                    })
                }
            })
        }
    })
},
onShow: function () {
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
    server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetProdatasqtindex.ashx', { userid: wx.getStorageSync('rd_session'), showmodel: '', page: self.data.page, page_size: self.data.page_size }, function (res) {

        self.setData({
                   user: res.data.uro[0],
         storesImg:res.data.uro[0].storesImg,
      try_user_img:res.data.uro[0].try_user_img,
    fxxcxewmimg: res.data.uro[0].fxxcxewmimg,
  
            products: res.data.results,
            booking: res.data.products
        });

//        var totalSecond = res.data.bulk_endtime - Date.parse(new Date()) / 1000;
//        if (totalSecond > 0) {
//            var interval = setInterval(function () {
//                // 秒数  
//                var second = totalSecond;

//                // 天数位  
//                var day = Math.floor(second / 3600 / 24);
//                var dayStr = day.toString();
//                if (dayStr.length == 1) dayStr = '0' + dayStr;

//                // 小时位  
//                var hr = Math.floor((second - day * 3600 * 24) / 3600);
//                var hrStr = hr.toString();
//                if (hrStr.length == 1) hrStr = '0' + hrStr;

//                // 分钟位  
//                var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
//                var minStr = min.toString();
//                if (minStr.length == 1) minStr = '0' + minStr;

//                // 秒位  
//                var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
//                var secStr = sec.toString();
//                if (secStr.length == 1) secStr = '0' + secStr;


//                totalSecond--;
//                self.setData({
//                    sqstate: { day: dayStr, hour: hrStr, min: minStr, sec: secStr }
//                });
//            } .bind(this), 1000);
//        }

        //console.log('products', res)
    });

    if (this.data.fxaudit == '2') {
        this.setData({
            isTuanZhang: true
        })
    };


    wx.showShareMenu({
        withShareTicket: true
    });
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
      server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetProdatasqtindex.ashx', {userid: wx.getStorageSync('rd_session') ,showmodel: '', page: self.data.page, page_size: self.data.page_size }, function (res) {
         self.setData({
             user: res.data.uro[0],
         storesImg:res.data.uro[0].storesImg,
      try_user_img:res.data.uro[0].try_user_img,
     fxxcxewmimg: res.data.uro[0].fxxcxewmimg,
  
                      products: res.data.results,
                booking: res.data.products
                    });

//          var totalSecond = res.data.bulk_endtime - Date.parse(new Date()) / 1000;
//          if (totalSecond>0)
//          {
//            var interval = setInterval(function () {
//                // 秒数  
//                var second = totalSecond;

//                // 天数位  
//                var day = Math.floor(second / 3600 / 24);
//                var dayStr = day.toString();
//                if (dayStr.length == 1) dayStr = '0' + dayStr;

//                // 小时位  
//                var hr = Math.floor((second - day * 3600 * 24) / 3600);
//                var hrStr = hr.toString();
//                if (hrStr.length == 1) hrStr = '0' + hrStr;

//                // 分钟位  
//                  var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
//                 var minStr = min.toString();
//                if (minStr.length == 1) minStr = '0' + minStr;

//                // 秒位  
//                 var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
//                 var secStr = sec.toString();
//                if (secStr.length == 1) secStr = '0' + secStr;


//                totalSecond--;
//                    self.setData({
//                        sqstate: { day: dayStr,hour: hrStr, min: minStr, sec: secStr }
//                    });
//            } .bind(this), 1000);
//            }
    
          //console.log('products', res)
      });

      if (this.data.fxaudit=='2'){
        this.setData({
          isTuanZhang: true
        })
      };


    wx.showShareMenu({
      withShareTicket: true
    });
  },
  onShareAppMessage: function (res) {
    var self = this;

    return {
        title: self.data.try_user_nickname + '邀您参加搜农坊社区团购',
      path: '/page/sqtg/sqtg_index?scene=' + self.data.uid,
      imageUrl: self.data.fxxcxewmimg,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
},
tapFilter: function (e) {
    var self = this;
    server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetProdatasqtindex.ashx', { userid: wx.getStorageSync('rd_session'),typ: e.target.dataset.id, page: self.data.page, page_size: self.data.page_size }, function (res) {
       self.setData({
                         filterId: e.target.dataset.id,
            products: res.data.results,
                booking: res.data.products,
            typ: e.target.dataset.id
                    });
        //console.log('products', res)
    });
},
loadImages: function () {
    var self = this;
    self.data.page = self.data.page + 1;
    server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetProdatasqtindex.ashx', { userid: wx.getStorageSync('rd_session'),SearchKey: self.data.searchWords, typ: self.data.typ, page: self.data.page, page_size: self.data.page_size }, function (res) {
       if (self.data.page > res.data.allpage) {
            }
            else {
       self.setData({ scrollTop: 100,
                         products: res.data.results,
            page: parseInt(res.data.page)
                    });
                    }
        //console.log('products', res)
    });

},
refesh: function () {
    var self = this;
    self.data.page = self.data.page - 1;
    server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetProdatasqtindex.ashx', { userid: wx.getStorageSync('rd_session'),SearchKey: self.data.searchWords, typ: self.data.typ, page: self.data.page, page_size: self.data.page_size }, function (res) {
       if (self.data.page < 1) {
            }
            else {
               self.setData({ scrollTop: 100,
                         products: res.data.results,
            page: parseInt(res.data.page)
                    });
                    }
        //console.log('products', res)
    });
},
     previewImage: function (e) {
        var self = this;
        wx.previewImage({
            urls: [self.data.fxxcxewmimg]
        })
    },
    makePhone: function (e) {
    var self = this;
       wx.makePhoneCall({
           phoneNumber: self.data.user.mobile
        })
    },
    toIndex:function(){
    wx.redirectTo({
      url: '../sqtg/sqtg_index',
    })
  },
  toCart: function () {
    wx.redirectTo({
      url: '../sqtg/sqtg_cart',
    })
  },
  toPercenter: function () {
    wx.redirectTo({
      url: '../sqtg/sqtg_PersonCenter',
    })
  },
  bindReplaceInput: function(e) {
        var self = this;
    server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/Updatesqtgprice.ashx', { userid: wx.getStorageSync('rd_session'),id: e.currentTarget.dataset.id, price: e.detail.value}, function (res) {
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetProdatasqtindex.ashx', { userid: wx.getStorageSync('rd_session'), SearchKey: self.data.searchWords, typ: self.data.typ, page: self.data.page, page_size: self.data.page_size }, function (res) {
            if (self.data.page > res.data.allpage) {
            }
            else {
                self.setData({
                    products: res.data.results,
                    page: parseInt(res.data.page)
                });
            }
            //console.log('products', res)
        });

       // console.log('products', res)
    });
  }
});

