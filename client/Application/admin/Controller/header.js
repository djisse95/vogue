Session.setDefault('currentClass','');
Template.header.onCreated(function () {
    var num_default = 1;
    Session.set("NUM_DEFAULT",num_default);
});
Template.header.helpers({
    getnum:function(){
        var default_page = Session.get("NUM_DEFAULT");
        if(default_page){
            return default_page;
        }else{
            return false;
        }
        
    }
});
num = 0;
Template.header.events({
    "click .menupage11":function(e){
        e.preventDefault();
        alert("hello");
        Session.set("NUM-PAGE",1)
    },
	'click .changelist':function(e,tpl){
		Session.set("NUM-PAGE",1);
        var num = 1;
        $(".count-num").html(num);
	},
	/*'click #listCate':function(e){
		e.preventDefault();
		var id = this._id;
		console.log('going to '+id);
		Session.set("categoriesId",id);
		Router.go("list");
		//alert(id);
	},*/
	//=============Start Click next prev pagination=============
	'click .swiper-button-next':function(e){
        e.preventDefault();
        var num = $(".count-num").text();
            num ++;
            console.log("COUNT="+num);
        if(num>0){
            Session.set("NUM-PAGE",num);
            $(".count-num").html(num);
            $(".swiper-button-prev").removeClass("swiper-button-disabled");
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
    dismenu : function(){
        return categories.find();
    },
    getNumberPag:function(){
    		if(Session.get('currentPage'))
    			return Session.get('currentPage');
    		else
    			return Session.get('arrayPage');
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
Template.header.rendered = function(){
    var num_default = 1;
    console.log("ADD_NUM="+num_default);
    $(".count-num").html(num_default);

}
Template.header.rendered = function(){ // event use to 
	var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30
    });
    $(".swiper-button-prev").removeClass('swiper-button-disabled');
    $(".swiper-button-next").removeClass('swiper-button-disabled');

    //Session.set('currentPage',0);

};