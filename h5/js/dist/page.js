define(function (require) {
    'use strict';
    var $ = require('jquery');

    var defaults = {
        totalSize: 100,
        pageSize: 20,
        curPage: 1,
        pageClick: null,
        pageObj : null
    };

    var Page = function (options) {
        this.options = $.extend({}, defaults, options);
        this.init();
    };

    Page.prototype = {

        constructor : Page,
        
        init : function () {
            this.info();
        },

        html : '<ul class="page"><li class="go">确定</li><li class="input"><span>到第</span><input type="number" value="1"><span>页</span></li> <li class="text">共<strong>123</strong>页</li> <li class="next">下一页 > </li> <li>100</li> <li class="text">...</li> <li>3</li> <li>2</li> <li class="cur">1</li> <li class="prev"> < 上一页</li> </ul>',

        info : function () {
            var totalSize = +this.options.totalSize,
                pageSize = +this.options.pageSize,
                curPage = +this.options.curPage,
                totalPages = Math.ceil(totalSize/pageSize),
                curPage = curPage > totalPages ? totalPages : curPage,
                curPage = curPage < 1 ? 1 : curPage,
                nextPages = curPage < totalPages ? curPage + 1 : totalPages,
                prevPage = curPage <= 1 ? 1 : curPage - 1;

            this.curPage = curPage;
            this.totalPages = totalPages;
            this.nextPages = nextPages;
            this.prevPage = prevPage;
            this.render();
        },

        render : function () {
            this.options.pageObj.empty();
            this.options.pageObj.append('<ul class="page"><li page="'+this.curPage+'" class="go">确定</li><li class="input"><span>到第</span><input type="number" value="'+this.curPage+'"><span>页</span></li><li class="text">共<strong>'+this.totalPages+'</strong>页</li><li class="next">下一页 > </li><li class="prev"> < 上一页</li></ul>');
            this.page = this.options.pageObj.find('.page');
            var page = this.page,
                next = page.find('.next'),
                prev = page.find('.prev'),
                input = page.find('input'),
                btn = page.find('.go');
            input.bind('keyup ,change', function () {
                btn.attr('page', +$(this).val());
            });
            next.attr('page',this.nextPages);
            prev.attr('page',this.prevPage);
            if ( this.totalPages < 6 ) {
                for (var i = 0 ; i < this.totalPages ; i++ ) {
                    if ( i+1 === this.curPage ) {
                        next.after('<li page="'+(i+1)+'" class="cur">'+(i+1)+'</li>');
                    } else {
                        next.after('<li page="'+(i+1)+'">'+(i+1)+'</li>');
                    }
                }
            } else if ( this.curPage+3 >= this.totalPages ) {
                next.after('<li page="1">1</li>');
                next.after('<li class="text">...</li>');
                for (var i = this.totalPages-4 ; i < this.totalPages ; i++ ) {
                    if ( i+1 === this.curPage ) {
                        next.after('<li page="'+(i+1)+'" class="cur">'+(i+1)+'</li>');
                    } else {
                        next.after('<li page="'+(i+1)+'">'+(i+1)+'</li>');
                    }
                }
            } else {
                if ( this.curPage < 6 ) {
                    for (var i = 0 ; i < this.curPage+1 ; i++ ) {
                        if ( i+1 === this.curPage ) {
                            next.after('<li page="'+(i+1)+'" class="cur">'+(i+1)+'</li>');
                        } else {
                            next.after('<li page="'+(i+1)+'">'+(i+1)+'</li>');
                        }
                    }
                } else {
                    next.after('<li page="1">1</li>');
                    next.after('<li class="text">...</li>');
                    for (var i = this.curPage - 3 ; i < this.curPage + 2 ; i++ ) {
                        if ( i+1 === this.curPage ) {
                            next.after('<li page="'+(i+1)+'" class="cur">'+(i+1)+'</li>');
                        } else {
                            next.after('<li page="'+(i+1)+'">'+(i+1)+'</li>');
                        }
                    }
                }
                next.after('<li class="text">...</li>');
                next.after('<li page="'+this.totalPages+'">'+this.totalPages+'</li>');
            }
            this.callBack();
        },
        
        callBack : function () {
            if ( $.isFunction(this.options.pageClick) ) {
                var that = this;
                this.page.find('li[page]').bind('click', function () {
                    that.options.pageClick($(this));
                });
            }
        }
    };

    return function(options){
         new Page(options);
    };

});