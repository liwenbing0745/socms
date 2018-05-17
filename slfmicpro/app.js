var server = require('./utils/server');
App({
  
	onLaunch: function () {
		var self = this;
		var rd_session = wx.getStorageSync('rd_session');
    	if (!rd_session) {
     		self.login();
	}
//    else{
//         server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/sqtg_pos.ashx', { userid: wx.getStorageSync('rd_session')}, function (res) {
//      
// if (res.data.ssshuqup != "0" || res.data.sqtgaudit == "2") {
//        wx.navigateTo({ url: '/page/sqtg/sqtg_index'});
//    }
//    else{
//        wx.navigateTo({ url: '/page/index/index' });
//     }      
//           
//        });
//    }
	},

  globalData: {
		
	},
	login: function() {
	    var self = this;
	    wx.login({
	        success: function (rescode) {

	            wx.getUserInfo({
	                success: function (ressucc) {
	                    server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/UserLoginUser.ashx', { code: rescode.code, rawData: ressucc.rawData, encryptedData: ressucc.encryptedData, iv: ressucc.iv, signature: ressucc.signature }, function (ures) {
	                        // //console.log('wx.login',ures);
	                        wx.setStorageSync('rd_session', ures.data.results[0].id);
	                        if (ures.data.results[0].ssshuqup != "0" || ures.data.results[0].sqtgaudit == "2") {
	                            wx.navigateTo({ url: '/page/sqtg/sqtg_index' });
	                        }
	                        else {
	                            wx.navigateTo({ url: '/page/index/index' });
	                        }
	                    });

	                },
	                fail: function (resfail) {
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
	                                                        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/UserLoginUser.ashx', { code: rescode.code, rawData: data.rawData, encryptedData: data.encryptedData, iv: data.iv, signature: data.signature }, function (ures) {
	                                                            // //console.log('wx.login',ures);
	                                                            wx.setStorageSync('rd_session', ures.data.results[0].id);
	                                                            if (ures.data.results[0].ssshuqup != "0" || ures.data.results[0].sqtgaudit == "2") {
	                                                                wx.navigateTo({ url: '/page/sqtg/sqtg_index' });
	                                                            }
	                                                            else {
	                                                                wx.navigateTo({ url: '/page/index/index' });
	                                                            }
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


  