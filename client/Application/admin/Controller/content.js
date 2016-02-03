Session.setDefault('LAYOUT','');
Session.setDefault('tagId','');
Session.setDefault('text','');
Session.setDefault('text2','');
Session.setDefault("myimage",'');
Session.setDefault("catId","");
Session.set('img_pro','');

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
    getCatsname:function(){
        var allcats=Session.get('catId');
        allcats=allcats.split(';');
        catsjson=[];
        for(var i=0;i<allcats.length;i++){
            if(allcats[i]!=""){
                var catsname=categories.findOne({_id:allcats[i]});
                catsjson.push(catsname);
            }
       }
        //console.log('MYJSONTAGS:'+catsjson);
        return catsjson;
    },
	getImage: function(){
		var image = Session.get('ADDIMAGEID');
        var img = images.findOne({_id:image});
        if(img){
            //console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
    },
    haveImage: function(){
        var haveimage = Session.get('ADDIMAGEID');
        //console.log('img id:'+haveimage);
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
       
	'click #btn-content':function(e,tpl){
		e.preventDefault();
		var img = Session.get('ADDIMAGEID');
		var title = tpl.$('.title').val();
		var text = tpl.CKEDITOR.instances.editor1.getData();
		var text2 = tpl.$('.text2').val();
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
            
            if( title == '' )
                Bert.alert( 'title is required', 'danger', 'growl-top-right' );
            else if( text == '' )
                Bert.alert( 'text is required', 'danger', 'growl-top-right' );
            else if( layout == '' )
                Bert.alert( 'layout is required', 'danger', 'growl-top-right' );
            else if( catId == '' )
                Bert.alert( 'Category is required', 'danger', 'growl-top-right' );
        
        }else{
    	    //alert("hello"+layout);
            //Session.set("ADDIMAGEID","");
            delete Session.keys['ADDIMAGEID'];
            Session.set("tagId","");
            delete Session.keys['tagId'];
            Session.set("LAYOUT","");
            delete Session.keys['LAYOUT'];
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
            	Session.setPersistent('ADDIMAGEID', fileObj._id);
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
    'click .tag':function(e){
    	e.preventDefault();
    	var id = this._id;
        //var listTags;
        var Tags=Session.get("tagId");
       // console.log("tags "+Tags);
        if(Tags){
			
            if(!Tags.match(id)){
                var listTags=Session.get("tagId")+";"+id;
                Session.set("tagId",listTags);
            }else{
                //console.log("tag: "+Tags);
                Session.set("tagId",Tags);
            }
            
		}else{
			var listTags=id;
            Session.set("tagId",listTags);
		}
    	
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
        //console.log('array: '+result);
        var img = Session.get('ADDIMAGEID');
        var title = $('.title').val();
        var text = CKEDITOR.instances.editor1.getData();
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
         if(typeof img == "undefined" || title == "" || text == "" || layout == "" || catId == ""){
            
            if(typeof img == "undefined")
                Bert.alert( 'Images is required', 'danger', 'growl-top-right' );
            else if( title == '' )
                Bert.alert( 'title is required', 'danger', 'growl-top-right' );
            else if( text == '' )
                Bert.alert( 'text is required', 'danger', 'growl-top-right' );
            else if( layout == '' )
                Bert.alert( 'layout is required', 'danger', 'growl-top-right' );
            else if( catId == '' )
                Bert.alert( 'Category is required', 'danger', 'growl-top-right' );
            else 
                 Bert.alert( 'Please Check you input again', 'danger', 'growl-top-right' );
        
        }else{
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
            Session.set('text',text);
            Session.set('text2',text2);
            Session.set('PREVIEWS',result);
            //console.log("preview: "+JSON.stringify(Session.get('PREVIEWS')));
            Router.go('preview');
        }
    }
});

Template.disContent.helpers({
	getContent:function(){
            var loggedInUser = Meteor.user();
            var userId = Meteor.userId();
            var group = 'mygroup';
            if (Roles.userIsInRole(loggedInUser, ['Admin'], group)) {
                return content.find();
            }
            else if (Roles.userIsInRole(loggedInUser, ['member'], group)) { 
                return content.find({userId:userId});
            }
            else{
                return;
            }
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
	},
   // hastext:function()
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
		var text = CKEDITOR.instances.editor1.getData();
		var text2 = $('.text2').val();
		var catId = Session.get("catId");
        var currentImage = $('#currentImage').val();
               

        var oldCate = $('#oldCate').val();
        var oldLay = $('#oldLay').val();
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
        if( typeof layout == "undefined"){
            layout=oldLay;
        }
        
        if(title == "" || text == "" || layout == "" || catId == ""){
            if(title == "")
                Bert.alert( 'title is required', 'danger', 'growl-top-right' );
            else if(text=="")
                Bert.alert( 'text is required', 'danger', 'growl-top-right' );
            else if(catId == "")
                Bert.alert( 'Select Category is required!', 'danger', 'growl-top-right' );
            else
                Bert.alert( 'Select Layout is required!', 'danger', 'growl-top-right' );
            Session.set('page_msg',msg);
        }else{
           	Meteor.call("editContent",id,img,title,text,text2,catId,layout,tagsjson,function(error,result){
                if(error){
                    console.log("edit content has problem!!!")
                }else{
                    Bert.alert( 'Update Successful!', 'success', 'growl-top-right' );
                    Session.set("tagId","");
                    delete Session.keys['tagId'];
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
        //var listTags;
        var Tags=Session.get("tagId");
       // console.log("tags "+Tags);
        if(Tags){
            
            if(!Tags.match(id)){
                var listTags=Session.get("tagId")+";"+id;
                Session.set("tagId",listTags);
            }else{
                //console.log("tag: "+Tags);
                Session.set("tagId",Tags);
            }
            
        }else{
            var listTags=id;
            Session.set("tagId",listTags);
        }
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
        //console.log('img id:'+haveimage);
        if( haveimage )
            return true;
        else 
            return false;
    },
	getCategory:function(){
        return categories.find();
    },
    getcat_title:function(catId){
        var title = categories.findOne({_id:catId});
        return title.title;
    },
    gettags_titlel:function(tagId){
        var title = tags.findOne({_id:tagId});
        return title.title;
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
    getCatsname:function(){
        var allcats=Session.get('catId');
        allcats=allcats.split(';');
        catsjson=[];
        for(var i=0;i<allcats.length;i++){
            if(allcats[i]!=""){
                var catsname=categories.findOne({_id:allcats[i]});
                catsjson.push(catsname);
            }
        }
        //console.log('MYJSONTAGS:'+catsjson);
        return catsjson;
    },
    iscatId:function(){
        var allcats=Session.get('catId');
        if(allcats)
            return true;
        else
            return false;
    },
    istagId:function(){
        var istagId = Session.get('tagId');
        if(istagId)
            return true;
        else
            return false
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
