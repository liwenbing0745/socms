var app = getApp();
var server = require('../../utils/server');
Page({
    data: {
        tEvaluate: []
    },
    onLoad: function (options) {
        var self = this;
        server.getJSON('https://xcx.so50.com/Pages/Ajaxwx/GetsqtgData.ashx', { sqtgbountyid: options.sqtgbountyid, top: 100 }, function (res) {
            self.setData({
                tEvaluate: res.data.results
            })
        });
    }
});