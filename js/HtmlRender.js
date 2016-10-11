function createHtml(data){
     var filehtml=
     	`<div class="file-item">
			<div class="item" data-file-id=${data.id}>
				<label class="checkbox"></label>
				<div class="file-img">
					<i></i>
				</div>
				<p class="file-title-box">
                    <span class="file-title">${data.title}</span>
                    <span class="file-edtor">
                        <input class="edtor" value="${data.title}" type="text"/>
                    </span>
                </p>
			</div>
		</div>`
	return filehtml;
};
function treeLi(opt){
	var xli =document.createElement('li');
	xli.innerHTML =  `         
                <div class="tree-title tree-contro-none" data-file-id="${opt.id}" style="padding-left:${opt.level*14}px">
                    <span>
                        <strong class="ellipsis">${opt.title}</strong>
                        <i class="ico"></i>
                    </span>
                </div> `;                      
     xli.innerHTML+='<ul></ul>';
	return xli;
}
function createFilesHtml(data,pid){
      var childs=tools.getChildren(data,pid);
      var str='';
      childs.forEach(function (item,index){
      		str+=createHtml(item);
      }) 
      return str;
};
function treeHtml(data,id){
	var childs=tools.getChildren(data,id);
	var html='<ul>';
	childs.forEach(function(item){
		//获取层级
		var level = tools.getLevelById(data,item.id);
		//子元素的pid是父级的ID
		var hasChild = tools.hasChilds(data,item.id);
		var classNames = hasChild ? "tree-contro" : "tree-contro-none";
		html += `
            <li>
                <div class="tree-title ${classNames}" data-file-id="${item.id}" style="padding-left:${level*14}px">
                    <span>
                        <strong class="ellipsis">${item.title}</strong>
                        <i class="ico"></i>
                    </span>
                </div>
                ${treeHtmlc(data,item.id)}
            </li>`
	})	
	html+='</ul>';
	return html;
};
function treeHtmlc(data,id){
	var childs1=tools.getChildren(data,id);
	var html1='<ul>';
	childs1.forEach(function(item){
		//获取层级
		var level = tools.getLevelById(data,item.id);
		//子元素的pid是父级的ID
		var hasChild = tools.hasChilds(data,item.id);
		var classNames = hasChild ? "" : "tree-contro-none";
		html1 += `
            <li>
                <div class="tree-title ${classNames}" data-file-id="${item.id}" style="padding-left:${level*14}px">
                    <span>
                        <strong class="ellipsis">${item.title}</strong>
                        <i class="ico"></i>
                    </span>
                </div>
                <ul></ul>
            </li>`
	})	
	html1+='</ul>';
	return html1;
};
function creatrNav(data,id){
	//找到指定id所有的父数据
	var parents = tools.getParents(data,id).reverse(); 
	var pathNavHtml = '';
	var len = parents.length;

	parents.forEach(function(item,index){
		if( index === parents.length-1 ) return;
		pathNavHtml += `
				<a href="javascript:;" style="z-index:${len--}" data-file-id="${item.id}">
					${item.title}
				</a>
			`;
	});
	//是当前这个一层的导航内容
	pathNavHtml += `
			<span class="navshow" style="z-index:${len--}">
				${parents[parents.length-1].title}
			</span>
		`;
	var haschild = tools.hasChilds(data,id);
	if(!haschild){
		$('.g-empty').show();
		$('.file-list').hide();
	}else{
		$('.g-empty').hide();
		$('.file-list').show();
	}
	return pathNavHtml;
}
function positionClass(dataid){
	 $('.tree-nav').removeClass('tree-nav');
    $('.tree-title[data-file-id="'+dataid+'"]').addClass('tree-nav');
}
