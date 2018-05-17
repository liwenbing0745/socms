var app = getApp();
var server = require('../../utils/server');
Page({
    data: {
      uid: wx.getStorageSync('rd_session'),
      addresses: [],
      isShowAddRess:false,
       id: '0',
       address: '',
        region: ['湖南省', '长沙市', '岳麓区']
    },
    radioChange:function(e){
      let index = e.currentTarget.dataset.index;
      //传到服务器，选为默认地址 checked=true
    },
    CityChange: function (e) {
      this.setData({
        region: e.detail.value
      })
    },
    addRess:function(){
      this.setData({
        isShowAddRess: !this.data.isShowAddRess
      })
    },  
   
    openLocation:function(){
      var self = this;
      wx.chooseLocation({
        success: function (res) {
          self.setData({
            name: res.name,
            address: res.address
          });
         // console.log('ok ress')
        },
        cancel: function (res) {
          wx.showModal({
            title: '提示',
            content: '获取地址失败',
            showCancel: false
          });
        },
        fail: function (res) {
          wx.showModal({
            title: '提示',
            content: '获取地址失败',
            showCancel: false
          });
        }

      })
    },
       openLocationwx: function (e) {
        var self = this;
        self.setData({
            confirmSubmit: false
        });
        var rd_session = wx.getStorageSync('rd_session');
        var value = e.detail.value;
        wx.chooseAddress({
            success: function (res) {

                server.getJSON('https://xcx.so50.com/Pages/Ajax/AddWxShareAddress.ashx', { userid: rd_session, id: value.addid, userName: res.userName, telNumber: res.telNumber, proviceFirstStageName: res.provinceName, addressCitySecondStageName: res.cityName, addressCountiesThirdStageName: res.countyName, detailInfo: res.detailInfo }, function (res1) {
                    self.setData({
                        addresses: res1.data.results
                    })
                });
            },
            fail: function (res) {
                wx.showModal({
                    title: '提示',
                    content: '获取地址失败',
                    showCancel: false
                });
            }
        })
    },
    onLoad: function () {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/GetUserAddress.ashx', { userid: rd_session }, function (res) {
          
            self.setData({
                   address: res.data.results[0].address,
                region: [res.data.results[0].proviceFirstStageName, res.data.results[0].addressCitySecondStageName, res.data.results[0].addressCountiesThirdStageName],
          addresses: res.data.results
               })
          
        });
    },

    tapDele: function (e) {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/SetUserAddress.ashx', { userid: rd_session, id:  e.currentTarget.dataset.id, action: 'dele' }, function (res) {
             self.setData({
                              address: res.data.results[0].address,
                region: [res.data.results[0].proviceFirstStageName, res.data.results[0].addressCitySecondStageName, res.data.results[0].addressCountiesThirdStageName],
     addresses: res.data.results
            })
            //console.log('addresses', res)
        });
    },
    tapSel: function (e) {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/SetUserAddress.ashx', { userid: rd_session, id:  e.currentTarget.dataset.id, action: 'sel' }, function (res) {
             self.setData({
                              address: res.data.results[0].address,
                region: [res.data.results[0].proviceFirstStageName, res.data.results[0].addressCitySecondStageName, res.data.results[0].addressCountiesThirdStageName],
     addresses: res.data.results
            })
        });
    },
  
  bindReplace: function(e) {
  var self = this;
        var rd_session = wx.getStorageSync('rd_session');
           server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/GetUserAddress.ashx', { userid: rd_session, id:  e.currentTarget.dataset.id }, function (res) {
             self.setData({ id: res.data.results[0].id,
                             address: res.data.results[0].address,
                region: [res.data.results[0].proviceFirstStageName, res.data.results[0].addressCitySecondStageName, res.data.results[0].addressCountiesThirdStageName],
      addresses: res.data.results,
                isShowAddRess: true
            })
            //console.log('addresses', res)
        });
   },
savaRess: function (e) {
   // console.log('wx.login', e);
    var that = this;
    var formData = e.detail.value;
            server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/AddWxShareAddress.ashx', { userid: wx.getStorageSync('rd_session'),id:formData.id,deliveryname:formData.deliveryname,moblie:formData.moblie,detailInfo:formData.detailInfo,procity:formData.procity}, function (res) {
             wx.redirectTo({ url: '/page/order/addresslist'});
       });
 
}
});

