// page/sqtg/bargain.js
var app = getApp();
var server = require('../../utils/server');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bargain:0.00,//砍价金额
    alcLeft: 0,
    alcRight: 0,
    bargain_infoid: 0,
    sqtgbountyid: 0,
    hiddenLoading:false,
    isHelp:false,
    showMask:false,
    isEnds:false,//判断砍价结束
    sqstate: {
        day: 0,
        hour: 0,
        min: 0,
        sec: 0
    },
    showAlert: false,
    proScen:null,
    // 用户信息和产品信息拆开会不会更好一点？
    // 可能会有用户限制购买的情况，所以加一个user_status状态
    // user_bargain判断用户是否砍过该产品，0 和  1 页面效果不同
    user:{
//      user_pic: 'http://wx.so50.com/images/搜农坊首页--3_11.jpg',
//      user_name: '风语叶孤城',
//      user_status: 0,
//      user_bargain: 1
    },
    products: [
//      {
//        id: '0001',
//        pro_pic:'http://wx.so50.com/images/搜农坊首页--3_11.jpg',
//        status: 0,//产品状态，能有最好
//        pro_name: '某某某砍价产品标题某某某砍价产品标题某某某砍价产品标题',
//        free_num: 99,//剩余数量
//        min_price: '1.00',//最低价 价格保留两位小数
//        remarket: '399.00',//原价
//        nowprice: '250.00',//原价 - 砍价 的最新成交价
//        barprice: '100.00',//砍价总金额
//        start_time: '2018-06-20 17:00:00',
//        end_time: '2018-06-20 18:00:00'
//      }
    ],
    // 产品详情图片
    detailsList: [],
    // 好友砍价记录
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
      showAlert: !this.data.showAlert,
      showMask: !this.data.showMask
    })
  },
  toHelp:function(){
    this.setData({
      isHelp: !this.data.isHelp,
      showMask: !this.data.showMask
    })
  },
  saveImg:function(){
     var self = this;
       var rd_session = wx.getStorageSync('rd_session');
 
    self.setData({
      isHelp: !this.data.isHelp,
      showMask: !this.data.showMask
    });
      server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/BargainNewBarImg.ashx', { sqtgbountyid: self.data.sqtgbountyid,bargain_infoid: self.data.bargain_infoid, uid: rd_session },function (resc) {
       wx.redirectTo({ url: '/page/sqtg/bargain_share_img?sqtgbountyid='+ self.data.sqtgbountyid+'&bargain_infoid='+self.data.bargain_infoid});
                });
   

   
  },
  showBargain:function(){
    var self = this;
   var rd_session = wx.getStorageSync('rd_session');
    server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/BargainNew.ashx', { sqtgbountyid: self.data.sqtgbountyid,bargain_infoid: self.data.bargain_infoid, uid: rd_session },function (resc) {
      
                    if (resc.data.errormess == '砍价成功') {
                    self.setData({
                         bargain: resc.data.bargain,
                         recordList: resc.data.recordList,
                        showAlert: !self.data.showAlert,
                        showMask: !self.data.showMask
                    });    
                          server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetsqtgDecDatabar.ashx', { sqtgbountyid: self.data.sqtgbountyid,bargain_infoid: self.data.bargain_infoid, userid: rd_session }, function (res) {
          self.setData({
               products: res.data.products,
              user: res.data.user
            });
            // 调用canvas
          self.Canvas();
    server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetsqtgDecDataUserlistbar.ashx', { sqtgbountyid: self.data.sqtgbountyid,bargain_infoid: self.data.bargain_infoid, userid: rd_session },function (resc) {
                     self.setData({
                         detailsList: resc.data.pro_wapcon,
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
  backIndex:function(){
    wx.redirectTo({ url: '/page/sqtg/sqtg_index'});
  },
  /**
   * 生命周期函数--监听页面加载
   */
 onLoad: function (options) {
    var sqtgbountyid = options.scene;
    var bargain_infoid = options.bargain_infoid;
    var self = this;
    var rd_session = wx.getStorageSync('rd_session');
    if (!rd_session) {
      self.login(sqtgbountyid);
    }
    else {
      server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetsqtgDecDatabar.ashx', { sqtgbountyid: sqtgbountyid,bargain_infoid: bargain_infoid, userid: rd_session }, function (res) {
        console.log(res.data.products[0]); 
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
              sqtgbountyid: sqtgbountyid,
              products: res.data.products,
              user: res.data.user,
              bargain_infoid: res.data.bargain_infoid,
              hiddenLoading: true,
              proScen: sqtgbountyid
            });
          // 调用canvas
          self.Canvas();
          //console.log(self.data.products,res.data.user);
    server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetsqtgDecDataUserlistbar.ashx', { sqtgbountyid: sqtgbountyid,bargain_infoid: self.data.bargain_infoid, userid: rd_session },function (resc) {
                 //console.log(resc);  
                     self.setData({
                         detailsList: resc.data.pro_wapcon,
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
      showAlert:false,
      isHelp:false,
      showMask:false
    });
    return {
      title: this.data.products[0].pro_propertyval,
      path: '/page/sqtg/bargain_share?scene='+this.data.bargain_infoid,
      imageUrl: this.data.products[0].pro_pic,
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
  Canvas:function(){
    let barpri = parseFloat(this.data.products[0].nowprice);
    let oldpri = parseFloat(this.data.products[0].remarket);
    let alc = (oldpri - barpri) / oldpri;
    let alcLeft = null;
    let alcRight = null;
    alcRight = barpri / oldpri * 100;
    if( (alc * 100 - 8) > 80 ){
      alcLeft = 80;
    }else if( (alc * 100 - 8) <= 0){
      alcLeft = 0;
    }else{
      alcLeft = alc * 100 - 8;
    }
    //console.log(alcLeft,alcRight);
    this.setData({
      alcLeft: alcLeft,
      alcRight: alcRight
    });
    //console.log(barpri, oldpri, alc, alcLeft);

    // var ctx = wx.createCanvasContext('canvas');

    // ctx.beginPath()
    // ctx.setStrokeStyle('#dddddd')
    // ctx.setLineCap('round')
    // ctx.setLineWidth(20)
    // ctx.moveTo(10, 50)
    // ctx.lineTo(330, 50)
    // ctx.stroke()
    // ctx.closePath();

    // ctx.beginPath()
    // ctx.setStrokeStyle('#ff7800')
    // ctx.setLineCap('round')
    // ctx.setLineWidth(20)
    // ctx.moveTo(10, 50)
    // ctx.lineTo(alc*330, 50)
    // ctx.stroke()
    // ctx.closePath();

    // ctx.draw();
  },
    login: function(sqtgbountyid) {
	    var self = this;
          wx.login({
                    success: function (rescode) {
                        wx.getUserInfo({
                        success: function (ressucc) {
                            server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/UserLoginUser.ashx', { code: rescode.code ,rawData: ressucc.rawData,encryptedData: ressucc.encryptedData, iv: ressucc.iv, signature: ressucc.signature}, function (ures) {
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
                                                 server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/UserLoginUser.ashx', { code: rescode.code ,rawData: data.rawData,encryptedData: data.encryptedData, iv: data.iv, signature: data.signature}, function (ures) {
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
      tapBuyCart: function (e) {
            this.addCart(e.currentTarget.dataset.id, 1);
     },
   addCart: function (id) {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
            server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/BargainBuy.ashx', { bargain_infoid: id, userid: rd_session }, function (res) {
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
})