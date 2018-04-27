var app = getApp();
var server = require('../../utils/server');
Page({
    data: {
        page: 1,
        page_size: 6,
        typ: 0,
        filterId: 1,
        searchWords: '',
        placeholder: '输入商品关键字',
        products: [],
        scrollTop: 100
    },
    onLoad: function () {
        var self = this;
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/GetProdatapf.ashx', { showmodel: '', page: self.data.page, page_size: self.data.page_size }, function (res) {
            self.setData({
                showResult: true,
                products: res.data.results
            })
            //console.log('products', res)
        });
        wx.showShareMenu({
            withShareTicket: true
        });
    },

    onShareAppMessage: function (res) {

        return {
            title: '搜农坊-乡村新鲜货体验式购物平台',
            path: '/page/index/search',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    },
    onShow: function () {
        //this.setData({
        //	showResult: false
        //});      
    },
    inputSearch: function (e) {
        this.setData({
            searchWords: e.detail.value
        })
    },
    doSearch: function () {
        var self = this;
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/GetProdatapf.ashx', { SearchKey: self.data.searchWords, page: self.data.page, page_size: self.data.page_size }, function (res) {
            self.setData({
                showResult: true,
                products: res.data.results
            });
            //console.log('products', res)
        });
    },
    tapFilter: function (e) {
        var self = this;
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/GetProdatapf.ashx', { typ: e.target.dataset.id, page: self.data.page, page_size: self.data.page_size }, function (res) {
            self.setData({
                showResult: true,
                filterId: e.target.dataset.id,
                products: res.data.results,
                typ: e.target.dataset.id
            })
            //console.log('products', res)
        });
    },
    loadImages: function () {
        var self = this;
        self.data.page = self.data.page + 1;
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/GetProdatapf.ashx', { SearchKey: self.data.searchWords, typ: self.data.typ, page: self.data.page, page_size: self.data.page_size }, function (res) {
            if (self.data.page > res.data.allpage) {
            }
            else {
                self.setData({
                    showResult: true,
                    products: res.data.results,
                    page: parseInt(res.data.page),
                    scrollTop: 100
                });
            }
            //console.log('products', res)
        });
    },
    refesh: function () {
        var self = this;
        self.data.page = self.data.page - 1;
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/GetProdatapf.ashx', { SearchKey: self.data.searchWords, typ: self.data.typ, page: self.data.page, page_size: self.data.page_size }, function (res) {
            if (self.data.page < 1) {
            }
            else {
                self.setData({
                    showResult: true,
                    products: res.data.results,
                    page: parseInt(res.data.page),
                    scrollTop: 100
                });
            }
            //console.log('products', res)
        });
    },
    Upfilter: function () {

    }
});

