define(function(require){
    'use strict';
    var $ = require('jquery');
    require('touch');

    var Banner = function (obj, option) {
        var that = this;
        this.obj = obj;
        this.option =  $.extend({}, $.fn.banner.defaults, option);
        this.type = this.option.type;
        this.width = this.obj.width();
        this.height = this.obj.height();

        if ( this.type === 'html' ) {
            this.creatHtml();
            this.loadImg(function(){
                that.runHtmpType();
            });
        }
    };

    Banner.prototype = {
        constructor : Banner,
        sort : function (index) {
            var arr = this.option.data,
                result = {},
                max = arr.length - 1,
                current = index,
                next = index < max ? index+1 : 0,
                prev = index > 0 ? index-1 : max;
            result.prev = prev;
            result.current = current;
            result.next = next;
            return result;
        },
        runHtmpType : function () {
            this.setBackground(0);
            var ul = this.obj.find('ul');
            var firstLi = ul.find('li').eq(0);
            var left = 0;
            ul.touch('moveTo', function(e){
                left += e.perX;
                firstLi.css({
                    'margin-left' : left
                });
                console.log(e);
            });
        },
        setBackground : function(index){
            var objIndex = this.sort(index),
                ul = this.obj.find('ul'),
                li = ul.find('li'),
                prevLi = li.eq(0),
                currentLi = li.eq(1),
                nextLi = li.eq(2);
            prevLi.css('background-image','url("'+this.option.data[objIndex.prev].src+'")');
            currentLi.css('background-image','url("'+this.option.data[objIndex.current].src+'")');
            nextLi.css('background-image','url("'+this.option.data[objIndex.next].src+'")');
            console.log(objIndex);
        },
        creatHtml : function () {
            var strHtmlCode = '';
            strHtmlCode += '<ul>';
            strHtmlCode += '<li></li>';
            strHtmlCode += '<li></li>';
            strHtmlCode += '<li></li>';
            strHtmlCode += '</ul>';
            this.obj.html(strHtmlCode);
            var ul = this.obj.find('ul');
            var li = ul.find('li');
            this.obj.css({
                'position':'relative'
            });
            ul.css({
                'width' : this.width*3,
                'height' : this.height,
                'position' : 'absolute',
                'top' : 0,
                'left' : -this.width,
                'margin' : 0,
                'padding' : 0,
                'overflow' : 'hidden'
            });
            li.css({
                'width' : this.width,
                'height' : this.height,
                'float' : 'left',
                'margin' : 0,
                'padding' : 0,
                'list-style-type' : 'none',
                'background-position': 'center',
                'background-repeat': 'no-repeat',
                'background-size': '100%'
            });
        },
        loadImg : function (fn) {
            var arrImages = [];
            $.each(this.option.data, function(k, v){
                arrImages[k] = new Image();
                arrImages[k].src = v.src;
            });
            $(
                arrImages[0],
                arrImages[1],
                arrImages[2],
                arrImages[3],
                arrImages[4],
                arrImages[5],
                arrImages[6],
                arrImages[7],
                arrImages[8],
                arrImages[9]
            ).load(function(){
                    fn();
            });
        }
    };

    $.fn.banner = function(option){
        new Banner(this, option);
    };

    $.fn.banner.defaults = {
        data: new Array()
    };
});