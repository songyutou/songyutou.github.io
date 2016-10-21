
$(function(){
	// 根据窗口变化设置高度
	var header = $(".header").get(0);
	var weiyunContent = $(".weiyun").get(0);
	var headerH = header.offsetHeight;
    var pid = 0;
	changeHeight();	
	function changeHeight(){
		var viewHeight = document.documentElement.clientHeight;	
		weiyunContent.style.height = viewHeight - headerH + "px";
		var eh=$(window).height()-80;
		$('.g-empty').height(eh);
	}
	window.onresize = changeHeight;
    var datas=data.files;
    var len=datas.length;
    //初始化生产文件区域HTML
    $('.file-list').html(createFilesHtml(datas,pid));
    //初始化树形菜单
    $('.tree').html(treeHtml(datas,-1));
    //利用事件委托树形菜单点击   
    $('.tree-title[data-file-id="'+0+'"]').addClass('tree-nav');
    $('.tree-title[data-file-id="'+0+'"]').get(0).isopen=r=true;
    //三角形小图标开关
    $('.ico').on('click',icoclick)
    function icoclick(e){
    	var target = $(this).parent().parent();   	
    	var dataid=target.get(0).dataset.fileId;
    	var hasChild = tools.hasChilds(datas,dataid);
    	if(target.get(0).isopen&&hasChild){
    		target.next().hide();
	    	target.get(0).isopen=false;
    		target.removeClass('tree-contro');
    	}else{
    		if(target.next().get(0).innerHTML==''&&hasChild){
		    		target.addClass('tree-contro');
		    		target.get(0).isopen=true;
		    		target.next().html(treeHtmlc(datas,dataid));
		    		target.next().find('.ico').on('click',icoclick);
	    		}else if(hasChild){
	    			
	    			target.addClass('tree-contro');
	    			target.next().show();
	    			target.get(0).isopen=true;
	    		}
    	}
    	e.stopPropagation();
    }
    //树形菜单开关
    $('.tree').on('click',function(e){
    	var target = e.target;  	
    	$target=$(target);
    	var n=0
    	while(!$target.hasClass('tree-title')&&n<3){
    		n++;
    		$target=$target.parent(); 
    	}     	
    	//获取点击的ID
    	
    	var dataid=$target.get(0).dataset.fileId;
    	if(!dataid){
    		return;
    	};
    	var hasChild = tools.hasChilds(datas,dataid);
    	if(hasChild){
    		if(!$target.get(0).isopen){
	    		if($target.next().get(0).innerHTML==''){
	    			
		    		$target.addClass('tree-contro');
		    		$target.get(0).isopen=true;
		    		$target.next().html(treeHtmlc(datas,dataid));
		    		console.log($target.next().find('.ico'))
		    		$target.next().find('.ico').on('click',icoclick)
	    		}else{
	    			$target.next().html(treeHtmlc(datas,dataid));
	    			$target.addClass('tree-contro');
	    			$target.next().get(0).style.display='block';
	    			$target.get(0).isopen=true;
	    		}
	    	}
    		else{
//	    		$target.next().get(0).style.display='none';
	    		$target.get(0).isopen=false;
//	    		$target.removeClass('tree-contro');
	    	}
    	}
    	//上部导航菜单添加
        $('.top-nav').html(creatrNav(datas,dataid));
        //树形菜单添加样式
         positionClass(dataid);
    	//文件区域渲染
    	$('.file-list').html(createFilesHtml(datas,dataid));
    	classxg(labs);
    	$('.ucheck').removeClass('checkalled');
    	pid=dataid;
    })
	$('.file-list').on('click',function(e){
		var target = e.target;
		$target=$(target);
    	var n=0
    	while(!$target.hasClass('item')&&n<3){
    		n++;
    		$target=$target.parent(); 
    	}     
    	if(!$target.hasClass('item'))return;
    	//获取点击的ID
    	var dataid=$target.get(0).dataset.fileId;
    	$('.top-nav').html(creatrNav(datas,dataid));
        //树形菜单添加样式
       	positionClass(dataid);
    	//文件区域渲染
    	$('.file-list').html(createFilesHtml(datas,dataid));
    	classxg(labs);
    	$('.ucheck').removeClass('checkalled');
    	pid=dataid;
	});
	//上部导航菜单定位+生成
	$('.top-nav').on('click',function(e){
		var target = e.target;
		$target=$(target);	
		var dataid=$target.get(0).dataset.fileId;
		if(!dataid)return;
		$('.top-nav').html(creatrNav(datas,dataid));
        //树形菜单添加样式
       	positionClass(dataid);
    	//文件区域渲染
    	$('.file-list').html(createFilesHtml(datas,dataid)); 
    	classxg(labs);
    	$('.ucheck').removeClass('checkalled');
    	pid=dataid;
	})
	//鼠标滑过添加checked
	$(document).on('mouseenter','.item',function(){
		$(this).addClass('hover');
		$(this).children('label').addClass('hover1');
	})
	$(document).on('mouseleave','.item',function(){
		if(!$(this).children('label').hasClass('checked')){
			$(this).removeClass('hover');
			$(this).children('label').removeClass('hover1');
		}		
	});
	//文件点击效果
	var labs = document.getElementsByTagName('label');
	classxg(labs);
	function classxg(labs){		
		for (var i=0;i<labs.length;i++) {
			labs[i].addEventListener('click',function(ev){	
				$(this).toggleClass('checked');
				console.log(1)
				if(!$(this).hasClass('checked')){
					$('.ucheck').removeClass('checkalled');
				}else{
					test();
				}
				ev.stopPropagation();
			});
			labs[i].addEventListener('mousedown',function(ev){
				ev.stopPropagation();
			})
		};	
	};
	function test(){
		var labs = document.getElementsByTagName('label');
		if($('.checked').length==labs.length&&$('.checked').length!=0&&labs.length!=0){
				$('.ucheck').addClass('checkalled');				
			}else{
				$('.ucheck').removeClass('checkalled');
			}
	};
	//全选按钮
	$('.ucheck').on('click',function(){
		$(this).toggleClass('checkalled');
		if($(this).hasClass('checkalled')){
			$('label').addClass('hover1 checked');
			$('.item').addClass('hover');
		}else{
			$('label').removeClass('hover1 checked');
			$('.item').removeClass('hover');
		}
	});
	//新建文件夹
    function createDiv(){
		var creatediv=document.createElement('div');
		creatediv.className='file-item';
		creatediv.innerHTML=`
			<div class="item" data-file-id=${len++}>
				<label class="checkbox"></label>
				<div class="file-img">
					<i></i>
				</div>
				<p class="file-title-box">
                    <span class="file-title"></span>
                    <span class="file-edtor">
                        <input class="edtor" value="" type="text"/>
                    </span>
                </p>
			</div>`;
		return creatediv;
	};
	$('.create').on('mouseup',function(){
		var firste=$('.file-list').children().get(0);
		//新建文件夹放入页面里
		$('.file-list').get(0).insertBefore(createDiv(),firste);
		var firste=$('.file-list').children().get(0);	
		$(firste).find('.file-title').hide();
		$(firste).find('.file-edtor').show();
		$(firste).find('input').get(0).focus();
		//阻止input冒泡
		$('.file-list').find('.edtor').on('mousedown',function(e){
		e.stopPropagation();
		});
		$('.file-list').find('.edtor').on('click',function(e){
		e.stopPropagation();
		});
		if($('.g-empty').get(0).style.display==='block'){	
			$('.file-list').show();
			$('.g-empty').hide();
		}
		$('.create').get(0).isCreate=true;
	});
	//enter点击确定生产新文件夹
	$(document).on('keydown',function(e){
		if(e.keyCode===13){
			console.log(1)
			if($('.create').get(0).isCreate){
			var firste=$('.file-list').children().get(0);			
			var title=$(firste).find('.file-title');
			var value=$(firste).find('input').get(0).value.trim();
			if(value===''){
				$('.file-list').get(0).removeChild(firste);
				if($('.file-list').get(0).innerHTML===''){
					$('.file-list').hide();
					$('.g-empty').show();
				}
			}else{			
				$(firste).find('.file-title').show();
				title.get(0).innerHTML=value;			
				$(firste).find('.file-edtor').hide();	
				var dateid =$(firste).find('.item').get(0).dataset.fileId;
			//新建数据放入数据结构中
				var newfiledate = {
					id:dateid,
					pid:pid,
					title:value,
					type:'flie'
				}
				datas.unshift(newfiledate);
				var treeUl =  $('.tree-title[data-file-id="'+pid+'"]');	
				treeUl.next().get(0).appendChild(treeLi({
					title:value,
					level:tools.getLevelById(datas,dateid),
					id:dateid
				}));
				$('.tree-title[data-file-id="'+dateid+'"]').get(0).isopen=true;				
				$('.tree-title[data-file-id="'+dateid+'"]').find('.ico').on('click',icoclick);
				if(treeUl.next().get(0).innerHTML!=''){
					treeUl.addClass('tree-contro').removeClass('tree-contro-none');
				}else{
					treeUl.addClass('tree-contro-none');
				}
				var flab=[$(firste).find('label').get(0)];
				classxg(flab);
			};				
			test();
		};
		$('.create').get(0).isCreate=false;
	}})
	//左键点击确定生产文件夹
	$(document).on('mousedown',function(e){	
		e.stopPropagation();		
		if($('.create').get(0).isCreate){
			var firste=$('.file-list').children().get(0);			
			var title=$(firste).find('.file-title');
			var value=$(firste).find('input').get(0).value.trim();
			if(value===''){
				$('.file-list').get(0).removeChild(firste);
				if($('.file-list').get(0).innerHTML===''){
					$('.file-list').hide();
					$('.g-empty').show();
				}
			}else{			
				$(firste).find('.file-title').show();
				title.get(0).innerHTML=value;			
				$(firste).find('.file-edtor').hide();	
				var dateid =$(firste).find('.item').get(0).dataset.fileId;
			//新建数据放入数据结构中
				var newfiledate = {
					id:dateid,
					pid:pid,
					title:value,
					type:'flie'
				}
				datas.unshift(newfiledate);
				var treeUl =  $('.tree-title[data-file-id="'+pid+'"]');	
				treeUl.next().get(0).appendChild(treeLi({
					title:value,
					level:tools.getLevelById(datas,dateid),
					id:dateid
				}));				
				$('.tree-title[data-file-id="'+dateid+'"]').get(0).isopen=true;				
				$('.tree-title[data-file-id="'+dateid+'"]').find('.ico').on('click',icoclick)
				if(treeUl.next().get(0).innerHTML!=''){					
					treeUl.addClass('tree-contro').removeClass('tree-contro-none');
				}else{
					treeUl.addClass('tree-contro-none');
				}
				var flab=[$(firste).find('label').get(0)];	
				classxg(flab);
			};						
			test();
			
		};
		$('.create').get(0).isCreate=false;
	});
	//框选文件夹
	var newDiv=null;
	var disX=0;
	var disY=0;
	$(document).on('mousedown',function(ev){
			
		ev.preventDefault();
		ev.stopPropagation();	
		var target=ev.target;	
		$target=$(target)
		var n=0
		//如果为导航的按钮不进行框选
    	while(!$target.hasClass('nav-r')&&n<4){
    		n++;
    		$target=$target.parent(); 
    	}     
    	if($target.hasClass('nav-r'))return;
    	var labs = document.getElementsByTagName('label');		
		test();
		disX=ev.clientX;
		disY=ev.clientY;
		
		    $(document).on('mousemove',mousemove)
		    $(document).on('mouseup',upfn)
	});
	function upfn(){
		    	$(document).off('mousemove',mousemove);
		    	$(document).off('mouseup',upfn);
		    	if(newDiv)newDiv.style.display='none';
	};
	function mousemove(ev){
		//当鼠标滑动超过10px才进行框选
		if(Math.abs(ev.clientY-disY)>10||Math.abs(ev.clientX-disX)>10){
			if(!newDiv){
			newDiv = document.createElement('div');
			newDiv.className = 'selectTab';
			document.body.appendChild(newDiv);		    
		}
			newDiv.style.height=0+'px';
	    	newDiv.style.width=0+'px';
			
			newDiv.style.top=disY+'px';
		    newDiv.style.left=disX+'px';
			newDiv.style.display='block';
	    	var h=ev.clientY-disY;
	    	var w=ev.clientX-disX;
	    	newDiv.style.height=Math.abs(h)+'px';
	    	newDiv.style.width=Math.abs(w)+'px';
	    	newDiv.style.left=Math.min(ev.clientX,disX)+'px';
	    	newDiv.style.top=Math.min(ev.clientY,disY)+'px';
	    	//进行碰撞检测
	    	$.each($('.item'),function(n,item){
	    		if(tools.collisionRect(newDiv,item)){
	    			$(item).addClass('hover');
	    			$(labs[n]).addClass('hover1 checked')	    			
	    		}else{
	    			$(item).removeClass('hover');
	    			$(labs[n]).removeClass('hover1 checked')	
	    		}
	    		test();
	    	})
		}
			
	};
	//删除选中的文件
	$('.delect').on('click',function(){
		var labs=$('.file-list').find('label');
		labs.each(function(index,item){
			if($(item).hasClass('checked')){
				var dataid = $(item).parent().get(0).dataset.fileId;
				for(var j=0;j<datas.length;j++){
    				if(datas[j]==tools.getInfo(datas,dataid)){
    					datas.splice(j,1);
    				};
    			};
    			var tdiv = $('.tree-title[data-file-id="'+dataid+'"]');
    			//删除该元素
    			tdiv.parent().remove(); 
    			//如果没有子集进行的操作
				if(!tools.hasChilds(datas,pid)){
					$('.tree-title[data-file-id="'+pid+'"]').removeClass(' tree-contro').addClass('tree-contro-none');
					$('.g-empty').show();
					$('.file-list').hide();
				}
			};
		});
		//生产文件夹区域
		$('.file-list').html(createFilesHtml(datas,pid));
		test();		
	});
	//重命名点击
	$('.rename').on('click',function(e){
		e.stopPropagation();
		var labs=$('.file-list').find('label');
		var n=0;	
		//只有选择一个lab的时候才可以重命名
		labs.each(function(index,item){
			if($(item).hasClass('checked')){
				n+=1;
			}
		})
		if(n>1||n==0)return;
		$('.checked').parent().find('.file-edtor').click(function(e){
			e.stopPropagation();
		});
		$('.checked').parent().find('.file-edtor').mousedown(function(e){
			e.stopPropagation();
		});
		$('.checked').parent().find('.file-edtor').show();
		$('.checked').parent().find('.file-title').hide();
		$('.rename').get(0).rename=true;
		
	});
	//确定重命名
	$(document).on('mousedown',function(e){		
		test();
		if($('.rename').get(0).rename){
			var newname=$('.checked').parent().find('.edtor').get(0).value.trim();
			if(newname!==''){
				$('.checked').parent().find('.file-title').show().html(newname);
				$('.checked').parent().find('.file-edtor').hide();
				var dataid = $('.checked').parent().get(0).dataset.fileId;
				tools.getInfo(datas,dataid).title=newname;
				$('.tree-title[data-file-id="'+dataid+'"]').find('.ellipsis').html(newname);
			};
		$('.rename').get(0).rename=false;
		};
		e.stopPropagation();
	});
	//移动选中文件夹
	$('.move').on('click',function(){
		if(!$('label').hasClass('checked'))return;
		var popup = new PopUp();
			popup.open({
				content:treeHtml(datas,-1)
				});
				
		//移动文件显示文件名和数量
		var labs=$('.file-list').find('.checked');
		$('.file-name').html($(labs[0]).parent().find('.file-title').html())
		$('.total').html(labs.length+'个文件');
			//移动树形菜单添加开关
		$('.movetree').on('click',function(e){
    	var target = e.target;  	
    	$target=$(target);
    	var n=0
    	while(!$target.hasClass('tree-title')&&n<3){
    		n++;
    		$target=$target.parent(); 
    	}     	
    	//获取点击的ID
    	
    	var dataid1=$target.get(0).dataset.fileId;
    	console.log(dataid1)
    	if(!dataid1){
    		return;
    	};
    	var hasChild = tools.hasChilds(datas,dataid1);
    	if(hasChild){
    		if(!$target.get(0).isopen){
	    		if($target.next().get(0).innerHTML==''){
	    			
		    		$target.addClass('tree-contro');
		    		$target.get(0).isopen=true;
		    		$target.next().html(treeHtmlc(datas,dataid1));
		    		console.log($target.next().find('.ico'))
		    		$target.next().find('.ico').on('click',icoclick)
	    		}else{
	    		
	    			$target.addClass('tree-contro');
	    			$target.next().get(0).style.display='block';
	    			$target.get(0).isopen=true;
	    		}
	    	}
    	}
    	
         positionClass(dataid1);   	
    	classxg(labs);
//  	$('.ucheck').removeClass('checkalled');
    	pid=dataid1;
    	
    	 popup.onconfirm = function(){
			//点击确定时执行。
			var onoff=true;
			var labs=$('.file-list').find('.checked');
			labs.each(function(index,item){
				if($(item).hasClass('checked')){
					var dataid=$(item).parent().get(0).dataset.fileId;
				  	 console.log($(item).parent().get(0),dataid)
					var tpid=tools.getInfo(datas,dataid).pid;
					var tid=tools.getInfo(datas,dataid).id;
						//错误提示
						if(tpid==parseInt(dataid1)||!tools.testchild(datas,dataid1,dataid)){
							$('.error').html('不能移动到当前或其子文件夹下');	
							onoff=false;
						}else{
					tools.getInfo(datas,dataid).pid=dataid1;	    			
	    			var tdiv = $('.tree-title[data-file-id="'+dataid1+'"]');
	    			//添加样式
	    			if($(tdiv).hasClass('tree-contro-none')){	    				$(tdiv).removeClass('tree-contro-none').addClass('tree-contro');
	    			console.log($(tdiv))
	    			}
	    			//删除该元素
	    			$('.tree-title[data-file-id="'+dataid+'"]').remove();
//	    			$('.tree').html(treeHtml(datas,-1));
	    			$('.file-list').html(createFilesHtml(datas,tpid));
//  			如果没有子集进行的操作
					if(!tools.hasChilds(datas,tpid)){
						$('.tree-title[data-file-id="'+dataid+'"]').removeClass(' tree-contro').addClass('tree-contro-none');
						$('.g-empty').show();
						$('.file-list').hide();
						}
	    				
					}
				};
			});
			if(!onoff){
				//阻止关闭
				return false;
			}
			};
    });	   
	});
});
	