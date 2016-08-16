define(function(){
    (function(jQuery) {
        jQuery.fn.daBanner1 = function(para) {
            para = jQuery.extend({
                type:"left",
                speed:1000,
                autoTime : 6000
            }, para || {});
            var o = jQuery(this);
            var co = o.children();
            var mask;
            var mask1;
            var tools;
            var icons;
            var left;
            var right;
            var len = co.length;
            var daBanner1Img;

            o.css({
                "position":"relative",
                "overflow":"hidden",
                "z-index":"0"
            });
            co.css({
                "width":"100%",
                "height":"100%"
            });
            co.each(function(i){
                jQuery(this).attr("imgIndex",i);
            });
            for(i=0;i<len;i++){
                o.append("<div class='daBanner1Img' index="+i+"></div>");
            }
            daBanner1Img = o.children(".daBanner1Img");
            daBanner1Img.css({
                "width":"100%",
                "height":"100%",
                "position":"absolute",
                "display":"block",
                "top":"0px",
                "left":"0px",
                "overflow":"hidden",
                "z-index":0
            });
            var fristZindex = jQuery(".daBanner1Img:first").css("z-index");
            daBanner1Img.each(function(i){
                var thisAppendImg = co.eq(i);
                thisAppendImg.clone().prependTo(jQuery(this));
                co.eq(i).remove();
                jQuery(this).css("z-index",fristZindex);
                fristZindex--;
            });
            o.append("<div class='daBanner1Mask'></div>");
            mask = jQuery(".daBanner1Mask");
            mask.css({
                "width":"100%",
                "height":"30px",
                "position":"absolute",
                "display":"none",
                "bottom":"0px",
                "left":"0px",
                "background":"#000000",
                "opacity":"0",
                "z-index":10000
            });
            mask.append("<div class='daBanner1MaskTools'></div>");
            o.append("<div class='daBanner1Mask1'></div>");
            mask1 = jQuery(".daBanner1Mask1");
            mask1.css({
                "width":"100%",
                "height":"30px",
                "position":"absolute",
                "display":"block",
                "bottom":"120px",
                "left":"0px",
                "z-index":10001
            });
            mask1.append("<div class='daBanner1MaskTools'></div>");
            tools = jQuery(".daBanner1MaskTools");
            tools.css({
                "width":"auto",
                "height":"100%",
                "position":"relative",
                "float":"left",
                "display":"inline",
                "top":"0px",
                "left":"0px"
            });
            tools.append("<div class='daBanner1Left'></div>");
            tools.append("<div class='daBanner1icons'></div>");
            tools.append("<div class='daBanner1Right'></div>");
            left = jQuery(".daBanner1Left");
            right = jQuery(".daBanner1Right");
            icons = jQuery(".daBanner1icons");
            left.css({
                "width":"12px",
                "height":"12px",
                "position":"relative",
                "float":"left",
                "display":"inline",
                "cursor":"pointer",
                "margin-top":"10px",
                "margin-right":"10px"
            });
            right.css({
                "width":"12px",
                "height":"12px",
                "position":"relative",
                "float":"left",
                "display":"inline",
                "cursor":"pointer",
                "margin-top":"10px",
                "margin-left":"0px"
            });
            icons.css({
                "width":"auto",
                "height":"100%",
                "position":"relative",
                "float":"left",
                "display":"inline",
                "cursor":"pointer"
            });
            for(i=0;i<len;i++){
                icons.append("<div class='daBanner1Icon' index="+i+"></div>");
            }
            jQuery(".daBanner1Icons").css({
                "margin-top":"10px"
            });
            jQuery(".daBanner1Icon").css({
                "width":"12px",
                "height":"12px",
                "cursor":"pointer",
                "float":"left",
                "display":"inline",
                "margin-top":"10px",
                "margin-right":"20px",
                "background":"url(../../images/js/1.png) no-repeat center"
            });
            var toolsWidth = left.width()+right.width()+icons.width();
            tools.css("margin-left",Math.ceil((mask1.width()-toolsWidth)/2));

            var icon = jQuery(".daBanner1Icon");
            var fristZindex = jQuery(".daBanner1Img:first").css("z-index");
            var thisIndex=0;
            var thisPic;
            icons.children(".daBanner1Icon[index=0]").css({
                "background":"url(../../images/js/2.png) no-repeat center"
            });
            var daBanner1ChingePic = function(){
                icon.css("background","url(../../images/js/1.png) no-repeat center");
                jQuery(this).css("background","url(../../images/js/2.png) no-repeat center");
                thisIndex = parseInt(jQuery(this).attr("index"));
                thisPic = daBanner1Img.eq(thisIndex);
                thisPic.css("opacity",0);
                fristZindex++;
                thisPic.css("z-index",fristZindex);
                thisPic.animate({
                    "opacity":1
                },para.speed);
            }
            var daBanner1ChingeLeft = function(){
                if(thisIndex+1>=len){
                    thisIndex=0;
                }
                else{
                    thisIndex++;
                }
                icon.css("background","url(../../images/js/1.png) no-repeat center");
                icons.children(".daBanner1Icon[index='"+thisIndex+"']").css("background","url(../../images/js/2.png) no-repeat center");
                thisPic = daBanner1Img.eq(thisIndex);
                thisPic.css("opacity",0);
                fristZindex++;
                thisPic.css("z-index",fristZindex);
                thisPic.animate({
                    "opacity":1
                },para.speed);
            }
            var daBanner1ChingeRight = function(){
                if(thisIndex<=0){
                    thisIndex=len-1;
                }
                else{
                    thisIndex--;
                }
                icon.css("background","url(../../images/js/1.png) no-repeat center");
                icons.children(".daBanner1Icon[index='"+thisIndex+"']").css("background","url(../../images/js/2.png) no-repeat center");
                thisPic = daBanner1Img.eq(thisIndex);
                thisPic.css("opacity",0);
                fristZindex++;
                thisPic.css("z-index",fristZindex);
                thisPic.animate({
                    "opacity":1
                },para.speed);
            }
            icon.bind("click",daBanner1ChingePic);
            left.bind("click",daBanner1ChingeLeft);
            right.bind("click",daBanner1ChingeRight);

            var mar = setInterval(daBanner1ChingeLeft,para.autoTime);

        };
    })(jQuery);
});
