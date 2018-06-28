// page/sqtg/sqtg_sqtz.js
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
    try_user_nickname: "",
    sqmctihoudian: "",
    mobile: "",
    sqmc: "",
    sqtgaudit:4,
    ssshuqu: "",
    ssshuqup: "",
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    region: ['湖南省', '长沙市', '岳麓区']
    },
  CityChange:function(e){
    this.setData({
      region: e.detail.value
    });
   // console.log(e.detail.value,this.data.region);
  },
    onLoad: function () {
  
     var that = this;
        wx.getLocation({
          type: 'gcj02', //返回可以用于wx.openLocation的经纬度
          success: function (res) {
              that.setData({
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
                                                  that.setData({
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


        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/orderNumList.ashx', { userid: wx.getStorageSync('rd_session')}, function (res) {
//            if (res.data.ssshuqup != "0") {
//                wx.redirectTo({ url: '/page/sqtg/sqtg_index?scene=' + res.data.ssshuqup });
//            }
           
                that.setData({
                    try_user_nickname: res.data.pro[0].try_user_nickname,
                    sqmctihoudian: res.data.pro[0].sqmctihoudian,
                    sqtgaudit: res.data.pro[0].sqtgaudit,
                    ssshuqu: res.data.pro[0].ssshuqu,
                })
           
        });
 },
formSubmit: function (e) {
  //  console.log('wx.login', e);
    var that = this;
   var formId = e.detail.formId;
     var formData = e.detail.value;
      var flag = 0;
       var rd_session = wx.getStorageSync('rd_session');
    	if (!rd_session) {
          flag = 1;  
             wx.showModal({
      title: '授权',
      content: '请授权登录之后再操作',
      success: function (res) {
        if (res.confirm) {
        	that.login();
        }
      }
    })
     	
	}
    if (formData.mobile=="")
    {
     flag = 1;  
    wx.showModal({
      title: '提示',
      content: '请输入手机号',
      success: function (res) {
       
      }
    })
    }
     if (formData.sqmc=="")
    {
         flag = 1;  
 wx.showModal({
      title: '提示',
      content: '请输入小区名称',
      success: function (res) {
       
      }
    })
    }
    if (formData.sqmctihoudian=="")
    { 
         flag = 1;  
wx.showModal({
      title: '提示',
      content: '请填写提货地址',
      success: function (res) {
       
      }
    })
    }
        

   if (flag==0){

   server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/zcfx.ashx', { uid: wx.getStorageSync('rd_session'), formId: formId,sqmctihoudian:formData.sqmctihoudian,sqmc:formData.sqmc,mobile:formData.mobile,procity:formData.procity, longitude: that.data.longitude, latitude: that.data.latitude}, function (ures) {
         
             if (ures.data.results[0].flag=="1")
        {  
        wx.showModal({
      title: '提示',
      content: '申请成功，请耐性等待审核。',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({ url: '/page/sqtg/sqtg_sqtzjg' });
        } 
      }
    })
        }
        else
        {
        wx.showModal({
      title: '提示',
      content: '信息提交失败。',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({ url: '/page/sqtg/sqtg_sqtzjg' });
        }
      }
    })
        }
//           that.setData({
//                    try_user_nickname: ures.data.results[0].try_user_nickname,
//                    sqmctihoudian: ures.data.results[0].sqmctihoudian,
//                    sqtgaudit: ures.data.results[0].sqtgaudit,
//                    ssshuqu: ures.data.results[0].ssshuqu,
//                })  
        });
  
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
           wx.setStorageSync('Invitecode', ures.data.results[0].Invitecode);
	                     
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
           wx.setStorageSync('Invitecode', ures.data.results[0].Invitecode);
	                     
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