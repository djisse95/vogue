Template.home.helpers({
   
    //==========Start Query paginatoin============
    discontent:function(){
        var arr=[];
        var query=12;
        var array=[];
        var nunberPage=Session.get('NUM-PAGE');
        if(nunberPage){
          query=nunberPage*12;  
        }
        var items = content.find({},{limit:query});
        console.log("LENG_ITEM"+query);
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
            /*if(start != 12){
                $(".swiper-button-next").addClass("swiper-button-disabled");
            }*/
        }
        console.log("START="+start);
        for(var i=start;i<query;i++){
            if(arr[i]){
                array.push(arr[i]);
            }
        }
        Session.set('getNumberOfContent',array.length);
        return array;
    },
    //==========End Query paginatoin============
    getImage:function(id){
        var img = images.findOne({_id:id});
        if(img){
            return img.copies.images.key;
        }else{
            return;
        }
    },
    getcatename:function(catId){
        return categories.find({_id:catId});
    },
    disBackground:function(catId){
        console.log('disbackground: '+catId);
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
    },
    getTitle: function(title){

        var s = title;
        var max_length = 25;

        if (s.length > max_length)
        {
           s = s.substr(0, 25) + '...';
         
        }
        return s;
    },
    getText: function(text){

        var c = text;
        var max_length = 50;

        if (c.length > max_length)
        {
          c = c.substr(0, 50) + '...';
        }
        return c;
    }

});
