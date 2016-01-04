
Template.categories.events({
    "click #save":function(event){
        event.preventDefault();
        var title = $("#title").val();
        var image = Session.get('ADDIMAGEID');
        //var image = $("#image").val();
        alert("test"+ title);
    Meteor.call('categories',title,image);
    },
    'change #upload': function(event, template) {
        var files = event.target.files;
        for (var i = 0, ln = files.length; i < ln; i++) {
          images.insert(files[i], function (err, fileObj) {
            // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
            console.log(fileObj._id);
            Session.set('ADDIMAGEID', fileObj._id);
          });
        }
    }
});
Template.discategories.helpers({
    discate : function(){
        return categories.find();
    },
     getImage: function(image){
        //var id = this.imgId;
        //console.log('MyimageId:' + id);
        var img = images.findOne({_id:image});
        if(img){
            console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
    }
});
//=========== update ============= //

Template.updatecate.events({
    "click #update":function(event){
        event.preventDefault();
        var id = this._id;
        var title = $("#title").val();
        var image = Session.get('ADDIMAGEID');
        var currentImage = $('#currentImage').val();
        if(typeof image == "undefined"){
            image = currentImage;
        }
        Meteor.call('editcategories',id,title,image,function(error,result){
            if(error){}
            else{
               Session.set('ADDIMAGEID',undefined); 
               Router.go('/managecategories');
            }
        });
    },
    'change #upload': function(event, template) {
        var files = event.target.files;
        for (var i = 0, ln = files.length; i < ln; i++) {
            images.insert(files[i], function (err, fileObj) {
            // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
            console.log(fileObj._id);
            Session.set('ADDIMAGEID', fileObj._id);
          });
        }
    }
});
Template.discategories.events({
    'click #delete':function(){
        var id = this._id;
        if (confirm("Are you sure you want to delete this?")) {
            Meteor.call('deletecate',id);
        }
    }
});