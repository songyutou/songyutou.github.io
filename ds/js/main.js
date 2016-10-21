var xyz={};
//整屏动画切换实例
xyz.sa = null;
xyz.init=function(){
	xyz.resize();
	xyz.events();
	xyz.initAnimate();
	xyz.scrollTurn();
	xyz.button3D('.start','.state1','.state2',0.3);
	xyz.button3D(".button",".state1",".state2",0.3);
	xyz.button3D(".button2",".state1",".state2",0.3);
	twoAnimate.init();
	threeAnimate.init();
	fiveAnimate.init();
}
$(document).ready(xyz.init)
//设置每一屏的高度
xyz.resize=function(){
	$('.scene').height($(window).height());
	$('.scene:not(":first")').css('top',$(window).height());
	xyz.scrollTurn();
	if($(window).width()<=950){
		$('body').addClass('r950');
		$('.menu').css('top',0)
	}else{
		$('body').removeClass('r950');
		$('.menu').css('top',22)
	}
	
}
//配置事件
xyz.events=function(){
	$(window).resize(xyz.resize);
	xyz.nav();
	$(window).bind('scroll',scrollFn)
	function scrollFn(){
		$(window).scrollTop(0)
	}
	$(window).bind('mousedown',function(){
		$(window).unbind('scroll',scrollFn)
	});
	//当mouseup，让当前达到一个状态
	$(window).bind('mouseup',xyz.mouseupFn)
	//在滚动条滚动过程中计算页面该到那个时间点
	$(window).bind('scroll',xyz.scrollStatus)
	//阻止滚动默认行为
	$('.wrapper').bind('mousewheel',function(ev){
		ev.preventDefault();
	});
	$('.wrapper').one('mousewheel',onmousewheelFn);
	var timer=null;
	function onmousewheelFn(ev,direction){
		$(window).unbind('scroll',scrollFn)
		if(direction<1){
			xyz.changstep('next')
		}else{
			xyz.changstep('prev')
		};
		clearTimeout(timer);
		timer=setTimeout(function(){
			$('.wrapper').one('mousewheel',onmousewheelFn);
		},1200)
	}
}
//当mouseup，让当前达到一个状态
xyz.mouseupFn = function(){
	var scale = xyz.scale();
	//得到当前页面的时间点
	var time= scale*xyz.sa.totalDuration();
	//获取到上一个状态
	var prevStep = xyz.sa.getLabelBefore(time);
	var nextStep = xyz.sa.getLabelAfter(time);
	//获取时间
	var prevTime = xyz.sa.getLabelTime(prevStep);
	var nextTime = xyz.sa.getLabelTime(nextStep);
	//计算差值
	var prevDvalue = Math.abs(prevTime-time);
	var nextDvalue = Math.abs(nextTime-time);
	var step='';
	if(scale===0){
		step='step1'
	}else if(scale===1){
		step='footer'
	}else if(prevDvalue<nextDvalue){
		step=prevStep;
	}else{
		step=nextStep;
	};
	console.log(step)
	xyz.sa.tweenTo(step);
	var totaltime = xyz.sa.totalDuration();
	//获取下一个状态时间
	var aftertime = xyz.sa.getLabelTime(step);
	//获取到滚动条滚动的最大距离
	var maxy = $('body').height()-$(window).height();
	//计算滚动条滚动距离
	var posiy = aftertime/totaltime*maxy;
	//滚动条滚动距离的持续时间
	var d = Math.abs(xyz.sa.time()-aftertime);
	var scrollanimate = new TimelineMax();
	scrollanimate.to('html,body',d,{scrollTop:posiy})
	xyz.step = step;
}
//计算滚动条在滚动过程中的一个比例
xyz.scale = function(){
	var scrollT = $(window).scrollTop();
	var maxH = $('body').height() - $(window).height();
	var s = scrollT/maxH;
	return s;
}
xyz.scrollStatus = function(){
	var times = xyz.scale()*xyz.sa.totalDuration();
	xyz.sa.seek(times,false);
}
//切换整屏计算滚动距离
xyz.step = 'step1';
//当前状态
xyz.changstep = function(value){
	if(value=='next'){
		//获取到当前时间
		var currentime = xyz.sa.getLabelTime(xyz.step);
		//获取到下一个状态字符串
		var afterstep = xyz.sa.getLabelAfter(currentime);
		if(!afterstep)return;
		//获取动画总时长
		var totaltime = xyz.sa.totalDuration();
		//获取下一个状态时间
		var aftertime = xyz.sa.getLabelTime(afterstep);
		//获取到滚动条滚动的最大距离
		var maxy = $('body').height()-$(window).height();
		//计算滚动条滚动距离
		var posiy = aftertime/totaltime*maxy;
		//滚动条滚动距离的持续时间
		var d = Math.abs(xyz.sa.time()-aftertime);
		var scrollanimate = new TimelineMax();
		console.log(posiy)
		scrollanimate.to('html,body',d,{scrollTop:posiy})
		//运动到下一个状态
//		xyz.sa.tweenTo(afterstep);
		xyz.step = afterstep;
	}else{
		//获取到当前时间
		var currentime = xyz.sa.getLabelTime(xyz.step);
		//获取到上一个状态字符串
		var beforestep = xyz.sa.getLabelBefore(currentime);
		if(!beforestep)return;
		//获取动画总时长
		var totaltime = xyz.sa.totalDuration();
		//获取下一个状态时间
		var beforetime = xyz.sa.getLabelTime(beforestep);
		//获取到滚动条滚动的最大距离
		var maxy = $('body').height()-$(window).height();
		//计算滚动条滚动距离
		var posiy = beforetime/totaltime*maxy;
		//滚动条滚动距离的持续时间
		var d = Math.abs(xyz.sa.time()-beforetime);
		var scrollanimate = new TimelineMax();
		scrollanimate.to('html,body',d,{scrollTop:posiy})
		//运动到上一个状态
//		xyz.sa.tweenTo(beforestep);
		xyz.step = beforestep;
	}
}
//配置导航条动画
xyz.initAnimate=function(){
	var inita=new TimelineMax();
	inita.to('.menu',0.5,{opacity:1});
	inita.to('.menu',0.5,{left:22},'-=0.3');
	inita.to('.nav',0.5,{opacity:1});
	//设置首屏动画
	inita.to('.scene1_logo',0.5,{opacity:1});
	inita.staggerTo('.center_1 img',2,{opacity:1,rotationX:0,ease:Elastic.easeOut},0.2);
	inita.to('.light_left',0.7,{rotationZ:0,ease:Cubic.easeOut},'-=2');
	inita.to('.light_right',0.7,{rotationZ:0,ease:Cubic.easeOut},'-=2');
	inita.to('.controls',0.5,{bottom:20,opacity:1},'-=0.7')
}
//导航条动画
xyz.nav=function(){
	var nava=new TimelineMax();
	$('.nav a').bind('mouseenter',function(){
		var w = $(this).width();
		var l = $(this).offset().left;
		nava.clear();
		nava.to('.line',0.4,{opacity:1,left:l,width:w})
	});
	$('.nav a').bind('mouseleave',function(){	
		nava.clear();
		nava.to('.line',0.4,{opacity:0})
	});
	//鼠标移入language
	var la =new TimelineMax();
	$('.language').bind('mouseenter',function(){
		la.clear();
		la.to('.dropdown',0.5,{opacity:1,'display':'block'})
	});
	$('.language').bind('mouseleave',function(){
		la.clear();
		la.to('.dropdown',0.5,{opacity:0,'display':'none'})
	});
	//左侧导航条
	$('.btn_mobile').click(function(){
		var ma = new TimelineMax();
		ma.to('.left_nav',0.5,{left:0})
	});
	$('.l_close').click(function(){
		var la = new TimelineMax();
		la.to('.left_nav',0.5,{left:-300})
	});
};
//翻转3d效果
xyz.button3D=function(obj,e1,e2,d){
	var ba = new TimelineMax();
	ba.to($(obj).find(e1),0,{rotationX:0,transformPerspective:600,transformOrigin:'center bottom'});
	ba.to($(obj).find(e2),0,{rotationX:-90,transformPerspective:600,transformOrigin:'center top'});
	$(obj).bind('mouseenter',function(){
		var entera=new TimelineMax();
		var ele1 = $(this).find(e1);
		var ele2 = $(this).find(e2);
		entera.to(ele1,d,{rotationX:90,top:-ele1.height(),ease:Cubic.easeInOut},0)
		entera.to(ele2,d,{rotationX:0,top:0,ease:Cubic.easeInOut},0)
	});
	$(obj).bind('mouseleave',function(){
		var leavea=new TimelineMax();
		var ele1 = $(this).find(e1);
		var ele2 = $(this).find(e2);
		leavea.to(ele1,d,{rotationX:0,top:0,ease:Cubic.easeInOut},0)
		leavea.to(ele2,d,{rotationX:-90,top:ele1.height(),ease:Cubic.easeInOut},0)
	})
};
//整屏动画
xyz.scrollTurn=function(){
	var time = xyz.sa?xyz.sa.time() : 0;
	if(xyz.sa)xyz.sa.clear();
	xyz.sa = new TimelineMax();
	//当从第二屏切换到第一屏的时候让第二屏重归0
	xyz.sa.to('.scene1',0,{onReverseComplete:function(){
		twoAnimate.timeline.seek(0,false);
	}},0);
	xyz.sa.to('.footer',0,{top:'100%'});
	xyz.sa.add('step1');
	xyz.sa.to('.scene2',0.8,{top:0,ease:Cubic.easeInOut});
	xyz.sa.to({},0.1,{onComplete:function(){
		menu.changeMenu('menu_state2')
	},onReverseComplete:function(){
		menu.changeMenu('menu_state1')
	}},'-=0.2');
	//主动画第二屏
	xyz.sa.to({},0,{onComplete:function(){
		twoAnimate.timeline.tweenTo('state1')
	}},'-=0.2')
	xyz.sa.add('step2');
	//第二屏其他动画
	xyz.sa.to({},0,{onComplete:function(){
		twoAnimate.timeline.tweenTo('state2');
	},onReverseComplete:function(){
		twoAnimate.timeline.tweenTo('state1');
	}});
	xyz.sa.to({},0.4,{});
	xyz.sa.add('point1');
	xyz.sa.to({},0,{onComplete:function(){
		twoAnimate.timeline.tweenTo('state3');
	},onReverseComplete:function(){
		twoAnimate.timeline.tweenTo('state2');
	}});
	xyz.sa.to({},0.4,{});
	xyz.sa.add('point2');
	xyz.sa.to({},0,{onComplete:function(){
		twoAnimate.timeline.tweenTo('state4');
	},onReverseComplete:function(){
		twoAnimate.timeline.tweenTo('state3');
	}});
	xyz.sa.to({},0.4,{});
	xyz.sa.add('point3');
	//第三屏
	xyz.sa.to('.scene3',0.8,{top:0,ease:Cubic.easeInOut,onReverseComplete:function(){
		threeAnimate.timeline.seek(0,false);
	}});
	xyz.sa.to({},0.1,{onComplete:function(){
		menu.changeMenu('menu_state3')
	},onReverseComplete:function(){
		menu.changeMenu('menu_state2')
	}},'-=0.2');
	xyz.sa.to({},0.1,{onComplete:function(){
		threeAnimate.timeline.tweenTo('threeSate1');
	}},'-=0.2');
	xyz.sa.add('step3');
	//配置第三屏
	xyz.sa.to({},0,{onComplete:function(){
		threeAnimate.timeline.tweenTo('threeSate2');
	},onReverseComplete:function(){
		threeAnimate.timeline.tweenTo('threeSate1');
	}});
	xyz.sa.to({},0.4,{});
	xyz.sa.add('threeSate');
	xyz.sa.to('.scene4',0.8,{top:0,ease:Cubic.easeInOut});
	xyz.sa.add('step4');
	xyz.sa.to('.scene4',0.8,{top:-$(window).height(),ease:Cubic.easeInOut});
	if($(window).width()>950){
		xyz.sa.to('.menu-wrapper',0.8,{top:-110,ease:Cubic.easeInOut},'-=0.8');
	}else{
		$('.menu-wrapper').css('top',0);
	}
	xyz.sa.to('.scene5',0.8,{top:0,ease:Cubic.easeInOut,onReverseComplete:function(){
		fiveAnimate.timeline.seek(0,false);
	}},'-=0.8');
	xyz.sa.to({},0,{onComplete:function(){
		fiveAnimate.timeline.tweenTo('fiveState')
	}},'-=0.2')
	xyz.sa.add('step5');
	xyz.sa.to('.scene5',0.5,{top:-$('.footer').height(),ease:Cubic.easeInOut});
	xyz.sa.to('.footer',0.5,{top:$(window).height()-$('.footer').height(),ease:Cubic.easeInOut},'-=0.5');
	xyz.sa.add('footer');
	xyz.sa.stop();
	xyz.sa.seek(time);
}
var menu={};
menu.changeMenu = function(statesclass){
	var oldmenu = $('.menu');
	var newmenu = oldmenu.clone();
	newmenu.removeClass('menu_state2').removeClass('menu_state1').removeClass('menu_state3');
	newmenu.addClass(statesclass);
	$('.menu-wrapper').append(newmenu);
	xyz.nav();
	xyz.button3D('.start','.state1','.state2',0.3)
	var menuAnimate = new TimelineMax();
	oldmenu.addClass('rm')
	//设置初始值
	if($(window).width()>950){
		menuAnimate.to(newmenu,0,{top:100,transformPerspective:600,rotationX:-90,transformOrigin:'top center'});
	menuAnimate.to(oldmenu,0,{top:22,transformPerspective:600,rotationX:0,transformOrigin:'bottom center'});
	menuAnimate.to(oldmenu,0.3,{rotationX:90,top:-55,ease:Cubic.easeInOut,onComplete:function(){
		$('.rm').remove();
	}});
	menuAnimate.to(newmenu,0.3,{rotationX:0,top:22,ease:Cubic.easeInOut},'-=0.3');
	}
};
//配置第二屏动画
var twoAnimate = {};
twoAnimate.timeline = new TimelineMax();
twoAnimate.init = function(){
	twoAnimate.timeline.staggerTo('.scene2_1 img',1.5,{opacity:1,rotationX:0,ease:Elastic.easeOut},0.1);
	twoAnimate.timeline.to('.points',0.2,{bottom:22},'-=1')
	twoAnimate.timeline.to('.points .point0 .text',0.1,{opacity:1});
	twoAnimate.timeline.to('.points .point0 .point_icon',0.1,{'background-position':"right top"});
	twoAnimate.timeline.add('state1');
	twoAnimate.timeline.staggerTo('.scene2_1 img',0.2,{opacity:0,rotationX:90},0);
	twoAnimate.timeline.to('.scene2_2 .left',0.4,{opacity:1});
	twoAnimate.timeline.staggerTo('.scene2_2 .right img',0.3,{opacity:1,rotationX:0,ease:Cubic.easeInOut},0,'-=0.4');
	twoAnimate.timeline.to('.points .text',0,{opacity:0},'-=0.4');
	twoAnimate.timeline.to('.points .point_icon',0.1,{'background-position':"left top"},'-=0.4');
	twoAnimate.timeline.to('.points .point1 .text',0.1,{opacity:1});
	twoAnimate.timeline.to('.points .point1 .point_icon',0.1,{'background-position':"right top"});
	twoAnimate.timeline.add('state2');
	twoAnimate.timeline.to('.scene2_2 .left',0.4,{opacity:0});
	twoAnimate.timeline.staggerTo('.scene2_2 .right img',0.3,{opacity:0,rotationX:90,ease:Cubic.easeInOut},0,'-=0.4');
	twoAnimate.timeline.to('.scene2_3 .left',0.4,{opacity:1});
	twoAnimate.timeline.staggerTo('.scene2_3 .right img',0.3,{opacity:1,rotationX:0,ease:Cubic.easeInOut},0,'-=0.4');
	twoAnimate.timeline.to('.points .text',0,{opacity:0},'-=0.4');
	twoAnimate.timeline.to('.points .point_icon',0.1,{'background-position':"left top"},'-=0.4');
	twoAnimate.timeline.to('.points .point2 .text',0.1,{opacity:1});
	twoAnimate.timeline.to('.points .point2 .point_icon',0.1,{'background-position':"right top"});
	twoAnimate.timeline.add('state3');
	twoAnimate.timeline.to('.scene2_3 .left',0.4,{opacity:0});
	twoAnimate.timeline.staggerTo('.scene2_3 .right img',0.3,{opacity:0,rotationX:90,ease:Cubic.easeInOut},0,'-=0.4');
	twoAnimate.timeline.to('.scene2_4 .left',0.4,{opacity:1});
	twoAnimate.timeline.staggerTo('.scene2_4 .right img',0.3,{opacity:1,rotationX:0,ease:Cubic.easeInOut},0,'-=0.4');
	twoAnimate.timeline.to('.points .text',0,{opacity:0},'-=0.4');
	twoAnimate.timeline.to('.points .point_icon',0.1,{'background-position':"left top"},'-=0.4');
	twoAnimate.timeline.to('.points .point3 .text',0.1,{opacity:1});
	twoAnimate.timeline.to('.points .point3 .point_icon',0.1,{'background-position':"right top"});
	twoAnimate.timeline.add('state4');
	twoAnimate.timeline.stop();
	
}
var threeAnimate = {};
threeAnimate.timeline = new TimelineMax();
threeAnimate.init = function(){
	threeAnimate.timeline.to('.scene3 .step img',0,{rotationX:-90,opacity:0,transformPerspective:600,transformOrigin:"center center"});
	threeAnimate.timeline.staggerTo(".step3_1 img",0.2,{opacity:1,rotationX:0,ease:Cubic.easeInOut},0.1);

	threeAnimate.timeline.add("threeSate1");

	threeAnimate.timeline.to(".step3_1 img",0.3,{opacity:0,rotationX:-90,ease:Cubic.easeInOut});
	threeAnimate.timeline.to(".step3_2 img",0.3,{opacity:1,rotationX:0,ease:Cubic.easeInOut});

	threeAnimate.timeline.add("threeSate2");

	threeAnimate.timeline.stop();
};
var fiveAnimate = {};
fiveAnimate.timeline = new TimelineMax();
fiveAnimate.init = function(){
	fiveAnimate.timeline.to(".scene5 .area_content img, .scene5 .button,.scene5 .button2",0,{rotationX:-90,transformPerspective:600,transformOrigin:"center center"});
	fiveAnimate.timeline.to(".scene5 .scene5_img",0.5,{top:0,ease:Cubic.easeInOut});
	fiveAnimate.timeline.staggerTo( ".scene5 .button,.scene5 .button2,.scene5 .area_content img",1.2,{opacity:1,rotationX:0,ease:Elastic.easeOut},0.2 );

	fiveAnimate.timeline.to(".scene5 .lines",0.5,{opacity:1});
		fiveAnimate.timeline.add("fiveState");

	fiveAnimate.timeline.stop();
};

