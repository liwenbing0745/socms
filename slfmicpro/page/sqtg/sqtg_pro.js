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
        recordList: [],
        Dynamic: [],
        messageDisplay:false,
        messInx:0,
        message:{},
        isEnd:false,
        endTime:''
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
    messageBox:function(){
        let self = this;
        if(this.data.Dynamic.length == this.data.messInx){
            console.log('not');
            return false;
        }else{
            let newMessage = this.data.Dynamic[this.data.messInx];
            this.setData({
                message: newMessage,
                messInx: this.data.messInx + 1,
                messageDisplay: true
            });
            //console.log(newMessage, this.data.messInx);
        };
        
        //重复调用
        setTimeout(function(){
            self.setData({
                messageDisplay: false
            });
            //console.log('timeout');
            self.messageBox();
        }, 5000);
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
        else
        {
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetsqtgDecData.ashx', { sqtgbountyid: sqtgbountyid, userid: rd_session }, function (res) {
         //  console.log('products', res);
            var totalSecond = res.data.products[0].bulk_endtime;

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
                      tEvaluateSum:res.data.tEvaluateSum,
                      products: res.data.products,
                      detailsList: res.data.pro_wapcon,
                      recordList: res.data.recordList,
                        Dynamic: res.data.Dynamic,
                      sqstate: { hour: 0, min: 0, sec: 0 },
                      isEnd: true
                    });
                }
                else {
                    self.setData({
                      tEvaluate: res.data.tEvaluate,
                      tEvaluateSum:res.data.tEvaluateSum,
                      products: res.data.products,
                      detailsList: res.data.pro_wapcon,
                      recordList: res.data.recordList,
                          Dynamic: res.data.Dynamic,
                      sqstate: { hour: hrStr, min: minStr, sec: secStr },
                      isEnd: false
                    });               
                }
            } .bind(this), 1000);
            //console.log(res.data.products[0]);
            setTimeout(function(){
                self.messageBox();
            }, 3000);
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
        if(!this.data.isEnd){
            this.addCart(e.currentTarget.dataset.id, 1);
        }else{
            wx.showModal({
                title: '提示',
                content: `本期截单时间已结束,下一期${this.data.products[0].pro_show}开启`,
                success:function(res){
                    if(res.confirm){
                        wx.redirectTo({ url: '/page/sqtg/sqtg_index' });
                        //console.log('用户点击确定');
                    }else if (res.cancel){
                        //console.log('用户点击取消');
                    };
                }
            })
        }
    },
    backIndex:function(){
     wx.redirectTo({ url: '/page/sqtg/sqtg_index' });
    },
    addCart: function (id) {
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
    login: function(sqtgbountyid) {
	    var self = this;
        wx.authorize({
            scope: 'scope.userInfo',
            success() {
                wx.login({
                    success: function (res) {
                        wx.getUserInfo({
                        success: function (ressucc) {
                            server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/UserLoginUser.ashx', { code: res.code ,rawData: ressucc.rawData,encryptedData: ressucc.encryptedData, iv: ressucc.iv, signature: ressucc.signature}, function (ures) {
                            //console.log('wx.login',ures);
                            wx.setStorageSync('rd_session', ures.data.results[0].id);
                            // wx.navigateTo({ url: '/page/sqtg/sqtg_pro?scene='+sqtgbountyid});
                                server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetsqtgDecData.ashx', { sqtgbountyid: sqtgbountyid, userid: ures.data.results[0].id }, function (res) {
                                //  console.log('products', res);
                                    var totalSecond = res.data.products[0].bulk_endtime;

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
                                                    tEvaluateSum:res.data.tEvaluateSum,
                                                    products: res.data.products,
                                                    detailsList: res.data.pro_wapcon,
                                                    recordList: res.data.recordList,
                                                    Dynamic: res.data.Dynamic,
                                                    sqstate: { hour: 0, min: 0, sec: 0 }
                                                });
                                            }
                                            else {
                                                self.setData({
                                                    tEvaluate: res.data.tEvaluate,
                                                    tEvaluateSum:res.data.tEvaluateSum,
                                                    products: res.data.products,
                                                    detailsList: res.data.pro_wapcon,
                                                    recordList: res.data.recordList,
                                                    Dynamic: res.data.Dynamic,
                                                    sqstate: { hour: hrStr, min: minStr, sec: secStr }
                                            });
                                        }
                                    } .bind(this), 1000);
                                    });
                                });
                            }
                        });
			        }
		        });   
            }
        });
    }
    
})