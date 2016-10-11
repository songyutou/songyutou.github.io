var tools={
	// 获取同级的数据
	getChildren:function(data,pid){
		var targetdata=[];
        for(var i=0;i<data.length;i++){
        	if (data[i].pid==pid) {
        		targetdata.push(data[i])
        	}
        }
        return targetdata;
	},
	// 根据ID获取数据
	getInfo:function(data,id){
        for(var i=0;i<data.length;i++){
        	if (data[i].id==id) {
        		return data[i]
        	}
        }
	},
	getParents : function (data,id){
		var arr = [];
		for( var i = 0; i < data.length; i++ ){
			if( data[i].id == id ){
				arr.push(data[i]);
				arr = arr.concat(tools.getParents(data,data[i].pid))
				break;
			}
		}
		return arr;
	},
	getLevelById:function (data,id){
		return tools.getParents(data,id).length;
	},
	hasChilds:function (data,id){
		return tools.getChildren(data,id).length !== 0;
	},
	getEleRect:function(obj){
			return obj.getBoundingClientRect();
	},
	collisionRect:function(obj1,obj2){
		var obj1Rect = tools.getEleRect(obj1);
		var obj2Rect = tools.getEleRect(obj2);

		var obj1W = obj1Rect.width;
		var obj1H = obj1Rect.height;
		var obj1L = obj1Rect.left;
		var obj1T = obj1Rect.top;

		var obj2W = obj2Rect.width;
		var obj2H = obj2Rect.height;
		var obj2L = obj2Rect.left;
		var obj2T = obj2Rect.top;
		//碰上返回true 否则返回false
		if( obj1W+obj1L>obj2L && obj1T+obj1H > obj2T && obj1L < obj2L+obj2W && obj1T<obj2T+obj2H ){
			return true
		}else{
			false;
		}
	},
	testchild:function(data,id,tid){
		var te=true;
		for(var i=0;i<tools.getParents(data,id).length;i++){
			if(tools.getInfo(data,tid)==tools.getParents(data,id)[i]){
				te=false;
				break;
			};
		};
		return te;
	}
}