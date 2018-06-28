
var app = getApp();
var server = require('../../utils/server');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bargain:0.00,//砍价金额
    bargain_infoid: 0,
    sqtgbountyid: 0,
    hiddenLoading:false,
    showAlert: false,
    // 用户信息和产品信息拆开会不会更好一点？
    // 可能会有用户限制购买的情况，所以加一个user_status状态
    // user_bargain判断用户是否砍过该产品，0 和  1 页面效果不同
    user:{
//      user_pic: 'http://wx.so50.com/images/搜农坊首页--3_11.jpg',
//      user_name: '风语叶孤城',
//      user_status: 0,
//      user_bargain: 1
    },
    products: [//精简数据
//      {
//        id: '0001',
//        pro_pic:'http://wx.so50.com/images/搜农坊首页--3_11.jpg',
//        status: 0,//产品状态，能有最好
//        pro_name: '某某某砍价产品标题某某某砍价产品标题某某某砍价产品标题',
//        free_num: 99,//剩余数量
//        remarket: '399.00',//原价
//        nowprice: '250.00',//原价 - 砍价 的最新成交价
//      }
    ],
    // 好友砍价记录
    conut:0,
    buyrecordList:[],
    recordList: [
//      {
//        id: '0001',
//        img: 'http://wx.so50.com/images/搜农坊首页--3_11.jpg',
//        name: '风语叶孤城',
//        bargain: '79.90'//该用户的砍价金额
//      },
//      {
//        id: '0002',
//        img: 'http://wx.so50.com/images/搜农坊首页--3_11.jpg',
//        name: '风语叶孤城1',
//        bargain: '79.90'
//      },
//      {
//        id: '0003',
//        img: 'http://wx.so50.com/images/搜农坊首页--3_11.jpg',
//        name: '风语叶孤城2',
//        bargain: '79.90'
//      }
    ]
  },
  showBargainBox:function(){
    this.setData({
      showAlert: !this.data.showAlert
    })
  },
  showBargain:function(){
    var self = this;
    var rd_session = wx.getStorageSync('rd_session');
    server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/BargainNew.ashx', { sqtgbountyid: self.data.sqtgbountyid,bargain_infoid: self.data.bargain_infoid, uid: rd_session },function (resc) {
      if (resc.data.errormess == '砍价成功') {
        self.setData({
          bargain: resc.data.bargain,
          recordList: resc.data.recordList,
         conut: resc.data.conut,
         buyrecordList: resc.data.buyrecordList,
          showAlert: !self.data.showAlert
        });    
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetsqtgDecDatabar.ashx', { sqtgbountyid: self.data.sqtgbountyid,bargain_infoid: self.data.bargain_infoid, userid: rd_session }, function (res) {
          self.setData({
            products: res.data.products,
            user: res.data.user
          });
          server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetsqtgDecDataUserlistbar.ashx', { sqtgbountyid: self.data.sqtgbountyid,bargain_infoid: self.data.bargain_infoid, userid: rd_session },function (resc) {
            self.setData({
              detailsList: resc.data.pro_wapcon,
                 buyrecordList: resc.data.buyrecordList,
         conut: resc.data.conut,
     recordList: resc.data.recordList
            });                      
          });
        });
      }
      else
      { 
        wx.showModal({
        title: '提示',
        content: resc.data.errormess
      })
      }
    });
  },
  toIndex:function(){
    wx.redirectTo({ url: '/page/sqtg/sqtg_index'});
  },
  // 跳转到自己的砍价
  toMyBargain:function(e){
    wx.redirectTo({ url: '/page/sqtg/bargain?scene='+this.data.products[0].id});
  },
  /**
   * 生命周期函数--监听页面加载
   */
 onLoad: function (options) {
    var sqtgbountyid =0;
    var bargain_infoid = options.scene;
    var self = this;
    var rd_session = wx.getStorageSync('rd_session');
    if (!rd_session) {
      self.login(bargain_infoid);
    }
    else {
      server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetsqtgDecDatabar.ashx', { sqtgbountyid: sqtgbountyid,bargain_infoid: bargain_infoid, userid: rd_session }, function (res) {
        var totalSecond = res.data.products[0].bulk_endtime;

        var interval = setInterval(function () {
          // 秒数  
          var second = totalSecond;

          // 天数位  
          var day = Math.floor(second / 3600 / 24);
          var dayStr = day.toString();
          if (dayStr.length == 1) dayStr = '0' + dayStr;

          // 小时位  
          var hr = Math.floor((second - day * 3600 * 24) / 3600);
           var hrStr = hr.toString();
          if (hrStr.length == 1) hrStr = '0' + hrStr;

          // 分钟位  
            var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
           var minStr = min.toString();
          if (minStr.length == 1) minStr = '0' + minStr;

          // 秒位  
           var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
          var secStr = sec.toString();
          if (secStr.length == 1) secStr = '0' + secStr;


          totalSecond--;
          if (totalSecond < 0) {
            clearInterval(interval);
            self.setData({
               sqstate: { hour: 0, min: 0, sec: 0 }
            });
          }
          else {
            self.setData({
              sqstate: { day: dayStr,hour: hrStr, min: minStr, sec: secStr }
            });
          }
        }.bind(this), 1000);
          self.setData({
              sqtgbountyid: res.data.sqtgbountyid,
              products: res.data.products,
              user: res.data.user,
              bargain_infoid: res.data.bargain_infoid,
              hiddenLoading: true,
              proScen: res.data.sqtgbountyid
            });
          //console.log(self.data.products,res.data.user);
    server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetsqtgDecDataUserlistbar.ashx', { sqtgbountyid: self.data.sqtgbountyid,bargain_infoid: self.data.bargain_infoid, userid: rd_session },function (resc) {
                 //console.log(resc);  
                     self.setData({
                         detailsList: resc.data.pro_wapcon,
                            buyrecordList: resc.data.buyrecordList,
        conut: resc.data.conut,
     recordList: resc.data.recordList
                    });       
                             
                });
            

      });
    }

    wx.showShareMenu({
      withShareTicket: true
    });
  },
  onShareAppMessage: function (res) {
    this.setData({
      showAlert: false
    })
    return {
      title: this.data.products[0].pro_propertyval,
      path: '/page/sqtg/bargain_share?scene=' +this.data.bargain_infoid,
      //imageUrl: this.data.products[0].pro_pic,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  onShow:function(){
  },
    login: function(bargain_infoid) {
	    var self = this;
          wx.login({
                    success: function (rescode) {
                        wx.getUserInfo({
                        success: function (ressucc) {
                            server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/UserLoginUser.ashx', { code: rescode.code ,rawData: ressucc.rawData,encryptedData: ressucc.encryptedData, iv: ressucc.iv, signature: ressucc.signature,bargain_infoid:bargain_infoid}, function (ures) {
                            wx.setStorageSync('rd_session', ures.data.results[0].id);
                            wx.setStorageSync('Invitecode', ures.data.results[0].Invitecode);
	                       wx.redirectTo({
          url: '/page/sqtg/sqtg_index',
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
                                                 server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/UserLoginUser.ashx', { code: rescode.code ,rawData: data.rawData,encryptedData: data.encryptedData, iv: data.iv, signature: data.signature,bargain_infoid:bargain_infoid}, function (ures) {
                            wx.setStorageSync('rd_session', ures.data.results[0].id);
							wx.setStorageSync('Invitecode', ures.data.results[0].Invitecode);
	                     
   wx.redirectTo({
          url: '/page/sqtg/sqtg_index',
        });
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
    },
})