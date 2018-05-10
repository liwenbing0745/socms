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
            console.log('没数据啦');
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
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetsqtgDecData.ashx', { sqtgbountyid: sqtgbountyid, userid: rd_session },function (res) {
            var totalSecond = res.data.products[0].bulk_endtime;
   if (totalSecond < 0) {
                    self.setData({
                        products: res.data.products,
                      isEnd: true
                    });
                    
                }
                else {
                    self.setData({
                       products: res.data.products,
                      isEnd: false
                    });               
                }
           server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetsqtgDecDataUserlist.ashx', { sqtgbountyid: sqtgbountyid, userid: rd_session },function (resc) {
          self.setData({
                      tEvaluate: resc.data.tEvaluate,
                      tEvaluateSum:resc.data.tEvaluateSum,
                      detailsList: resc.data.pro_wapcon,
                      recordList: resc.data.recordList,
                          Dynamic: resc.data.Dynamic
                    
                    });       
        });
        // 调用弹窗
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
                                   server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetsqtgDecData.ashx', { sqtgbountyid: sqtgbountyid, userid:  ures.data.results[0].id },function (res) {
            var totalSecond = res.data.products[0].bulk_endtime;
   if (totalSecond < 0) {
                    self.setData({
                        products: res.data.products,
                      isEnd: true
                    });
                }
                else {
                    self.setData({
                       products: res.data.products,
                      isEnd: false
                    });               
                }
           server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetsqtgDecDataUserlist.ashx', { sqtgbountyid: sqtgbountyid, userid:  ures.data.results[0].id },function (resc) {
          self.setData({
                      tEvaluate: resc.data.tEvaluate,
                      tEvaluateSum:resc.data.tEvaluateSum,
                      detailsList: resc.data.pro_wapcon,
                      recordList: resc.data.recordList,
                          Dynamic: resc.data.Dynamic
                    
                    });       
        });

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