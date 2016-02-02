Session.setDefault('currentPage',0);
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

	}
	//=============End Click next prev pagination===============
});
Template.header.helpers({
    dismenu : function(){
        return categories.find();
    },
    getNumberPag:function(){
    	console.log("cuurnt page "+Session.get('currentPage'));
    		// if(Session.get('currentPage') == 0)
    			// console.log(" array page ff"+Session.get('arrayPage'));
    			return Session.get('arrayPage');
    		// else
    		// 	return Session.get('currentPage');
    			
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