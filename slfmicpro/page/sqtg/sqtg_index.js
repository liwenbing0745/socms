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
         searchWords: '',
     
      AreaSNF:"",
      sqmcdipmc:"",
      ssshutongzi:"",
      storesImg: "",
      weixinhao: "",
      ssshuqu: "",
      sqmctihoudian: "",
      try_user_img:"",
      fxxcxewmimg:"",
      sqmc:"",
      fxaudit: "",
      mobile: "",
      scene: 0,
      winWidth: 0,
      winHeight: 0,
      currentTab: 0,
      page: 1,
      page_size: 4,
      typ: 0,
      filterId: 0,
      searchWords: '',
      img_index:0,
      isTuanZhang: false,
      isModify:false,
      products: [],
      cart: {
        count: 0,
        total: 0,
        list: {}
      },
      booking: [],
      scrollFix: false,
      skillProduct:[],
    bkProduct:[]
     
  },
  toCart:function(){
    wx.redirectTo({
      url: 'sqtg_cart',
    });
  },
  modifyActive:function(){
    this.setData({
      isModify: true
    });
  },
//   滚动吸顶
  onPageScroll: function (event) {  
    var scrollTop = event.scrollTop;
    if(scrollTop > 400 && !this.data.scrollFix){
        this.setData({  
            scrollFix:true
        }); 
    }else if(scrollTop < 400 && this.data.scrollFix){
        this.setData({  
            scrollFix:false
        }); 
    };
   },  
 formSubmit: function (e) {
    //  console.log('wx.login', e);
    var that = this;
    var formData = e.detail.value;
    server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/UpdateUsers.ashx', { uid: wx.getStorageSync('rd_session'),sqmcdipmc:formData.sqmcdipmc,ssshutongzi:formData.ssshutongzi,dpdesc:formData.dpdesc,mobile:formData.mobile,try_user_img:formData.try_user_img,storesImg:formData.storesImg,ysIs:formData.ysIs},      function (res) {
                that.setData({
                isModify: false,
                  sqmcdipmc:ures.data.results.sqmcdipmc,
                  ssshutongzi:ures.data.results.ssshutongzi,
                  storesImg:ures.data.results.storesImg,
                  weixinhao:ures.data.results.weixinhao,
                  sqmctihoudian:ures.data.results.sqmctihoudian,
                  try_user_img:ures.data.results.try_user_img,
                  fxxcxewmimg:ures.data.results.fxxcxewmimg,
                  sqmc:ures.data.results.sqmc,
                  mobile:ures.data.results.mobile,
                     ssshuqu:ures.data.results.ssshuqu
            });
       });
  }
