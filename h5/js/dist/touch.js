define(function(require){
    'use strict';
    var $ = require('jquery');

    var Touch = function(obj, event, fn){
        var supportTouch = 'ontouchstart' in window,
            startEvent = supportTouch ? "touchstart" : "mousedown",
            endEvent = supportTouch ? "touchend" : "mouseup",
            moveEvent = supportTouch ? "touchmove" : "mousemove";
        this.startEvent = startEvent;
        this.endEvent = endEvent;
        this.moveEvent = moveEvent;
        this.o = obj;
        this.isDebug = false;
        if ( event === 'start' ) {
            this.baseEvent(obj, startEvent, 'start', fn);
        } else if ( event === 'end' ) {
            this.baseEvent(obj, endEvent, 'end', fn);
        } else if ( event === 'move' ) {
            this.baseEvent(obj, moveEvent, 'move', fn);
        } else if ( event === 'to' ) {
            this.to(obj, fn);
        } else if ( event === 'moveTo' ) {
            this.moveTo(obj, fn);
        } else if ( event === 'moveInfo' ) {
            this.moveInfo(obj, fn);
        } else {
            return false;
        }
    };

    Touch.prototype = {
        constructor : Touch,
        baseEvent : function(obj, event, type, fn){
            var result = {},
                that = this;
            obj.bind(event ,function(e){
                e.preventDefault();
                result.x = 'pageX' in e ? +e.pageX : +e.originalEvent.changedTouches[0].pageX;
                result.y = 'pageY' in e ? +e.pageY : +e.originalEvent.changedTouches[0].pageY;
                result.timeStamp = +e.timeStamp;
                result.type = type || null;
                if ( $.isFunction(fn) ) {
                    fn(result);
                }
            });
        },
        to : function(obj, fn) {
            var result = {},
                startX = 0,
                startY = 0,
                endX = 0,
                endY = 0,
                distX = 0,
                distY = 0,
                moveScale = 0,
                deviation = 10,
                to = '',
                that = this;
            this.baseEvent(obj, this.startEvent, null, function(data){
                startX = data.x;
                startY = data.y;
            });
            this.baseEvent(obj, this.endEvent, null, function(data){
                endX = data.x;
                endY = data.y;
                distX = endX - startX;
                distY = endY - startY;
                distY = distY === 0 ? 0.0001 : distY;
                moveScale = Math.abs(distX / distY);
                if (moveScale >= 1 && distX >= deviation) {
                    to = 'right';
                } else if ( moveScale >= 1 && distX <= -deviation ) {
                    to = 'left';
                } else if ( moveScale < 1 && distY >= deviation ) {
                    to = 'down';
                } else if ( moveScale < 1 && distY <= -deviation ) {
                    to = 'up';
                } else {
                    to = 'error';
                }
                result.distX = distX;
                result.distY = distY;
                result.moveScale = moveScale;
                result.to = to;
                if ( $.isFunction(fn) ) {
                    fn(result);
                }
                if (that.isDebug) {
                    that.debug(result);
                }
            });
        },
        moveTo: function (obj, fn) {
            var result = {},
                startX = 0,
                startY = 0,
                endX = 0,
                endY = 0,
                distX = 0,
                distY = 0,
                perX = 0,
                perY = 0,
                tmpX = 0,
                tmpY = 0,
                that = this;
            this.baseEvent(obj, this.startEvent, null, function(data){
                startX = data.x;
                startY = data.y;
                tmpX = startX;
                tmpY = startY;
                that.baseEvent(obj, that.moveEvent, null, function(dataMove){
                    perX = dataMove.x - tmpX;
                    tmpX = dataMove.x;
                    perY = dataMove.y - tmpY;
                    tmpY = dataMove.y;
                    endX = dataMove.x;
                    endY = dataMove.y;
                    distX = endX - startX;
                    distY = endY - startY;
                    result.perX = perX;
                    result.perY = perY;
                    result.distX = distX;
                    result.distY = distY;
                    if ( $.isFunction(fn) ) {
                        fn(result);
                    }
                    if (that.isDebug) {
                        that.debug(result);
                    }
                });
            });
            that.baseEvent(obj, that.endEvent, null, function(){
                obj.unbind(that.moveEvent);
            });
        },
        moveInfo : function (obj, fn) {
            var result = {},
                isTouch = false,
                tmpX = 0,
                tmpY = 0,
                that = this;
            this.baseEvent(obj, this.startEvent, 'moveInfo', function(startData){
                tmpX = startData.x;
                tmpY = startData.y;
                isTouch = true;
            });
            this.baseEvent(obj, this.endEvent, 'moveInfo', function(){
                isTouch = false;
            });
            this.baseEvent(obj, this.moveEvent, 'moveInfo', function(moveData){
                if ( isTouch ) {
                    result.distX = moveData.x - tmpX;
                    result.distY = moveData.y - tmpY;
                    tmpX = moveData.x;
                    tmpY = moveData.y;
                    if ( $.isFunction(fn) ) {
                        fn(result);
                    }
                    //that.debug(result);
                }
            });
        },
        debug : function (obg) {
            this.o.empty();
            var html = '';
            html += '<div style=" ';
            html += 'position:absolute;';
            html += 'top:0;left:0;';
            html += 'font-size:12px;';
            html += 'z-index:1000;';
            html += 'width:100%;';
            html += 'background:#FF0000;';
            html += ' ">';
            $.each(obg,function(k,v){
                html += k+'='+v+' ';
            });
            html += '</div>';
            this.o.append(html);
        }
    };

    $.fn.touch = function (event, callFn) {
        return new Touch(this, event, callFn);
    };

});