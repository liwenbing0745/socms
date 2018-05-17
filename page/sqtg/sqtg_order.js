// page/sqtg/sqtg_.js
var app = getApp();
var server = require('../../utils/server');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      uid: wx.getStorageSync('rd_session'),
      sqmctihoudian:"",
      try_user_nickname: "",
      mobile:"",
      consigneepeo:"",
      consigneemobile:"",
      ispay: "0",
      shopList:[ ] ,
    cart: {
        count: 0,
        total: 0,
        list: {}
    },
    confirmSubmit: false
  },

onShow: function (options) {
    var self = this;
    var rd_session = wx.getStorageSync('rd_session');
    server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetOrdersqtgData.ashx', { userid: rd_session }, function (res) {
        self.setData({
            confirmSubmit: res.data.confirmSubmit,
            sqmctihoudian: res.data.sqmctihoudian,
            try_user_nickname: res.data.try_user_nickname,
            mobile: res.data.mobile,
            consigneepeo: res.data.consigneepeo,
            consigneemobile: res.data.consigneemobile,
            shopList: res.data.goods,
            cart: res.data.cart
        })
    });
},
formSubmit: function (e) {
    var self = this;
      var flag = 0;
       var rd_session = wx.getStorageSync('rd_session');
     if (!rd_session) {
          flag = 1;  
             wx.showModal({
      title: '授权',
      content: '请授权登录之后再操作',
      success: function (res) {
        if (res.confirm) {
        	self.login();
        }
      }
    })
     	
	}
    if (flag==0){
      var formId = e.detail.formId;
    var value = e.detail.value;
    server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/UserAddOrdersqtg.ashx', { userid: rd_session,consigneepeo: value.consigneepeo, consigneemobile: value.consigneemobile, remark: value.remark, invoiceH: value.invoiceH }, function (res) {
        if (res.data.results[0].errormess == '更新成功') {
            //  wx.navigateTo({ url: '/page/order/orderlist' });
            wx.requestPayment({
                'timeStamp': res.data.results[0].timeStamp,
                'nonceStr': res.data.results[0].nonceStr,
                'package': res.data.results[0].package,
                'signType': 'MD5',
                'paySign': res.data.results[0].paySign,
                'success': function (succres) {
                  server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/sendTemplate.ashx', { uid: wx.getStorageSync('rd_session'), formId: formId,action:"Postdatasqtddzfcgtz",id: res.data.results[0].id}, function (sendTemplate) {
    
    });
  
                    server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/UpdateOrderState.ashx', { id: res.data.results[0].id, sp_billno: res.data.results[0].order_no }, function (payres) {
                        wx.redirectTo({ url: '/page/sqtg/all_orderDetails' });
                        self.setData({
                            ispay: "1"
                        })
                     });
                  
                },
                'fail': function (res) {
                    wx.redirectTo({ url: '/page/sqtg/all_orderDetails' });
                }
            })
        }
        else {
          wx.showModal({
            title: '提示',
            content: res.data.results[0].errormess,
          })
            // wx.redirectTo({ url: '/page/sqtg/all_orderDetails' });
        }
    });
   }
},
onReady: function () {
    // wx.showToast({
    //     title: '购买失败，您已购买该产品。',
    //     icon: 'none',
    //     duration: 2000,
    //     mask: true
    // });
    if (this.data.ispay == "1") {
        wx.showModal({
            title: '提示',
            content: '购买失败，每人仅限购买一次',
            success:function(res){
                if(res.confirm){
                    //console.log('用户点击确定');
                }else if (res.cancel){
                    //console.log('用户点击取消');
                };
            }
        })
        wx.redirectTo({ url: '/page/sqtg/all_orderDetails' });
    }
},
	login: function() {
	    var self = this;
   
                wx.login({
			success: function (rescode) {
       
             wx.getUserInfo({
                         success: function (ressucc) {
                         
                server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/UserLoginUser.ashx', { code: rescode.code ,rawData: ressucc.rawData,encryptedData: ressucc.encryptedData, iv: ressucc.iv, signature: ressucc.signature}, function (ures) {
           wx.setStorageSync('rd_session', ures.data.results[0].id);
   
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
                                                   
                                                    success: function (data) {
                                                  server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/UserLoginUser.ashx', { code: rescode.code ,rawData: data.rawData,encryptedData: data.encryptedData, iv: data.iv, signature: data.signature}, function (ures) {
           wx.setStorageSync('rd_session', ures.data.results[0].id);
   
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
			}
		});
        	
	}
})