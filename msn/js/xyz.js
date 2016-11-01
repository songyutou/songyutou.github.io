var piclist = document.getElementById('banner');
piclist.innerHTML+=piclist.innerHTML;
window.onload = function(){
//设置banner宽度
document.getElementsByClassName('banner')[0].style.width = document.getElementsByClassName('banner')[0].getElementsByTagName('a').length*document.documentElement.clientWidth+'px';
//阻止document的默认事件
piclist.addEventListener('touchmove',function(e){
	e.preventDefault();
});

var aBouts = document.getElementsByClassName('buts')[0].getElementsByTagName('span');
var iScroll = 0;
var iNow = 0;
var iStart= 0;
var startScroll = 0;
var timer=0;

function autoplay(){
	timer=setInterval(function(){
		iNow++;
		iScroll = -iNow*window.screen.width;
		if(iScroll==-5*window.screen.width){iScroll=0
		console.log(1)}
	for (var i =0;i<aBouts.length;i++) {	
			aBouts[i].className='';		
	}
	aBouts[iNow%aBouts.length].className='active';
	if(iNow==aBouts.length){
		MTween(piclist,{translateX:iScroll},300,'easeOut',function(){
			iNow=0;
			iScroll = 0;
			piclist.style.transform = 'translateX('+0+'px)';			
		});
	}
	else{		
		MTween(piclist,{translateX:iScroll},300,'easeOut');

	};
	},3000)
};
console.log(iNow)
autoplay();
piclist.addEventListener('touchstart',function(e){
	clearInterval(timer);
	clearInterval(piclist.timer)
	if(iNow<=0){
		iNow+=aBouts.length;
		iScroll = -iNow*window.screen.width;
		css(piclist,'translateX',iScroll);
	}
	iStart = e.changedTouches[0].pageX;
	startScroll = iScroll;

},false)
piclist.addEventListener('touchmove',function(e){
	var DisX = e.changedTouches[0].pageX-iStart;
	iScroll = startScroll+DisX;
	css(piclist,'translateX',iScroll);
},false);
piclist.addEventListener('touchend',function(e){
	console.log(iStart,e.changedTouches[0].pageX)
	iNow = -iScroll/window.screen.width;
	console.log(iNow)
	if(iStart-e.changedTouches[0].pageX>0){
		iNow = iNow%1<0.2?Math.floor(iNow):Math.ceil(iNow);
	}else{
		iNow = iNow%1<0.8?Math.floor(iNow):Math.ceil(iNow);
	}
	autoplay();
//	if(iNow>aBouts.length-1){
//		iNow=aBouts.length-1;
//	}
	iScroll = -iNow*window.screen.width;
	for (var i =0;i<aBouts.length;i++) {	
			aBouts[i].className='';		
	}
	aBouts[iNow%aBouts.length].className='active';
	if(iNow>=aBouts.length){
		MTween(piclist,{translateX:iScroll},300,'easeOut',function(){
			iNow=iNow%aBouts.length;
			iScroll = -iNow*window.screen.width;
//			css(piclist,'translateX');
			piclist.style.transform = 'translateX('+iScroll+'px)';
		});
	}else{
		MTween(piclist,{translateX:iScroll},300,'easeOut');
	};
},false)
};
