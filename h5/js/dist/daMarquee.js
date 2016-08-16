define(function (require) {
	var $ = require('jquery');
    var hammer = require('hammer');
	jQuery.fn.daMarquee = function(para) {
		para = jQuery.extend({
			type:"left",
			speed:30,
			scroll:2,
			step:1,
			btnNext:false,
			btnPrev:false,
			remove:false,
			loop:true,
			tools:false,
			mistake:0,
			errMes:false
		}, para || {});
		var o = jQuery(this);
		var mar;
		var thisIndex = 0;
		var elements = o.children();
		var len = elements.size();
		var totalWidth = 0;
		var totalHeight = 0;
		var oHtml = o.html();
		var iWidth = o.children().outerWidth()+parseInt(o.children().css("margin-left"))+parseInt(o.children().css("margin-right"));
		var iHeight = o.children().outerHeight()+parseInt(o.children().css("margin-top"))+parseInt(o.children().css("margin-bottom"));
		var oWidth = o.width();
		var oHeight = o.height();
		console.log(iWidth);
		if (!para.remove){
			para.remove = iWidth;
			var Xmove = para.remove*para.step;
		}
		if(para.tools){
			var iconBox = jQuery(para.tools);
		}
		var dist = para.remove*para.step;
		elements.each(function(){
			totalWidth = totalWidth + (jQuery(this).width() + parseInt(jQuery(this).css("margin-left")) + parseInt(jQuery(this).css("margin-right")) + parseInt(jQuery(this).css("padding-left")) + parseInt(jQuery(this).css("padding-right")));
			totalHeight = totalHeight + (jQuery(this).outerHeight() + parseInt(jQuery(this).css("margin-top")) + parseInt(jQuery(this).css("margin-bottom")) + parseInt(jQuery(this).css("padding-top")) + parseInt(jQuery(this).css("padding-bottom")));
		});

		o.empty();
		o.css({
			"overflow": "hidden",
			"position": "relative"
		});


		o.append('<div class="daMarquee1"></div>');
		o.append('<div class="daMarquee2"></div>');
		var div1 = jQuery(this).children(".daMarquee1");
		var div2 = jQuery(this).children(".daMarquee2");
		
		div1.css({
			"width": "100%",
			"height": "100%",
			"position":"relative",
			"top":"0px",
			"left":"0px",
			"float":"left",
			"display":"inline",
			"overflow": "hidden",
			"padding": "0px",
			"margin": "0px"
		});
		
		div2.css({
			"width": "100%",
			"height": "100%",
			"position":"relative",
			"top":"0px",
			"left":"0px",
			"float":"left",
			"display":"inline",
			"overflow": "hidden",
			"padding": "0px",
			"margin": "0px"
		});
		
		div1.html(oHtml);
		div2.html(oHtml);

		if(para.type=="left"){
			div1.css({
				"width": totalWidth+"px"
			});
			div2.css({
				"width": totalWidth+"px",
				"top": -oHeight+"px",
				"left": totalWidth+"px"
			});
			var move = function(){
				go(para.type);
			}
			mar = setInterval(move, para.speed);
			if( div1.width() < oWidth ){
				if(para.errMes){
					alert("宽度不够");
				}
				clearInterval(mar);
				return false;
			}
		}
		
		if(para.type=="right"){
			div1.css({
				"width": totalWidth+"px"
			});
			div2.css({
				"width": totalWidth+"px",
				"top": -oHeight+"px",
				"left": -(totalWidth)+"px"
			});
			var move = function(){
				go(para.type);
			}
			mar = setInterval(move, para.speed);
			if( div1.width() < oWidth ){
				if(para.errMes){
					alert("宽度不够");
				}
				clearInterval(mar);
				return false;
			}
		}
		
		if(para.type=="up"){
			div1.css({
				"height": totalHeight+"px"
			});
			div2.css({
				"height": totalHeight+"px",
				"top": "0px"
			});
			var move = function(){
				go(para.type);
			}
			mar = setInterval(move, para.speed);
			if( div1.height() < oHeight ){
				if(para.errMes){
					alert("高度不够");
				}
				clearInterval(mar);
				return false;
			}

		}
		if(para.type=="down"){
			div1.css({
				"height": totalHeight+"px"
			});
			div2.css({
				"height": totalHeight+"px",
				"top": -(totalHeight*2)+"px"
			});
			var move = function(){
				go(para.type);
			}
			mar = setInterval(move, para.speed);
			if( div1.height() < oHeight ){
				if(para.errMes){
					alert("高度不够");
				}
				clearInterval(mar);
				return false;
			}

		}
		
		if(para.type=="stepleft" || para.type=="stepLeftControl"){
			div1.css({
				"width": totalWidth+"px"
			});
			div2.css({
				"width": totalWidth+"px",
				"top": -oHeight+"px",
				"left": totalWidth+"px"
			});
			jQuery(para.btnNext).css({
				"cursor": "pointer"
			});
			jQuery(para.btnPrev).css({
				"cursor": "pointer"
			});
			var move = function(){
				go(para.type);
			}
			if( div1.width() < oWidth ){
				if(para.errMes){
					//alert("宽度不够");
				}
				return false;
			}
			move();
		}
		
		if(para.type=="stepup"){
			div1.css({
				"height": totalHeight+"px"
			});
			div2.css({
				"height": totalHeight+"px",
				"top": "0px"
			});
			jQuery(para.btnNext).css({
				"cursor": "pointer"
			});
			jQuery(para.btnPrev).css({
				"cursor": "pointer"
			});
			var move = function(){
				go(para.type);
			};
			if( div1.height() < oHeight ){
				if(para.errMes){
					//alert("高度不够");
				}
				return false;
			}

			move();
		}
		var div1Left = parseInt(div1.css("left"));
		var div2Left = parseInt(div2.css("left"));
		var div1Top = parseInt(div1.css("top"));
		var div2Top = parseInt(div2.css("top"));
		div1.hover(
			function(){
				clearInterval(mar);
			},
			function(){
				if(para.type=="left" || para.type=="right" || para.type=="up" || para.type=="down"){
					var move = function(){
						go(para.type);
					}
					mar = setInterval(move, para.speed);
				}
				else{
					clearInterval(mar);
				}
			}
		);
		div2.hover(
			function(){
				clearInterval(mar);
			},
			function(){
				if(para.type=="left" || para.type=="right" || para.type=="up" || para.type=="down"){
					var move = function(){
						go(para.type);
					}
					mar = setInterval(move, para.speed);
				}
				else{
					clearInterval(mar);
				}
			}
		);
		var moveLeft = function(){
			if (dist > 0) {
				var distX = Math.ceil(dist/10);
				div1.css("left",div1Left - distX);
				div1Left = parseInt(div1.css("left"));
				dist = dist - distX;
			}
			else{
				clearInterval(mar);
				dist = para.remove*para.step;
			}
		}
		var moveRight = function(){
			if (dist > 0) {
				var distX = Math.ceil(dist/10);
				div1.css("left",div1Left + distX);
				div1Left = parseInt(div1.css("left"));
				dist = dist - distX;
			}
			else{
				clearInterval(mar);
				dist = para.remove*para.step;
			}
		}
		function go(to){
			if(to=="left"){
				div1.css("left",(div1Left=div1Left-para.scroll)+"px");
				div2.css("left",(div2Left=div2Left-para.scroll)+"px");
				if(div1Left<=-(totalWidth)){
					div1Left = totalWidth-para.mistake;
				}
				if(div2Left<=-(totalWidth)){
					div2Left = totalWidth-para.mistake;
				}
			}
			else if(to=="right"){
				div1.css("left",(div1Left=div1Left+para.scroll)+"px");
				div2.css("left",(div2Left=div2Left+para.scroll)+"px");
				if(div1Left>=(totalWidth)){
					div1Left = -(totalWidth)-para.mistake;
				}
				if(div2Left>=(totalWidth)){
					div2Left = -(totalWidth)-para.mistake;
				}
			}
			else if(to=="up"){
				div1.css("top",(div1Top=div1Top-para.scroll)+"px");
				div2.css("top",(div2Top=div2Top-para.scroll)+"px");
				if(div1Top<=-(totalHeight)){
					div1Top =(totalHeight)-para.mistake;
				}
				if(div2Top<=-(totalHeight*2)){
					div2Top =(0)-para.mistake;
				}
			}
			else if(to=="down"){
				div1.css("top",(div1Top=div1Top+para.scroll)+"px");
				div2.css("top",(div2Top=div2Top+para.scroll)+"px");
				if(div1Top>=oHeight){
					div1Top =-(totalHeight*2-oHeight)-para.mistake;
				}
				if(div2Top>=(-totalHeight)+oHeight){
					div2Top =-(totalHeight*3-oHeight)-para.mistake;
				}
			}
			else if(to=="stepleft"){

				if(!para.remove){
					para.remove = iWidth;
				}
			
				var nextClick = function(){
					if(div1.is(":animated") || div2.is(":animated")){
						return false;
					}
					if(div1Left<=-(totalWidth)){
						div1Left = totalWidth+div2Left-para.mistake;
						div1.css("left",div1Left+"px");
					}
					if(div2Left<=-(totalWidth)){
						div2Left = totalWidth+div1Left-para.mistake;
						div2.css("left",div2Left+"px");
					}
					div1.animate({
						left:div1Left-(para.remove*para.step)
					},para.speed,function(){
						div1Left = parseInt(div1.css("left"));
					});
					div2.animate({
						left:div2Left-(para.remove*para.step)
					},para.speed,function(){
						div2Left = parseInt(div2.css("left"));
					});
				}
				
				var prevClick = function(){
					if(div1.is(":animated") || div2.is(":animated")){
						div1.stop();
						div2.stop();
					}
					if(div1Left>=0){
						div2Left = -(totalWidth-div1Left)-para.mistake;
						div2.css("left",div2Left+"px");
					}
					if(div1Left >= oWidth){
						div1Left = -(totalWidth-div2Left)-para.mistake;
						div1.css("left",div1Left+"px");
					}
					div1.animate({
						left:div1Left+(para.remove*para.step)
					},para.speed,function(){
						div1Left = parseInt(div1.css("left"));
					});
					div2.animate({
						left:div2Left+(para.remove*para.step)
					},para.speed,function(){
						div2Left = parseInt(div2.css("left"));
					});
				};
				
				jQuery(para.btnNext).bind("click",nextClick);
				jQuery(para.btnPrev).bind("click",prevClick);
                hammer(o[0]).on("swipeleft", function (e) {
                    e.preventDefault();
                    nextClick();
                });
                hammer(o[0]).on("swiperight", function (e) {
                    e.preventDefault();
                    prevClick();
                });
                hammer(o[0]).on("tap", function (e) {
                    e.preventDefault();
                });
			}
			
			else if(to=="stepup"){
                var remove = iHeight;
				if(!para.remove){
                    remove = iHeight;
				}
                //console.log(totalHeight);
				var nextClick = function(){
					if(div1.is(":animated") || div2.is(":animated")){
						return false;
					}
					if(div2Top<=-(totalHeight)){
						div1Top = (totalHeight*2+div2Top)-para.mistake;
						div1.css("top",div1Top+"px");
					}
					if(div2Top<=-(totalHeight*2)){
						div2Top = (0)-para.mistake;
						div2.css("top",div2Top+"px");
					}
				
					div1.animate({
						top:div1Top-(remove*para.step)
					},para.speed,function(){
						div1Top = parseInt(div1.css("top"));
					});
					div2.animate({
						top:div2Top-(remove*para.step)
					},para.speed,function(){
						div2Top = parseInt(div2.css("top"));
					});
				}
				var prevClick = function(){
					if(div1.is(":animated") || div2.is(":animated")){
						return false;
					}

					if(div1Top>=0){
						div2Top = -(totalHeight*2-div1Top)-para.mistake;
						div2.css("top",div2Top+"px");
					}
					if(div2Top>=(-totalHeight)){
						div1Top = div2Top-para.mistake;
						div1.css("top",div1Top+"px");
					}
					div1.animate({
						top:div1Top+(remove*para.step)
					},para.speed,function(){
						div1Top = parseInt(div1.css("top"));
					});
					div2.animate({
						top:div2Top+(remove*para.step)
					},para.speed,function(){
						div2Top = parseInt(div2.css("top"));
					});
				}
				jQuery(para.btnNext).bind("click",nextClick);
				jQuery(para.btnPrev).bind("click",prevClick);

                var moveY = 0;
                var startY = 0;
                var endY = 0;

                //console.log(this);

                /*o[0].addEventListener('touchstart', function(e){
                    e.preventDefault();
                    startY = e.touches[0].clientY;
                    console.log(e);
                }, false);
                o[0].addEventListener('touchend', function(e){
                    e.preventDefault();
                    console.log(e);
                    endY = e.changedTouches[0].clientY;
                    moveY = startY - endY;
                    console.log(moveY);
                    if (moveY > 50) {
                        nextClick();
                    } else if (moveY < -50) {
                        prevClick();
                    } else {
                        return false;
                    }
                }, false);*/

			}
			else if(to=="stepLeftControl"){
				if(!para.tools && para.errMes){
					alert("显示'个数元素标签'未指配");
					return false;
				}
				if(!para.remove){
					para.remove = iWidth;
				}
				div2.remove();
				div1.children().each(function(i){
					jQuery(this).attr("index",i);
					iconBox.append("<li class='num' index='"+i+"'></li>");
				});
				var icons = jQuery(".num");
				icons.hover(
					function(){
						if(mar){
							clearInterval(mar);
						}
						div1.animate({
							left:-(jQuery(this).attr("index")*Xmove)
						},300,function(){
							div1Left = parseInt(div1.css("left"));
						});
					},
					function(){
						clearInterval(mar);
					}
				);
				
				jQuery(".banner_menuBg").css("opacity","0.6");
				jQuery(".banner_icons").css("margin-left",(484-jQuery(".banner_menu_ul").width()/2-30));

				var nextClick = function(){
					if(div1.is(":animated") || div2.is(":animated")){
						return false;
					}
					if(div1Left <= -(totalWidth-iWidth)){
						return false;
					}

					div1.animate({
						left:div1Left-(para.remove*para.step)
					},para.speed,function(){
						div1Left = parseInt(div1.css("left"));
					});

				}
				var prevClick = function(){
					if(div1.is(":animated") || div2.is(":animated")){
						return false;
					}
					if(div1Left >= 0){
						return false;
					}
					div1.animate({
						left:div1Left+(para.remove*para.step)
					},para.speed,function(){
						div1Left = parseInt(div1.css("left"));
					});

				}
				jQuery(para.btnNext).bind("click",nextClick);
				jQuery(para.btnPrev).bind("click",prevClick);
			}
			else{
				if(para.errMes){
					alert("动画未定义");
				}
				return false;
			}

		}
	};
});