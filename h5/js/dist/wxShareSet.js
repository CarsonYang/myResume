define(function(require){
    var $ = require('jquery');
    var wx = require('wxShare');
    var result = {};

    wx.config({
        debug: false,
        appId: window.sessionStorage.wxConfig_appId,
        timestamp: window.sessionStorage.wxConfig_timestamp,
        nonceStr: window.sessionStorage.wxConfig_nonceStr,
        signature: window.sessionStorage.wxConfig_signature,
        jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ'
        ]
    });

    var def = function(obj){
        obj.link = obj.link ? obj.link : window.location.href;
        wx.ready(function () {
            wx.onMenuShareTimeline({
                title: obj.title,
                link: obj.link,
                imgUrl: obj.imgUrl,
                success: function () {},
                cancel: function () {}
            });
            wx.onMenuShareAppMessage({
                title: obj.title,
                desc: obj.desc,
                link: obj.link,
                imgUrl: obj.imgUrl,
                type: '',
                dataUrl: '',
                success: function () {},
                cancel: function () {}
            });
            wx.onMenuShareQQ({
                title: obj.title,
                desc: obj.desc,
                link: obj.link,
                imgUrl: obj.imgUrl,
                success: function () {},
                cancel: function () {}
            });
        });
    };

    result.wx = wx;
    result.def = def;

    return result;
});