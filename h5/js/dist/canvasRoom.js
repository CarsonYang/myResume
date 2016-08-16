define(function(require){
    'use strict';
    var $ = require('jquery');
    var browser_scale = 1;

    var CanvasRoom = function (obj, option) {
        var that = this;
        this.o = obj;
        this.option = $.extend({}, $.fn.canvasRoom.defaults, option);
        browser_scale = this.o.width()/450;
        this.w = this.o.width();
        this.h = this.o.height();

        var htmlCode = '';
        htmlCode += '<canvas>'+this.option.innerText+'</canvas>';
        this.o.html(htmlCode);
        this.canvas = this.o.children('canvas');
        this.canvas.attr('width', this.w);
        this.canvas.attr('height', this.h);
        this.canvas.css({
            'background-repeat': 'no-repeat',
            'background-position': '0,0',
            'background-size': '100%'
        });
        var context = this.canvas[0].getContext('2d');
        this.init(context);

        var cilckTimeStamp = 0;
        var scrollTimeStamp = 0;

        this.o.on('click', function(e){
            cilckTimeStamp = e.timeStamp;
            var mosePosition = that.getMousePosition(that.canvas[0],e);
            var index = 0;
            $.each(that.option.partData, function(k,v){
                var isClicked = that.isHover(mosePosition, v.start, v.end);
                if (isClicked) {
                    index = k;
                    return false;
                }
            });
            that.clear(context);
            that.draw.imgLoad(that, context, index);
            that.option.partData[index].callFn();
        });

        $(window).on('scroll', function(e){
            var timestamp1 = (new Date()).valueOf();
            scrollTimeStamp = (e.timeStamp)?e.timeStamp:timestamp1;
            var tmpTimeStamp = scrollTimeStamp - cilckTimeStamp;

            if (tmpTimeStamp > 100){
            //if (1){
                var scrollTop = $(window).scrollTop()+140;
                var isChanged = false;
                var index = 0;
                //console.log(scrollTop);
                that.option.partData.forEach(function(v,k){
                    var itemTop = $('#'+v.id).offset().top;
                    if (scrollTop >=  itemTop) {
                        index = k;
                        if (that.index != index) {
                            isChanged = true;
                            that.index = k;
                        } else {
                            isChanged = false;
                        }
                    }
                });
                if (isChanged) {
                    that.clear(context);
                    that.draw.imgLoad(that, context, index);
                }
            }
        });


    };

    CanvasRoom.prototype = {
        constructor: CanvasRoom,
        init: function (context) {
            this.draw.imgLoad(this, context, 0);
        },
        getMousePosition: function(canvas,e){
            var rect = canvas.getBoundingClientRect();
            return {
                x: e.clientX - rect.left * (canvas.width / rect.width),
                y: e.clientY - rect.top * (canvas.height / rect.height)
            };
        },
        isHover: function (mousePosition, start, end) {
            //alert(mousePosition.x);
                var isX = (mousePosition.x > start.x*browser_scale) && (mousePosition.x < end.x*browser_scale) ? true : false,
                    isY = (mousePosition.y > start.y*browser_scale) && (mousePosition.y < end.y*browser_scale) ? true : false;
            return isX && isY ? true : false;
        },
        clear: function (context) {
            context.clearRect(0, 0, this.w, this.h);
        },
        draw:{
            imgLoad: function (obj, context, index) {
                this.parts(obj, context, index);
            },
            parts: function (obj, context, index) {
                var o = obj, that = this, isActive = false;
                o.option.partData.forEach(function(v, k){
                    if (k === index) {
                        isActive = true;
                    } else {
                        isActive = false;
                    }
                    that.part(v, context, isActive);
                });

            },
            part: function (item,context,isActive) {
                var x = (item.start.x) * browser_scale,
                    y = (item.start.y) * browser_scale,
                    w = (item.end.x*browser_scale-x),
                    h = (item.end.y*browser_scale-y);

                if (isActive) {
                    context.beginPath();
                    context.strokeStyle = 'rgba(255,0,0,1)';
                    context.lineWidth = 3;
                    context.rect(x,y,w,h);
                    context.stroke();
                    context.closePath();
                } else {
                    context.beginPath();
                    context.fillStyle = 'rgba(0,0,0,0.6)';
                    context.rect(x,y,w,h);
                    context.fill();
                    context.closePath();

                    context.beginPath();
                    context.font = " 16px 微软雅黑";
                    context.fillStyle = '#FFFFFF';
                    context.textAlign = 'center';
                    context.textBaseline = 'middle';
                    var fx = w/2 + x,
                        fy = y+h/2;
                    context.fillText(item.title, fx, fy);
                    context.closePath();
                }

            }
        }
    };

    $.fn.canvasRoom = function (option) {
        new CanvasRoom(this, option);
    };

    $.fn.canvasRoom.Constructor = CanvasRoom;

    $.fn.canvasRoom.defaults = {
        innerText:'您的浏览器不支持canvas',
        partData: new Array
    };
});