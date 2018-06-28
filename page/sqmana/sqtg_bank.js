// page/sqmana/sqtg_bank.js
var app = getApp();
var server = require('../../utils/server');
Page({

  /**
   * 页面的初始数据
   */
  data: {
         uid: wx.getStorageSync('rd_session'),
     try_user_nickname: wx.getStorageSync('try_user_nickname'),
      offermoney: '100',
      isBank: false,
    species:[
      {
        name: 'wx',
        value: '微信钱包',
        checked: true
      },
      {
        name:'yhk',
        value: '银行卡',
        checked: false
      }
    ]
  },
  giveActive:function(e){
      if (e.detail.value == '银行卡') {
      this.setData({
        isBank: true
      })
    }else{
      this.setData({
        isBank: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var self = this;
      var rd_session = wx.getStorageSync('rd_session');
      server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/demonry.ashx', { userid: rd_session }, function (res) {
          self.setData({
              stroesInfo: res.data.stroesInfo

          })
      });
  }
  ,
  tapoffermoney: function (e) {
       this.setData({
           offermoney: e.currentTarget.dataset.id
      })
  },
   formSubmit: function (e) {
       //console.log('wx.login', e);
      var that = this;
      var formData = e.detail.value;
      var formId = e.detail.formId;
   
      server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/UserAddutix.ashx', { uid: wx.getStorageSync('rd_session'), radiogroup: formData.radiogroup, username: formData.username, bank: formData.bank, bankcard: formData.bankcard, try_user_nickname: formData.try_user_nickname, txje: formData.txje}, function (res) {
          if (res.data.results.errormess != "") {
              wx.showModal({
                  title: '温馨提示',
                  content: res.data.results.errormess,
                  showCancel: false
              });
          }
          else {
              wx.redirectTo({ url: 'page/sqmana/mana' });
          }
      });


  }
})