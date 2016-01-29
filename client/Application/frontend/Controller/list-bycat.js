Template.list.helpers({
    showFirstRow:function(){
        var catId = Session.get("categoriesId");
        return content.find({catId:catId},{limit:6});
    },
    discontent:function(){
        var catId = Session.get("categoriesId");
        var arr=[];
        var query=12;
        var array=[];
        var nunberPage=Session.get('next');
        if(nunberPage){
          query=nunberPage*12;  
        }
        console.log('displaying elt...');
        var items = content.find({catId:catId},{limit:query});
        console.log('items:'+items.count());
        items.forEach(function(value){
            var obj={
                _id        : value._id,
                userId     : value.userId,
                imageId    : value.imageId,
                title      : value.title,
                description: value.description,
                createdAt  : value.createdAt,
                catId      : value.catId,
                layout     : value.layout,
                tags       : value.tags
            }
            arr.push(obj);
        });
        if(query<24){
            var start=0;
        }else{
            var start=query-12;
        }
        for(var i=start;i<query;i++){
            if(arr[i]){
                array.push(arr[i]);
            }
           
        }
        return array;
    },
	morearticle:function(){
		var catId = Session.get("categoriesId");
		var items = article.find({catId:catId}, {sort: {name: 1},limit:Session.get('limit')}).fetch();
        if(items.length>0)
  		    return items.slice(4,items.length);
        else
            return null;
	},
	getImage:function(id){
		var img = images.findOne({_id:id});
        if(img){
            //console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
	},
    getMenu:function(){
        var menu = Session.get("menu");
        return categories.find({_id:menu},{limit:6});
    },
    disBackground:function(catId){
        var a = categories.findOne({_id:catId});
        var b = a.title;
        var arrBeauty = ["bg_beauty1","bg_beauty2","bg_beauty3","bg_beauty4","bg_beauty5"];
        var arrLifestyle = ["bg_lifestyle1","bg_lifestyle2","bg_lifestyle3","bg_lifestyle4","bg_lifestyle5"];
        var arrFashion = ["bg_fashion1","bg_fashion2","bg_fashion3","bg_fashion4","bg_fashion5"];
        console.log("MYTITLE="+b);
        if(b=="Beauty"){
            var beauty = arrBeauty;
            var item = beauty[Math.floor(Math.random()*beauty.length)];
            console.log("MYBEAUTY="+item);
            return item;
        }
        if(b=="Lifestyle"){
            var lifestyle = arrLifestyle;
            var item = lifestyle[Math.floor(Math.random()*lifestyle.length)];
            console.log("MYBEAUTY="+item);
            return item;
                
        }
        if(b=="Fashion"){
            var fashion = arrFashion;
            var item = fashion[Math.floor(Math.random()*fashion.length)];
            console.log("MYBEAUTY="+item);
            return item;    
        }
    }
});