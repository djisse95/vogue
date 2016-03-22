Session.set("PostError", "" );
Session.set('page_msg',"");

Template.tags.events({
	'click #addtitle':function(e){
		e.preventDefault();
		var title = $('#title').val();
		var result = tags.find({title:title});
		var msg="";

		if(result.count() > 0 || title == "" ){
			if(title==""){
				msg+="Title is required!";
			}
			if(result.count() > 0){
				msg+="Title has already!";
			}
			Session.set("PostError", msg );
			Session.set('page_msg',msg);
		}else{
			Meteor.call('addtage',title); 
		}
	},
	'click #delete':function(){
        var id = this._id;
            Meteor.call('deletetitle',id);
   	},
   	'keypress input': function(event) {
        event = event || window.event;
	  	var keyCode = event.which || event.keyCode;
	  	Session.set("PostError","");
	  	Session.set("page_msg","");
	}
});

Template.tags.helpers({
	distitle : function(){
		return tags.find();
	},
	getmsg: function(){
		var msg = Session.get('page_msg',msg);
		if( msg !="" ) return msg;
		else msg ='';
	},
	PostError:function(){
		var msg = Session.get("PostError");
		if(msg) return true;
		else return false;
	},
	PostErrormsg: function(){
		return Session.get("PostError");
	}

});
