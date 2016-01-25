Template.disContentByUser.helpers({
	getContent:function(){
		var userId = Meteor.userId();
		return content.find({userId:userId});
	},
	getCate:function(){
		var catID = this.catId;
		return categories.find({_id:catID});
	},
	getImage:function(id){
		var img = images.findOne({_id:id});
        if(img){
            //console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
	}
});
Template.disContentByUser.events({
	'click #remove-con':function(){
        var id = this._id;
        if (confirm("Are you sure you want to delete this?")) {
            Meteor.call('removeContent',id);
        }    
    }
});