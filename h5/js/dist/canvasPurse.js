define(function(require){
    'use strict';
    var $ = require('jquery');

    var fps = 60;
    var duration = 5000;
    var num = 3;
    var pi = Math.PI;
    var perNum = Math.ceil(num/(duration/1000*fps));
    /*console.log(perNum);
    console.log(perInterval);*/

    var rand = function (min , max) {
        return parseInt(Math.random()*(max-min+1)+min,10);
    };

    var clear = function (cxt, x0, y0, x1, y1) {
        cxt.clearRect(x0, y0, x1, y1);
    };

    var Items = function (canvas,option) {
        this.canvas = canvas[0];
        this.ctx = this.canvas.getContext('2d');
        this.ctx.font = " 16px 微软雅黑";
    };

    Items.prototype = {
        constructor: Items,
        move: function () {
            var img = new Image();
            img.src = '';
            this.init(5);
        },
        init: function (n) {
            var that = this;
            var arr = [];
            for(var i = 0 ; i<n ; i++){
                arr[i] = {
                    startAngle: rand(0,360),
                    randAngle: rand(1,5),
                    randX: rand(50,750),
                    distY: rand(3,10),
                    scale: rand(80,100),
                    startY: rand(-1000,0)
                };
            }
            var count = 0;
            var startTime = (new Date()).valueOf();
            var sumTime = 0;
            var diff = 0;
            var perTime = duration/num;

            var mar = setInterval(function(){
                var runTime = (new Date()).valueOf();
                diff = runTime - startTime - sumTime;
                sumTime = runTime - startTime;
                //console.log(sumTime);
                clear(that.ctx,0,0,800,500);
                if (arr.length === 0) {
                    arr = null;
                    that.ctx = null;
                    clearInterval(mar);
                    return false;
                }
                $.each(arr,function(k,v){
                    if ( that.item(v) ) {
                        arr = $.map(arr, function(item, i){
                            if (i === k) {
                                item = null;
                            }
                            else {
                                return item;
                            }
                        });
                        arr.unshift({
                            startAngle: rand(0, 360),
                            randAngle: rand(-3, 3),
                            randX: rand(50, 750),
                            distY: rand(3, 10),
                            scale: rand(50, 100),
                            startY: 0
                        });
                    }
                });
            },1000/fps);
        },
        item: function (obj) {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.translate(obj.randX, obj.startY);
            this.ctx.rotate(obj.startAngle*pi/180);
            this.ctx.fillStyle = 'rgba(255,0,0,1)';
            this.ctx.scale(obj.scale/100, obj.scale/100);
            this.ctx.rect(-25,-40,50,80);
            this.ctx.fill();

            this.ctx.fillStyle = '#000000';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText('￥100', 0, 0);

            this.ctx.closePath();
            this.ctx.restore();
            if (obj.startY > 500) {
                obj = null;
                return true;
            } else {
                obj.startAngle += obj.randAngle;
                obj.startY += obj.distY;
                return false;
            }
        }
    };

    $.fn.canvasPurse = function(option){
        var a = new Items(this, option);
        a.move();
    };

    $.fn.canvasPurse.defaults = {
    };

    return $;

});