,
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
      server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetProdatasqtindexuse.ashx', {userid: wx.getStorageSync('rd_session'),scene:self.data.scene ,showmodel: '', page: self.data.page, page_size: self.data.page_size }, function (res) {
       
         self.setData({
             try_user_nickname: res.data.pro[0].try_user_nickname,
             AreaSNF: res.data.pro[0].AreaSNF,
           scene:res.data.scene,
          sqmcdipmc:res.data.pro[0].sqmcdipmc,
    ssshutongzi:res.data.pro[0].ssshutongzi,
    storesImg: res.data.pro[0].storesImg,
    weixinhao: res.data.pro[0].weixinhao,
    sqmctihoudian: res.data.pro[0].sqmctihoudian,

    try_user_img: res.data.pro[0].try_user_img,
    fxxcxewmimg: res.data.pro[0].fxxcxewmimg,
    sqmc: res.data.pro[0].sqmc,
    fxaudit: res.data.pro[0].fxaudit,
    mobile: res.data.pro[0].mobile,
                       products: res.data.results,
                       skillProduct: res.data.issqtgseckill,
                       bkProduct: res.data.issqtgbk,
                booking: res.data.products,
                 cart: res.data.cart
                    });
                    console.log(res.data.issqtgseckill,res.data.issqtgbk);
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
    inputSearch: function (e) {
        this.setData({
            searchWords: e.detail.value
        })
    },
    doSearch: function () {
        var self = this;
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetProdatasqtindexuse.ashx', {userid: wx.getStorageSync('rd_session'),tit: self.data.searchWords,scene:self.data.scene ,showmodel: '', page: self.data.page, page_size: self.data.page_size }, function (res) {
               self.setData({
              products: res.data.results,
               skillProduct: res.data.issqtgseckill,
                       bkProduct: res.data.issqtgbk,
              booking: res.data.products,
              cart: res.data.cart
            });
        });
    },
  onLoad: function (options) {
      var self = this;
      var rd_session = wx.getStorageSync('rd_session');
         var scene = options.scene;
      if (!rd_session) {
     		self.login(scene);
	}else{
      wx.getSystemInfo({
          success: function (res) {
              self.setData({
                  winWidth: res.windowWidth,
                  winHeight: res.windowHeight
              });
          }

      });
      server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetProdatasqtindexuse.ashx', {userid: wx.getStorageSync('rd_session'),scene:scene,showmodel: '', page: self.data.page, page_size: self.data.page_size }, function (res) {
          console.log('products', res)
         self.setData({
          
             scene: res.data.scene,
             try_user_nickname: res.data.pro[0].try_user_nickname,
             AreaSNF: res.data.pro[0].AreaSNF,
               sqmcdipmc: res.data.pro[0].sqmcdipmc,
             ssshutongzi: res.data.pro[0].ssshutongzi,
              storesImg: res.data.pro[0].storesImg,
              weixinhao: res.data.pro[0].weixinhao,
              sqmctihoudian: res.data.pro[0].sqmctihoudian,
              try_user_img: res.data.pro[0].try_user_img,
              fxxcxewmimg: res.data.pro[0].fxxcxewmimg,
              sqmc: res.data.pro[0].sqmc,
              fxaudit: res.data.pro[0].fxaudit,
              mobile: res.data.pro[0].mobile,
              products: res.data.results,
               skillProduct: res.data.issqtgseckill,
                       bkProduct: res.data.issqtgbk,
              booking: res.data.products,
              cart: res.data.cart
            });

                  if ( res.data.pro[0].fxaudit!='2' && res.data.showModal=="0"){
          wx.showModal({
            title: '提示',
            content: '请确认该社区符合您的收货地址区域。',
            success: function (res) {
              if (res.confirm) {
                //console.log('用户点击确定')
              } else if (res.cancel) {
                //console.log('用户点击取消')
              }
            }
          });
      }
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


      
    }

    wx.showShareMenu({
      withShareTicket: true
    });
  },
  onReady: function () {
    
  },
  onShareAppMessage: function (res) {
    var self = this;

    return {
      title:  self.data.try_user_nickname + '邀您参加搜农坊社区团购',
      path: '/page/sqtg/sqtg_index?scene=' + self.data.scene,
      //imageUrl:self.data.fxxcxewmimg,
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
    server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetProdatasqtindexuse.ashx', { userid: wx.getStorageSync('rd_session'),scene:self.data.scene ,typ: e.currentTarget.dataset.id, page: self.data.page, page_size: self.data.page_size }, function (res) {
      self.setData({
            filterId: e.currentTarget.dataset.id,
            products: res.data.results,
             skillProduct: res.data.issqtgseckill,
                       bkProduct: res.data.issqtgbk,
            booking: res.data.products,
            typ: e.currentTarget.dataset.id
                    });
        //console.log('products', res)
    });
},
// loadImages: function () {
//     var self = this;
//     self.data.page = self.data.page + 1;
//     server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetProdatasqtindexuse.ashx', { userid: wx.getStorageSync('rd_session'),SearchKey: self.data.searchWords, typ: self.data.typ, page: self.data.page, page_size: self.data.page_size }, function (res) {
//        if (self.data.page > res.data.allpage) {
//         }else {
//           self.setData({ scrollTop: 100,
//             products: res.data.results,
//             page: parseInt(res.data.page)
//           });
//         }
//     });
// },
refesh: function () {
    var self = this;
    self.data.page = self.data.page - 1;
    server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetProdatasqtindexuse.ashx', { userid: wx.getStorageSync('rd_session'),SearchKey: self.data.searchWords, typ: self.data.typ, page: self.data.page, page_size: self.data.page_size }, function (res) {
       if (self.data.page < 1) {
            }
            else {   self.setData({ scrollTop: 100,
                         products: res.data.results,
                          skillProduct: res.data.issqtgseckill,
                       bkProduct: res.data.issqtgbk,
            page: parseInt(res.data.page)
                    });
                    }
       // console.log('products', res)
    });
},
     previewImage: function (e) {
        var self = this;
        wx.previewImage({
            urls: [self.data.fxxcxewmimg]
        })
    },
    makePhone: function (e) {
      let self = this;
       wx.makePhoneCall({
           phoneNumber:self.data.mobile
        })
    },
  bindReplaceInput: function(e) {
        var self = this;
//    server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/Updatesqtgprice.ashx', { userid: wx.getStorageSync('rd_session'),id: e.currentTarget.dataset.id, price: e.detail.value}, function (res) {
//      
//       // console.log('products', res)
//    });
  },
    tapBuyCart: function (e) {
        this.addCart(e.currentTarget.dataset.id, 1);
    },

    addCart: function (id) {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/sqtgbountyBuy.ashx', { bounty_infoid: id, buy_sum: 1, userid: rd_session }, function (res) {
          // console.log('products', res)
            if (res.data.results.errormess != "购买成功") {
                wx.showModal({
                    title: '温馨提示',
                    content: res.data.results.errormess,
                    showCancel: false
                });
            }
              self.setData({
              cart: res.data.cart
            });
//            else {
//                wx.redirectTo({ url: '/page/sqtg/sqtg_cart' });
//            }
        });

    },
    login: function(scene) {
	    var self = this;
         wx.authorize({
                scope: 'scope.userInfo',
                success() {
                wx.login({
			success: function (res) {
         
             wx.getUserInfo({
                         success: function (ressucc) {
                         
                server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/UserLoginUser.ashx', { code: res.code ,rawData: ressucc.rawData,encryptedData: ressucc.encryptedData, iv: ressucc.iv, signature: ressucc.signature}, function (ures) {
      	  // //console.log('wx.login',ures);
           wx.setStorageSync('rd_session', ures.data.results[0].id);
        wx.navigateTo({ url: '/page/sqtg/sqtg_index?scene='+scene});
            });
                   
                         }
                     });
			}
		});
        	    
                }
            });
	}
});

