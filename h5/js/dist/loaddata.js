define(function () {
    'use strict';
    var $ = require('jquery'),
        template = require('template');
    require('lazydata');

    var Loaddata = function (obj) {
        this.options = this.init(obj);
        this.ajax();
    };

    Loaddata.prototype = {

        constructor: Loaddata,

        init: function (obj) {
            var options =  $.extend({
                port: null, //接口地址:字符串
                params: null, //接口参数：jQuery form对象 或 对象
                beforeFn: null, //调用接口之前函数：函数
                doneFn: null, //接口调用成功后函数：函数
                templateFrom: null, //调用模板ID：字符串
                templateTo: null, //插入模板对象：jQuery对象
                debug: false, //显示数据
                title: '', //提示信息
                type: 'GET', //请求方式 get/post,
                lazyObj: null /*显示加载元素: jQuery对象*/
            }, obj);
            return {
                port: options.port,
                params: (options.params instanceof $) ? (options.params).serialize() : options.params,
                beforeFn: options.beforeFn,
                doneFn: options.doneFn,
                templateFrom: options.templateFrom,
                templateTo: options.templateTo,
                debug: options.debug,
                title: options.title,
                type: options.type,
                lazyObj: options.lazyObj
            };
        },

        ajax: function () {
            var o = this.options,
                that = this;
            $.ajax({
                url : o.port,
                data : o.params,
                dataType:'json',
                beforeSend : that.before(),
                type: o.type
            }).
                done(function (data, status, info) {
                    that.helper();
                    that.debug(data);
                    that.done(data);
                    that.template(data);
                }).
                fail(function (jqXHR) {
                    that.error(jqXHR);
                }).
                always(function () {
                    that.always();
                });
        },

        template: function (data) {
            if (this.options.templateFrom && this.options.templateTo.size() === 1) {
                if ($.isArray(data) && data.length === 0 && this.options.isNullDataShow) {
                    if ( this.options.nullTemplateId.length === 0 ) {
                    } else {
                        this.options.templateTo.html(template(this.options.nullTemplateId));
                    }
                } else {
                    this.options.templateTo.html(template(this.options.templateFrom, data));
                }
            }
        },

        before: function () {
            if ($.isFunction(this.options.beforeFn)) {
                this.options.beforeFn();
            }
        },

        done: function (data) {
            if ($.isFunction(this.options.doneFn)) {
                this.options.doneFn(data);
            }
        },

        helper: function () {
            template.helper('toFixed2', function(num){
                return (+num).toFixed(2, 10);
            });
            template.helper('toHtml', function(str){
                return JSON.stringify(str);
            });
        },

        error: function (jqXHR) {

        },

        always: function () {

        },

        debug: function (data) {
            var o = this.options;
            if (o.debug) {
                console.log('提示信息：' + o.title);
                console.log('请求接口：' + o.port);
                console.log('接口参数：');
                console.log(o.params);
                console.log('请求方式：' + o.type);
                console.log('接口返回：');
                console.log(data);
                console.log('模板信息：');
                console.log('模板名称：'+this.options.templateFrom);
            }
        }
    };

    return {
        loaddata: function (obj) {
            if ( obj.lazyObj instanceof $ ) {
                obj.lazyObj.lazydata({
                    callback: function(){
                        return new Loaddata(obj);
                    }
                });
            } else {
                return new Loaddata(obj);
            }
        }
    };
});