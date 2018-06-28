// page/sqmana/sqtg_u.js
var app = getApp();
var server = require('../../utils/server');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    uid: wx.getStorageSync('rd_session'),
    confirmSubmit: true,
    pro_pic:"",
    savaPro: false,
    pro_wapcon:"",
    savaWapcon:false,
    id:"0",
    selectInx: 0,
    array:['水果','礼品','食材','零食'],
    sortSelect: 0,
   sortList:[
      {
        text: '水果',
        attr: '158'
      },
      {
        text: '零食',
           attr: '281'
   },
      {
        text: '食材',
            attr: '159'
  },
      {
        text: '礼品',
             attr: '161'
 }
    ],

    pro: [
    ]
  },

  listen:function(e){
    let obj = e.detail.value;
    this.setData({
      selectInx: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/GetProdatasqt.ashx', {id:options.id ,userid: rd_session,page: self.data.page, page_size: self.data.page_size }, function (res) {
          // console.log('products', res),
          //  console.log('options.id', options.id)
            self.setData({
              selectInx:res.data.pro[0].selectInx,
            pro: res.data.pro,
             pro_pic: res.data.pro[0].img,
             pro_wapcon: res.data.pro[0].pro_wapcon
            })

        });
  },

     openLocationuser_img: function (e) {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        wx.chooseImage({
            success: function (res) {
                var tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                        url: 'https://xcx.so50.com/Pages/ajaxsqtg/UpLoadImg.ashx',
                    filePath: tempFilePaths[0],
                    name: 'file',
                    formData: {
                        userid: rd_session
                    },
                    success: function (res) {
                      self.setData({
                        pro_pic: res.data,
                        savaPro: true
                      })
                    }
                  
                })
            }
        })
    },
      openLocationstoresImg: function (e) {
        var self = this;
        var rd_session = wx.getStorageSync('rd_session');
        wx.chooseImage({
            success: function (res) {
                var tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                       url: 'https://xcx.so50.com/Pages/ajaxsqtg/UpLoadImg.ashx',
                    filePath: tempFilePaths[0],
                    name: 'file',
                    formData: {
                        userid: rd_session
                    },
                    success: function (res) {
                       self.setData({
                        pro_wapcon:res.data,
                        savaWapcon: true
                    })
                    }
                })
            }
        })
    },
 formSubmit: function (e) {
      // console.log('wx.login', e);
      var that = this;
        that.setData({
            confirmSubmit: false
        });
      var formData = e.detail.value;
         var formId = e.detail.formId;
  
        server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/UpdatePros.ashx', { uid: wx.getStorageSync('rd_session'),pro_pic:formData.pro_pic,pro_name:formData.pro_name,pro_Fittingids:formData.pro_Fittingids,weight_units:formData.weight_units,area:formData.area,pro_wapcon:formData.pro_wapcon,pro_ourpri:formData.pro_ourpri,price:formData.price,pro_markpri:formData.pro_markpri,pro_sqtgpri:formData.pro_sqtgpri, sort: formData.sort,id:formData.id}, function (res) {
                that.setData({
                   confirmSubmit: true
                })
              wx.redirectTo({ url: '/page/sqmana/sqtg_oneClickFight'});
        });

  },
      tapTake: function (e) {
     wx.showModal({
      title: '提示',
      content: '确认删除?',
      success: function (res) {
        if (res.confirm) {
          server.getJSON('https://xcx.so50.com/Pages/ajaxsqtg/UpdatePros.ashx', {uid: wx.getStorageSync('rd_session'), id: e.target.dataset.id, action: 'tapdele' }, function (res) {
               wx.redirectTo({ url: '/page/sqmana/sqtg_oneClickFight'});
      })

        } 
      }
    })

        }
})