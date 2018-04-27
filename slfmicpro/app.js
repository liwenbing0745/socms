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
     if (ures.data.results[0].ssshuqup != "0" || ures.data.results[0].sqtgaudit == "2") {
        wx.navigateTo({ url: '/page/sqtg/sqtg_index'});
    }
    else{
        wx.navigateTo({ url: '/page/index/index' });
     }      
            });
                   
                         }
                     });
			}
		});
        	    
                }
            });
	}
})


  