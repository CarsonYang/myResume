define(function (require) {
    'use strict';
    var $ = require('jquery');
    require('imgpreload');

    var loadimg = function(){
        $.get("loadimg.json", function(data){
            var arrImg = data;
            var max_len = arrImg.length;
            $.imgpreload(arrImg, {
                each : function(img){
                    var t = (new Date).getTime();
                    var p = parseInt(img.length/max_len*100);
                    $('.mask').text(p+'%');
                    //console.log(p+'--'+t);
                },
                all : function () {
                    $('.mask').hide();
                    window.location.hash = '#/page1';
                }
            });
        });
    }();
});