Template.tags.events({
	'click #addtitle':function(e){
		e.preventDefault();
		var title = $('#title').val();
		alert(title);
		Meteor.call('distags',title); 
	},
	'click #delete':function(){
        var id = this._id;
            Meteor.call('deletetitle',id);
        }
});

Template.tags.helpers({
	distitle : function(){
		return tags.find();
	}

});
