Session.setDefault('currentPage',0);
Session.setDefault('currentClass','');
Template.header.events({
	'click .changelist':function(e,tpl){
		Session.set('currentPage',0);
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
		var i=Session.get('currentPage')+1;	
		Session.set('currentPage',i);
	},
	'click .swiper-button-prev':function(e){
		e.preventDefault();
		if(Session.get('currentPage')==0)
			return;
		var prev=Session.get('currentPage')-1;
		Session.set('currentPage',prev);


	},
	//start add style to menu====
	'click .catstyle':function(event){	
		//var catClass = this.title.toLowerCase();
		//alert(catClass);
		//alert(this._id);
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