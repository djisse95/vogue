Meteor.methods({
    distags: function(title){
        var attr = {
            title : title
        }
        return tags.insert(attr);
    },
    deletetitle: function(id){
        return tags.remove({_id:id});
    }

});