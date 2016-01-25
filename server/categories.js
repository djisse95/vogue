
Meteor.methods({
    categories: function(title,image){
        var attr = {
            title : title,
            image: image
        }
        return categories.insert(attr);
    },
    editcategories: function(id,title,image){
        var attr = {
            title : title,
            image: image
        }
        return categories.update({_id:id},{$set:attr});
    },
    deletecate: function(id){
        return categories.remove({_id:id});
    }
});