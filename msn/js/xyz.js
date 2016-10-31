
window.onload = function(){
//设置banner宽度
var piclist = document.getElementById('banner');
piclist.innerHTML+=piclist.innerHTML;
document.getElementsByClassName('banner')[0].style.width = document.getElementsByClassName('banner')[0].getElementsByTagName('a').length*document.documentElement.clientWidth+'px';
//阻止document的默认事件
document.addEventListener('touchmove',function(e){
	e.preventDefault();
});
var timer=0;

function autoplay(){
	timer=setInterval(function(){
		iNow++;
		iScroll = -iNow*window.screen.width;
		for (var i =0;i<aBouts.length;i++) {	
				aBouts[i].className='';		
		}
		aBouts[iNow%aBouts.length].className='active';
		if(iNow>=aBouts.length){
			piclist.addEventListener('transitionend',fn);
			setTimeout(function(){
				piclist.removeEventListener('transitionend',fn);	
			},1000)
		}else{
			
		}
		piclist.style.webkitTransition=piclist.style.transition = '0.3s';
		toStyle();
		console.log(iNow)
	},2000)
};
autoplay();
var aBouts = document.getElementsByClassName('buts')[0].getElementsByTagName('span');
var iScroll = 0;
var iNow = 0;
var iStart= 0;
var startScroll = 0;

piclist.addEventListener('touchstart',function(e){
	clearInterval(timer);
	if(iNow<=0){
		iNow+=aBouts.length;
		iScroll = -iNow*window.screen.width;
	piclist.style.webkitTransition=piclist.style.transition = '0s';
	}
	iStart = e.changedTouches[0].pageX;
	startScroll = iScroll;
},false)
piclist.addEventListener('touchmove',function(e){
	
	var DisX = e.changedTouches[0].pageX-iStart;
	iScroll = startScroll+DisX;
	toStyle();
},false);
piclist.addEventListener('touchend',function(e){
	autoplay();
	iNow = -iScroll/window.screen.width
	iNow = iNow%1<0.3?Math.floor(iNow):Math.ceil(iNow);
	
//	if(iNow>aBouts.length-1){
//		iNow=aBouts.length-1;
//	}
	iScroll = -iNow*window.screen.width;
	for (var i =0;i<aBouts.length;i++) {	
			aBouts[i].className='';		
	}
	aBouts[iNow%aBouts.length].className='active';
	if(iNow>=aBouts.length){
		piclist.addEventListener('transitionend',fn);
		setTimeout(function(){
		piclist.removeEventListener('transitionend',fn);	
	},1000)
	}else{
		
	}
	piclist.style.webkitTransition=piclist.style.transition = '0.3s';
	toStyle();
},false)
 function toStyle(){
 	piclist.style.WebkitTransform=piclist.style.transform = 'translateX('+iScroll+'px)';
 }
function fn(){
	iNow=iNow%aBouts.length;
	iScroll = -iNow*window.screen.width;
	piclist.style.webkitTransition=piclist.style.transition = '0s';
	toStyle();	
}
};
