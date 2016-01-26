Session.set("img_con","");
Session.set("error_message","");
Template.categories.helpers({
  baseUrl: function(){
     return Session.get('baseurl');
   },
   getImage: function(id){
    var img = images.findOne({_id:id});
    if(img){
     console.log(img.copies.images.key);
     return img.copies.images.key;
    }else{
     return;
    }
  },
  postError:function(){
   var msg = Session.get("error_message");
   if( msg ) return true;
   else return false;
  },
  postErrormsg: function(){
   return Session.get("error_message");
  }
});
Template.categories.events({
    "click #save":function(event){
        event.preventDefault();
        var title = $("#title").val();
        var image = Session.get('ADDIMAGEID');
        //var image = $("#image").val();
      //  alert("test"+ title);
      var error_message = "";
    if( title == ""){
        error_message +="Please fill title name";
     return Session.set("error_message",error_message);
    }else{
      Session.set("error_message","");
      delete Session.keys['error_message'];
      var attr={
          title:title,
          image:image
      }
    Meteor.call('categories',attr);
    Router.go('/managecategories');
}
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
    "click #update":function(event,tpl){
        event.preventDefault();
        var id = this._id;
        var title = $("#title").val();
        var image = Session.get('ADDIMAGEID');
        var currentImage = $('#currentImage').val();

         var error_message = "";
         if( title == ""){            
             error_message +="Please fill title name";
            return Session.set("error_message",error_message);
          }else{
          Session.set("error_message","");
          delete Session.keys['error_message'];
         
          if(typeof image == "undefined")
            image = currentImage;
          Meteor.call('editcategories',id,title,image,function(error,result){
                if(error){
                    return Session.set("error_message",error); 
                }
                else{
                   Session.set('ADDIMAGEID',undefined); 
                   Router.go('/managecategories');
                }
            });
        }
    },
      "click #back":function(event,tpl){
        Session.set("error_message","");
        delete Session.keys['error_message'];
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
Template.updatecate.helpers({
     postError:function(){
       var msg = Session.get("error_message");
       if( msg ) return true;
       else return false;
      },
      postErrormsg: function(){
       return Session.get("error_message");
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