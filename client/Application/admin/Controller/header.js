Session.setDefault('currentClass','');
Template.header.onCreated(function () {
    var num_default = 1;
    Session.set("NUM_DEFAULT",num_default);
});
num = 0;
Template.header.events({
	'click .changelist':function(e,tpl){
		Session.set("NUM-PAGE",1);
        var num = 1;
        $(".count-num").html(num);
        $(".swiper-button-next").removeClass("swiper-button-disabled");
	},
	//=============Start Click next prev pagination=============
	'click .swiper-button-next':function(e){
        e.preventDefault();
        var num = $(".count-num").text();
            num ++;
            console.log("COUNT="+num);
        if(num>0){
            if(Session.get('getNumberOfContent')==12){
                Session.set("NUM-PAGE",num);
                $(".count-num").html(num);
                $(".swiper-button-prev").removeClass("swiper-button-disabled");  
            }else{
                $(".swiper-button-next").addClass("swiper-button-disabled");
            }
            
        }
	},
    'click .addConten':function(){
        Session.set('currentClass',"");
        $(".addConten").addClass('add-content');
        $(".homepg").removeClass('add-content');
    },
    'click .homepg':function(){
        Session.set('currentClass',"");
        $(".homepg").addClass('add-content');
        $(".addConten").removeClass('add-content');
    },
	'click .swiper-button-prev':function(e){
		e.preventDefault();
        var count = $(".count-num").text();
            count --;
        if(count>0){
            Session.set("NUM-PAGE",count);
            $(".count-num").html(count);
            $(".swiper-button-next").removeClass("swiper-button-disabled");
        }
        else{
            $(".swiper-button-prev").addClass("swiper-button-disabled");
        }

	},
	//start add style to menu====
	'click .catstyle':function(event){	
		//var catClass = this.title.toLowerCase();
		//alert(catClass);
		//alert(this._id);
        $(".addConten").removeClass('add-content');
        $(".homepg").removeClass('add-content');
		Session.set('currentClass',this._id);
	}
	//=============End Click next prev pagination===============
});
Template.header.helpers({
    getnum:function(){
        var default_page = Session.get("NUM_DEFAULT");
        if(default_page){
            return default_page;
        }else{
            return false;
        }
    },
    dismenu : function(){
        return categories.find();
    },
    tolow:function(title){
    	var convertowercase = title.toLowerCase();
    	return convertowercase;
    },
    getClass:function(_id){
    	var id = _id;
    	var SessionId = Session.get('currentClass');
    	//alert(SessionId);
    	var cl = categories.findOne({_id:id});
    	console.log("styleclass is"+cl.title);
    	var css = cl.title.toLowerCase();
    	if(id == SessionId){
    		return css;
    	}else{
    		return;
    	}
    }
});