// page/sqtg/sqtg_pro.js
var app = getApp();
var server = require('../../utils/server');
Page({

  /**
  * 页面的初始数据
  */
  data: {
    isDetailsShow: true,
    tEvaluateSum: 0,
    tEvaluate: [],
    sqstate: {
      hour: 0,
      min: 0,
      sec: 0
    },
    products: [],
    detailsList: [],
    recordList: []
  },
  isShowDetail: function () {
    this.setData({
      isDetailsShow: !this.data.isDetailsShow
    });
    //   console.log(this.data.products[0]);
  },
  isShowDetails: function () {
    this.setData({
      isDetailsShow: false
    });
    //   console.log(this.data.products[0]);
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var sqtgbountyid = options.scene;
    var self = this;
    var rd_session = wx.getStorageSync('rd_session');
    if (!rd_session) {
      self.login(sqtgbountyid);
    }
    else {
      server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetsqtgDecData.ashx', { sqtgbountyid: sqtgbountyid, userid: rd_session }, function (res) {
        //  console.log('products', res);
        var totalSecond = res.data.products[0].bulk_endtime - Date.parse(new Date()) / 1000;

        var interval = setInterval(function () {
          // 秒数  
          var second = totalSecond;

          // 天数位  
          var day = Math.floor(second / 3600 / 24);
          var dayStr = day.toString();
          if (dayStr.length == 1) dayStr = '0' + dayStr;

          // 小时位  
          //var hr = Math.floor((second - day * 3600 * 24) / 3600);
          var hr = Math.floor(second / 3600);
          var hrStr = hr.toString();
          if (hrStr.length == 1) hrStr = '0' + hrStr;

          // 分钟位  
          //  var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
          var min = Math.floor((second - hr * 3600) / 60);
          var minStr = min.toString();
          if (minStr.length == 1) minStr = '0' + minStr;

          // 秒位  
          // var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
          var sec = second - hr * 3600 - min * 60;
          var secStr = sec.toString();
          if (secStr.length == 1) secStr = '0' + secStr;


          totalSecond--;
          if (totalSecond < 0) {
            clearInterval(interval);
            self.setData({
              tEvaluate: res.data.tEvaluate,
              tEvaluateSum: res.data.tEvaluateSum,
              products: res.data.products,
              detailsList: res.data.pro_wapcon,
              recordList: res.data.recordList,
              sqstate: { hour: 0, min: 0, sec: 0 }
            });
          }
          else {
            self.setData({
              tEvaluate: res.data.tEvaluate,
              tEvaluateSum: res.data.tEvaluateSum,
              products: res.data.products,
              detailsList: res.data.pro_wapcon,
              recordList: res.data.recordList,
              sqstate: { hour: hrStr, min: minStr, sec: secStr }
            });
          }
        }.bind(this), 1000);
      });
    }
    wx.showShareMenu({
      withShareTicket: true
    });
  },
  onShareAppMessage: function (res) {
    return {
      title: this.data.products[0].sqtgtit1,
      path: '/page/sqtg/sqtg_pro?scene=' + this.data.products[0].id,
      imageUrl: this.data.products[0].pro_pic,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  tapBuyCart: function (e) {
    this.addCart(e.currentTarget.dataset.id, 1);
  },
  backIndex: function () {
    wx.redirectTo({ url: '/page/sqtg/sqtg_index' });
  },
  addCart: function (id) {
    if(this.data.products[0].boutysum >= this.data.products[0].freeord){
      wx.showModal({
        title: '温馨提示',
        content: '产品已售罄',
        showCancel: false
      });
    }else{
    var self = this;
    var rd_session = wx.getStorageSync('rd_session');
    server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/sqtgbountyBuy.ashx', { bounty_infoid: id, buy_sum: self.data.products[0].buy_sum, userid: rd_session }, function (res) {
      if (res.data.results.errormess != "购买成功") {
        wx.showModal({
          title: '温馨提示',
          content: res.data.results.errormess,
          showCancel: false
        });
      }
      else {
        wx.redirectTo({ url: '/page/sqtg/sqtg_cart' });
      }
    });
    }
  }
  ,
  tapproBuyCart: function (e) {
    //  console.log('products', e);
    this.addproCart(e.currentTarget.dataset.id);
  },
  addproCart: function (id) {
    var self = this;
    var rd_session = wx.getStorageSync('rd_session');
    server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/UserAddShop.ashx', { pid: id, buy_sum: self.data.products[0].buy_sum, userid: rd_session }, function (res) {
      wx.redirectTo({ url: '/page/shop/shop' });
      //wx.redirectTo({ url: '/page/sqtg/sqtg_cart' });
    });
  },
  login: function (sqtgbountyid) {
    var self = this;

        wx.login({
          success: function (rescode) {

            wx.getUserInfo({
              success: function (ressucc) {

                server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/UserLoginUser.ashx', { code: rescode.code, rawData: ressucc.rawData, encryptedData: ressucc.encryptedData, iv: ressucc.iv, signature: ressucc.signature }, function (ures) {
                  // //console.log('wx.login',ures);
                  wx.setStorageSync('rd_session', ures.data.results[0].id);
                  // wx.navigateTo({ url: '/page/sqtg/sqtg_pro?scene='+sqtgbountyid});
                  server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetsqtgDecData.ashx', { sqtgbountyid: sqtgbountyid, userid: ures.data.results[0].id }, function (res) {
                    //  console.log('products', res);
                    var totalSecond = res.data.products[0].bulk_endtime - Date.parse(new Date()) / 1000;

                    var interval = setInterval(function () {
                      // 秒数  
                      var second = totalSecond;

                      // 天数位  
                      var day = Math.floor(second / 3600 / 24);
                      var dayStr = day.toString();
                      if (dayStr.length == 1) dayStr = '0' + dayStr;

                      // 小时位  
                      //var hr = Math.floor((second - day * 3600 * 24) / 3600);
                      var hr = Math.floor(second / 3600);
                      var hrStr = hr.toString();
                      if (hrStr.length == 1) hrStr = '0' + hrStr;

                      // 分钟位  
                      //  var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
                      var min = Math.floor((second - hr * 3600) / 60);
                      var minStr = min.toString();
                      if (minStr.length == 1) minStr = '0' + minStr;

                      // 秒位  
                      // var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
                      var sec = second - hr * 3600 - min * 60;
                      var secStr = sec.toString();
                      if (secStr.length == 1) secStr = '0' + secStr;


                      totalSecond--;
                      if (totalSecond < 0) {
                        clearInterval(interval);
                        self.setData({
                          tEvaluate: res.data.tEvaluate,
                          tEvaluateSum: res.data.tEvaluateSum,
                          products: res.data.products,
                          detailsList: res.data.pro_wapcon,
                          recordList: res.data.recordList,
                          sqstate: { hour: 0, min: 0, sec: 0 }
                        });
                      }
                      else {
                        self.setData({
                          tEvaluate: res.data.tEvaluate,
                          tEvaluateSum: res.data.tEvaluateSum,
                          products: res.data.products,
                          detailsList: res.data.pro_wapcon,
                          recordList: res.data.recordList,
                          sqstate: { hour: hrStr, min: minStr, sec: secStr }
                        });

                      }
                    }.bind(this), 1000);
                  });

                });

              },
                fail: function () {
                     // 显示提示弹窗
                    wx.showModal({
                        title: '授权',
                        content: '拒绝授权将不能正常使用小程序，点确定重新授权',
                        success: function (res) {
                            if (res.confirm) {

                                wx.openSetting({
                                    success: function (data) {
                                        if (data) {
                                            if (data.authSetting["scope.userInfo"] == true) {
                                              
                                                wx.getUserInfo({
                                                    withCredentials: false,
                                                    success: function (data) {
                                                   server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/UserLoginUser.ashx', { code: rescode.code, rawData: data.rawData, encryptedData: data.encryptedData, iv: data.iv, signature: data.signature }, function (ures) {
                  // //console.log('wx.login',ures);
                  wx.setStorageSync('rd_session', ures.data.results[0].id);
                  // wx.navigateTo({ url: '/page/sqtg/sqtg_pro?scene='+sqtgbountyid});
                  server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetsqtgDecData.ashx', { sqtgbountyid: sqtgbountyid, userid: ures.data.results[0].id }, function (res) {
                    //  console.log('products', res);
                    var totalSecond = res.data.products[0].bulk_endtime - Date.parse(new Date()) / 1000;

                    var interval = setInterval(function () {
                      // 秒数  
                      var second = totalSecond;

                      // 天数位  
                      var day = Math.floor(second / 3600 / 24);
                      var dayStr = day.toString();
                      if (dayStr.length == 1) dayStr = '0' + dayStr;

                      // 小时位  
                      //var hr = Math.floor((second - day * 3600 * 24) / 3600);
                      var hr = Math.floor(second / 3600);
                      var hrStr = hr.toString();
                      if (hrStr.length == 1) hrStr = '0' + hrStr;

                      // 分钟位  
                      //  var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
                      var min = Math.floor((second - hr * 3600) / 60);
                      var minStr = min.toString();
                      if (minStr.length == 1) minStr = '0' + minStr;

                      // 秒位  
                      // var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
                      var sec = second - hr * 3600 - min * 60;
                      var secStr = sec.toString();
                      if (secStr.length == 1) secStr = '0' + secStr;


                      totalSecond--;
                      if (totalSecond < 0) {
                        clearInterval(interval);
                        self.setData({
                          tEvaluate: res.data.tEvaluate,
                          tEvaluateSum: res.data.tEvaluateSum,
                          products: res.data.products,
                          detailsList: res.data.pro_wapcon,
                          recordList: res.data.recordList,
                          sqstate: { hour: 0, min: 0, sec: 0 }
                        });
                      }
                      else {
                        self.setData({
                          tEvaluate: res.data.tEvaluate,
                          tEvaluateSum: res.data.tEvaluateSum,
                          products: res.data.products,
                          detailsList: res.data.pro_wapcon,
                          recordList: res.data.recordList,
                          sqstate: { hour: hrStr, min: minStr, sec: secStr }
                        });

                      }
                    }.bind(this), 1000);
                  });

                });

                                                    },
                                                    fail: function () {
                                                        console.info("3授权失败返回数据");
                                                    }
                                                });
                                            }
                                        }
                                    },
                                    fail: function () {
                                        console.info("设置失败返回数据");
                                    }
                                });
                            }
                        }
                    });
                }
            });
          }
        });

  }
})