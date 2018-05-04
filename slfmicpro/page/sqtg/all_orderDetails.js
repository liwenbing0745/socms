// page/sqtg/sqtg_orderDetails.js
var app = getApp();
var server = require('../../utils/server');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    page_size: 6,
    scrollTop: 100,
    order_state:0,
    todata:0,
    tit:"",
    isTz: false,//判断是否为团长
    activeIndex: 0,
    dataIndex: 0,
    delBtnWidth: 180,
    startX:0,
    leftBox:null,
    isShowLeftBox: false,
    today:[
      {
        text: '今天',
        attr: '1'
      },
      {
        text: '昨天',
        attr: '2'
      },
      {
        text: '一周',
        attr: '3'
      },
      {
        text: '三月',
        attr: '4'
      },
      {
        text: '半年',
        attr: '5'
      },
      {
        text: '一年',
        attr: '6'
      }
    ],
    toactive:[
      {
        text: '全部',
        attr: '0'
      },
      {
        text: '待支付',
        attr: '2'
      },
      {
        text: '社区自提',
        attr: '-1'
      },
      {
        text: '待发货',
        attr: '3'
      },
      {
        text: '待收货',
        attr: '4'
      },
      {
        text: '退款单',
        attr: '8'
      }
    ],
    orderDetails:[

    ]
  },

  toData: function (e) {//分类
    let inx = e.currentTarget.dataset.index;
  let todata = e.currentTarget.dataset.id;
   var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetOrderall.ashx', { userid: rd_session,todata:todata, page: self.data.page, page_size: self.data.page_size }, function (res) {
            self.setData({
             order_state:0,
          tit:"",
                orderDetails: res.data.results,
                 todata: todata,
                  dataIndex: inx
            })

        });
  },
  toActive: function (e) {//综合排名
  let order_state = e.currentTarget.dataset.id;
   let inx = e.currentTarget.dataset.index;
   var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetOrderall.ashx', { userid: rd_session,order_state:order_state, page: self.data.page, page_size: self.data.page_size }, function (res) {
            self.setData({
          todata:0,
          tit:"",
            orderDetails: res.data.results,
                 order_state: order_state,
                  activeIndex: inx
            })

        });
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var rd_session = wx.getStorageSync('rd_session');
    server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetOrderall.ashx', { userid: rd_session,order_state:options.order_state,page: self.data.page, page_size: self.data.page_size }, function (res) {
    // console.log('products', res)
      self.setData({
        order_state: options.order_state,
        orderDetails: res.data.results
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.dialog = this.selectComponent("#search-box");
  },
  onSearchData: function (e) {//获取用户输入值
    let tit = this.dialog.searchData();
     var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetOrderall.ashx', { userid: rd_session,tit:tit, page: self.data.page, page_size: self.data.page_size }, function (res) {
            self.setData({
              order_state:0,
            todata:0,
                orderDetails: res.data.results,
                 tit: tit
            })

        });
  },
   loadImages: function () {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        self.data.page = self.data.page + 1;
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetOrderall.ashx', { userid: rd_session, order_state: self.data.order_state, todata: self.data.todata, tit: self.data.tit, page: self.data.page, page_size: self.data.page_size }, function (res) {
            if (self.data.page > res.data.allpage) {
            }
            else {
                self.setData({ scrollTop: 100,
                    orderDetails: res.data.results,
                    page: parseInt(res.data.page),
                    scrollTop: 100
                });
            }
            //console.log('products', res)
        });
    },
    refesh: function () {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        self.data.page = self.data.page - 1;
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetOrderall.ashx', { userid: rd_session, order_state: self.data.order_state, todata: self.data.todata, tit: self.data.tit, page: self.data.page, page_size: self.data.page_size }, function (res) {
            if (self.data.page < 1) {
            }
            else {
                self.setData({ scrollTop: 100,
                    orderDetails: res.data.results,
                    page: parseInt(res.data.page),
                    scrollTop: 100
                });
            }
            //console.log('products', res)
        });
    },
      tapPay: function (e) {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        var openid = wx.getStorageSync('openid');
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/SetOrder.ashx', { userid: rd_session, openid: openid, id: e.target.dataset.id, action: 'tapPay' }, function (res) {
   if (res.data.resultspay.errormess == '') {
         
            wx.requestPayment({
                'timeStamp': res.data.resultspay.timeStamp,
                'nonceStr': res.data.resultspay.nonceStr,
                'package': res.data.resultspay.package,
                'signType': 'MD5',
                'paySign': res.data.resultspay.paySign,
                'success': function (ress) {
                    //                    wx.showModal({
                    //                        title: '提示',
                    //                        content: "支付成功",
                    //                        showCancel: false
                    //                    });
                    server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/UpdateOrderState.ashx', { id: res.data.results[0].id, sp_billno: res.data.results[0].order_no }, function (payres) {
                     wx.navigateTo({ url: '/page/sqtg/all_orderDetails' });
                       });
                 
                },
                'fail': function (ress) {
                    //                    wx.showModal({
                    //                        title: '提示',
                    //                        content: "支付失败",
                    //                        showCancel: false
                    //                    });
                }
            })
            }
            else {
                wx.showModal({
                    title: '温馨提示',
                    content: res.data.resultspay.errormess,
                    showCancel: false
                });
            }
        });
    },
  
    makePhone: function (e) {
       wx.makePhoneCall({
           phoneNumber: e.currentTarget.dataset.id
        })
    },
    tapDele: function (e) {
     wx.showModal({
      title: '提示',
      content: '确认删除订单?',
      success: function (res) {
        if (res.confirm) {
           var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/SetOrder.ashx', { userid: rd_session, id: e.target.dataset.id, action: 'tapDele' }, function (res) {
           wx.navigateTo({ url: '/page/sqtg/all_orderDetails' });
        })

        } 
      }
    })
  },

  touchS:function(e){

    if(e.touches.length==1){

      this.setData({

        //设置触摸起始点水平方向位置

        startX:e.touches[0].clientX

      });

    }

  },

  touchM:function(e){

    if(e.touches.length==1){
      //获取手指触摸的是哪一项

      var index = e.currentTarget.dataset.index;

      var list = this.data.orderDetails;

      //判断

      this.showLeftBox(index);

      this.clearLeftBox(index);

      if(this.data.isShowLeftBox){

        //手指移动时水平方向位置

        var moveX = e.touches[0].clientX;

        //手指起始点位置与移动期间的差值

        var disX = this.data.startX - moveX;

        var delBtnWidth = this.data.delBtnWidth;

        var txtStyle = "";

        if(disX == 0 || disX < 0){//如果移动距离小于等于0，文本层位置不变

          txtStyle = "left:0px";

        }else if(disX > 0 ){//移动距离大于0，文本层left值等于手指移动距离

          txtStyle = "left:-"+disX+"px";

          if(disX>=delBtnWidth){

            //控制手指移动距离最大值为删除按钮的宽度

            txtStyle = "left:-"+delBtnWidth+"px";

          }

        }

        list[index].txtStyle = txtStyle;
        
        //更新列表的状态

        this.setData({

          orderDetails:list,

          leftBox: index

        });

      }

    }else{
      return false;
    }

  },
  //根据订单状态判断能否左滑
  showLeftBox:function(inx){

    let list = this.data.orderDetails;

    let list_key = list[inx].order_state;

    let isShow = false;

    switch (list_key) {
      case '1':
        isShow = true;
        break;
      case '2':
        isShow = true;
        break;
      case '6':
        isShow = true;
        break;
      case '7':
        isShow = true;
        break;
      case '8':
        isShow = true;
        break;
      default:
        isShow = false;
        break;
    };

    this.setData({

      isShowLeftBox: isShow

    });

  },

  //清除已有左滑
  clearLeftBox:function(inx){

    let list = this.data.orderDetails;

    let oinx = this.data.leftBox;

    if( oinx == inx){

      return false

    }else if( oinx ){

      list[oinx].txtStyle = '';

      this.setData({

        orderDetails: list

      });

    };

    this.setData({

      leftBox: oinx

    });

  },

  touchE:function(e){

    if(e.changedTouches.length==1){

      if(this.data.isShowLeftBox){

        //手指移动结束后水平位置

        var endX = e.changedTouches[0].clientX;

        //触摸开始与结束，手指移动的距离

        var disX = this.data.startX - endX;

        var delBtnWidth = this.data.delBtnWidth;

        //如果距离小于删除按钮的1/2，不显示删除按钮

        var txtStyle = disX > delBtnWidth/2 ? "left:-"+delBtnWidth+"px":"left:0px";

        //获取手指触摸的是哪一项

        var index = e.currentTarget.dataset.index;

        var list = this.data.orderDetails;

        list[index].txtStyle = txtStyle;

        //更新列表的状态

        this.setData({

          orderDetails:list

        });

      }

    }

  },

  //获取元素自适应后的实际宽度

  getEleWidth:function(w){

    var real = 0;

    try{

      var res = wx.getSystemInfoSync().windowWidth;

      var scale = (750/2)/(w/2);//以宽度750px设计稿做宽度的自适应

      // console.log(scale);

      real = Math.floor(res/scale);

      return real;

    } catch(e) {

      return false;

     // Do something when catch error

    }

  },

  //设置实际宽度

  initEleWidth:function(){

    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);

    this.setData({

      delBtnWidth:delBtnWidth

    });

  },

  //点击删除按钮事件

  delDetails:function(e){

    //获取列表中要删除项的下标

    var index = e.currentTarget.dataset.index;

    var list = this.data.orderDetails;

    // !! TODO:提交服务器，获取新的数据

    //移除列表中下标为index的项

    list.splice(index,1);

    //更新列表的状态

    this.setData({

      orderDetails:list

    });

  },

})