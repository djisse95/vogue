Session.setDefault('LAYOUT','');
Session.setDefault('tagId','');
Session.setDefault("myimage",'');
Session.setDefault("catId","");
Session.set('img_pro','');
Session.set("PostError", "" );
Session.set('page_msg',"");

Template.addContent.helpers({
	getCategory:function(){
		return categories.find();
	},
	gettags:function(){
		return tags.find({});
	},
	getTagsname:function(){
		var alltags=Session.get('tagId');
        alltags=alltags.split(';');
        tagsjson=[];
        for(var i=0;i<alltags.length;i++){
        	if(alltags[i]!=""){
        		var tagsname=tags.findOne({_id:alltags[i]});
            	tagsjson.push(tagsname);
        	}
       }
        //console.log('MYJSONTAGS:'+tagsjson);
        return tagsjson;
	},
	getImage: function(){
		var image = Session.get('ADDIMAGEID');
        var img = images.findOne({_id:image});
        if(img){
            console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
    },
    haveImage: function(){
        var haveimage = Session.get('ADDIMAGEID');
        console.log('img id:'+haveimage);
        if( haveimage )
            return true;
        else 
            return false;
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
Template.addContent.events({
	'click #btn-content':function(e){
		e.preventDefault();
		var img = Session.get('ADDIMAGEID');
		var title = $('.title').val();
		var text = $('#editor1').val();
        //var text = $('.title').ckeditor();
		var text2 = $('.text2').val();
		var catId = Session.get("catId");
		var layout = Session.get("LAYOUT");
		var alltags=Session.get('tagId');
        var msg="";
        alltags=alltags.split(';');
        tagsjson=[];
        for(var i=0;i<alltags.length;i++){
        	if(alltags[i]!=""){
            	tagsjson.push(alltags[i]);
        	}
       	}
        if(title == "" || text == "" || layout == "" || catId == ""){
            if(title == "")
                msg+= "Title is required! ";
            if(text == "")
                msg+=" Text is required!";
            if(layout == "")
                msg+=" Select Layout is required!";
            if(catId == "")
                msg+=" Select Category is required!";

            Session.set("PostError", msg );
            Session.set('page_msg',msg);
        }else{
    	    //alert("hello"+layout);
    		Meteor.call('addContent',img,title,text,text2,catId,layout,tagsjson);	
    		Router.go('/managecontent');
		}
	},
    'keypress input': function(event) {
        event = event || window.event;
        var keyCode = event.which || event.keyCode;
        Session.set("PostError","");
        Session.set("page_msg","");
    },
	'change #img': function(event, template) {
        var files = event.target.files;
        for (var i = 0, ln = files.length; i < ln; i++) {
          	images.insert(files[i], function (err, fileObj) {
	            // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
            	Session.set('ADDIMAGEID', fileObj._id);
          	});
        }
    },
    'click #cate':function(e,tpl){
    	e.preventDefault();
        $("#cate").css("background-color:white");
        $(e.currentTarget).css("background-color:red");
    	var id = this._id;
    	Session.set("catId",id);
        $("#wrapper").addClass('app');
    },
    'click #tag':function(e){
    	e.preventDefault();
    	var id = this._id;
		if(Session.get("tagId")){
			var listTags=Session.get("tagId")+";"+id;
		}else{
			var listTags=id;
		}
    	Session.set("tagId",listTags);
    },
    'click #remove':function(e){
		e.preventDefault();
		var alltags = Session.get('tagId');
		var id = this._id;
		var resl = alltags.replace(id, ""); 
		Session.set("tagId", resl);	
    },
    'click #layout1':function(e){
    	e.preventDefault();
    	Session.set('LAYOUT',1);
        $(".lay1").addClass('img-lay');
        $(".lay2").removeClass('img-lay');
        $(".lay3").removeClass('img-lay');
    },
    'click #layout2':function(e){
    	e.preventDefault();
    	Session.set('LAYOUT',2);
        $(".lay2").addClass('img-lay');
        $(".lay1").removeClass('img-lay');
        $(".lay3").removeClass('img-lay');
    },
    'click #layout3':function(e){
        e.preventDefault();
        Session.set('LAYOUT',3);
        $(".lay3").addClass('img-lay');
        $(".lay2").removeClass('img-lay');
        $(".lay1").removeClass('img-lay');
    },
    'click #preview':function(e){
        e.preventDefault();
        var result = [];
        console.log('array: '+result);
        var img = Session.get('ADDIMAGEID');
        var title = $('.title').val();
        var text = $('.text').val();
        var text2 = $('.text2').val();
        var catId = Session.get("catId");
        var layout = Session.get("LAYOUT");
        var alltags=Session.get('tagId');
            alltags=alltags.split(';');
        tagsjson=[];
        for(var i=0;i<alltags.length;i++){
            if(alltags[i]!=""){
                tagsjson.push(alltags[i]);
            }
        }

        var obj = {
            img:img,
            title:title,
            text:text,
            text2:text2,
            catId:catId,
            layout:layout,
            alltags:tagsjson
        }
        result.push(obj);
        Session.set('PREVIEWS',result);
        console.log("preview: "+JSON.stringify(Session.get('PREVIEWS')));
        Router.go('preview');

    }
});

Template.disContent.helpers({
	getContent:function(){
		return content.find();
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
Template.disContent.events({
    "click #remove-con":function(e){
        e.preventDefault();
        var id = this._id;
        if (confirm("Are you sure you want to delete this?")) {
            Meteor.call("removeContent",id);
        }
    }
});

Template.editContent.events({
	'click #btn-content':function(e){
		e.preventDefault();
		var id = this._id;
		var img = Session.get('ADDIMAGEID');
		var title = $('.title').val();
		var text = $('#editor1').val();
		var text2 = $('.text2').val();
		var catId = Session.get("catId");
        var currentImage = $('#currentImage').val();
        var oldCate = $('#oldCate').val();
        var layout = Session.get("LAYOUT");
        var alltags=Session.get('tagId');
        var msg="";
        alltags=alltags.split(';');
        tagsjson=[];
        for(var i=0;i<alltags.length;i++){
        	if(alltags[i]!=""){
            	tagsjson.push(alltags[i]);
        	}
       	}
        if(typeof img == "undefined"){
            img = currentImage;
        }
        if(typeof catId == "undefined"){
            catId=oldCate;
        }
        if(title == "" || text == "" || layout == "" || catId == ""){
            if(title == "")
                msg+= "Title is required! ";
            if(text=="")
                msg+=" Text is required!";
            if(layout == "")
                msg+=" Select Layout is required!";
            if(catId == "")
                msg+=" Select Category is required!";

            Session.set("PostError", msg );
            Session.set('page_msg',msg);
        }else{
        //alert(layout);
           	Meteor.call("editContent",id,img,title,text,text2,catId,layout,tagsjson,function(error,result){
                if(error){
                    console.log("edit content has problem!!!")
                }else{
                    Session.set('ADDIMAGEID',undefined);
                    Session.set('catId',undefined);
                    Router.go('/managecontent');
                }
            });
        }
	},
    'keypress input': function(event) {
        event = event || window.event;
        var keyCode = event.which || event.keyCode;
        Session.set("PostError","");
        Session.set("page_msg","");
    },
	'change #img': function(event, template) {
        var files = event.target.files;
        for (var i = 0, ln = files.length; i < ln; i++) {
          	images.insert(files[i], function (err, fileObj) {
	            Session.set('ADDIMAGEID', fileObj._id);
          	});
        }
    },
    'click #cate':function(e){
    	e.preventDefault();
    	var id = this._id;
    	Session.set("catId",id);
    	$('#cate').css('.active');
    },
    'click #tag':function(e){
    	e.preventDefault();
    	var id = this._id;
		if(Session.get("tagId")){
			var listTags=Session.get("tagId")+";"+id;
		}else{
			var listTags=id;
		}
    	Session.set("tagId",listTags);
    },
    'click #remove':function(e){
		e.preventDefault();
		var alltags = Session.get('tagId');
		var id = this._id;
		var resl = alltags.replace(id, ""); 
		Session.set("tagId", resl);	
    },
    'click #layout1':function(e){
    	e.preventDefault();
    	Session.set('LAYOUT',1);
        $(".lay1").addClass('img-lay');
        $(".lay2").removeClass('img-lay');
        $(".lay3").removeClass('img-lay');
    },
    'click #layout2':function(e){
    	e.preventDefault();
    	Session.set('LAYOUT',2);
        $(".lay2").addClass('img-lay');
        $(".lay1").removeClass('img-lay');
        $(".lay3").removeClass('img-lay');
    },
    'click #layout3':function(e){
        e.preventDefault();
        Session.set('LAYOUT',3);
        e.preventDefault();
        Session.set('LAYOUT',3);
        $(".lay3").addClass('img-lay');
        $(".lay2").removeClass('img-lay');
        $(".lay1").removeClass('img-lay');
    }
});
Template.editContent.helpers({
    getImage:function(){
        var image = Session.get('ADDIMAGEID');
        var img = images.findOne({_id:image});
        if(img){
            console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
    },
    getcatimageId: function(imageId){
       // var catimageId = Session.get('ADDIMAGEID');
        var img = images.findOne({_id:imageId});
        return img.copies.images.key;
    },
    haveImage: function(){
        var haveimage = Session.get('ADDIMAGEID');
        //var img = images.findOne({_id:image});
        console.log('img id:'+haveimage);
        if( haveimage )
            return true;
        else 
            return false;
    },
	getCategory:function(){
        return categories.find();
    },
    gettags:function(){
        return tags.find();
    },
    getTagsname:function(){
		var alltags=Session.get('tagId');
        alltags=alltags.split(';');
        tagsjson=[];
        for(var i=0;i<alltags.length;i++){
        	if(alltags[i]!=""){
        		var tagsname=tags.findOne({_id:alltags[i]});
            	tagsjson.push(tagsname);
        	}
       }
        //console.log('MYJSONTAGS:'+tagsjson);
        return tagsjson;
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
Template.editContent.oncreate=function(){
     var image = $('#currentImage').val();
    Session.set("myimage",image);
}
