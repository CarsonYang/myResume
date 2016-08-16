define(function (require) {
    'use strict';
    var $ = require('jquery');
    var hammer = require('hammer');
    var CanvasBanner = function (element, options) {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.canvasBanner.defaults, options);
        this.init();
    };

    CanvasBanner.prototype = {
        constructor: CanvasBanner,
        init: function () {
            var htmlCode = '', width = 0, height = 0;
            htmlCode += '<canvas>'+this.options.innerText+'</canvas>',
            this.$element.html(htmlCode);
            this.canvas = this.$element.children('canvas');
            this.w = this.options.width ? this.options.width : this.$element.width();
            this.h = this.options.height ? this.options.height : this.$element.height();
            this.canvas.attr('width', this.w);
            this.canvas.attr('height', this.h);
            var context = this.canvas[0].getContext('2d'),
                that = this,
                len = this.options.imgs.length,
                max = len - 1,
                index = 0,
                next = index < max ? index+1 : 0,
                prev = index > 0 ? index-1 : max,
                thisImg = new Image(),
                nextImg = new Image(),
                prevImg = new Image();
            thisImg.src = this.options.imgs[index].src;
            nextImg.src = this.options.imgs[next].src;
            prevImg.src = this.options.imgs[prev].src;
            $(thisImg,nextImg,prevImg).load(function(){
                var sumDistX = 0;
                context.clearRect(0, 0, that.w, that.h);
                context.drawImage(thisImg, 0, 0);
                context.drawImage(nextImg, 200, 0);
                context.drawImage(prevImg, -200, 0);
                var drawFn = function (distX) {
                    context.save();
                    context.clearRect(0, 0, that.w, that.h);
                    context.translate(distX, 0);
                    context.drawImage(nextImg, 200, 0);
                    context.drawImage(prevImg, -200, 0);
                    context.drawImage(thisImg, 0, 0);
                    context.restore();
                    return distX;
                };
                var move = function (deltaX) {
                    var i = deltaX;
                    var mar = setInterval(function(){
                        var a = drawFn(i);
                        console.log(a);
                        i = deltaX>0 ? i+3: i-3;

                    },100);
                };
                hammer(that.canvas[0]).on('panmove', function(e){
                    drawFn(sumDistX+e.deltaX);
                });
                hammer(that.canvas[0]).on('panend', function(e){
                    sumDistX += e.deltaX;
                    move(e.deltaX);
                });
            });
        }
    };

    $.fn.canvasBanner = function (option) {
        var options = option || {};
        var data = new CanvasBanner(this, options);
    };

    $.fn.canvasBanner.Constructor = CanvasBanner;

    $.fn.canvasBanner.defaults = {
        width: 0,
        height: 0,
        innerText: '您的浏览器不支持canvas',
        imgs: new Array
    };
});
