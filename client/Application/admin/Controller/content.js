Session.setDefault('LAYOUT','');
Session.set('tagId','');
Session.setDefault('text','');
Session.setDefault('text2','');
Session.setDefault("myimage",'');
Session.setDefault("catId","");
Session.setDefault("currentClass","");
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
    },
    tolow:function(title){
        var convertowercase = title.toLowerCase();
        return convertowercase;
    },
    // add by chien

    getClass:function(_id){
        var id = _id;
        var SessionId = Session.get('currentClass');
        //alert(SessionId);
        var cl = categories.findOne({_id:id});
        console.log("styleclass is"+cl.title);
        var css = cl.title.toLowerCase();
        if(id == SessionId){
            return css;
        }else{
            return;
        }
    }
});
Template.addContent.events({
    // 'keypress .title': function(event,tpl) {
    //     var title = tpl.$('.title').val();
    //     if (title.length > 70) {
    //         Bert.alert( 'Title length should less than 70!', 'danger', 'growl-top-right' );
    //         event.stopPropagation();
    //         return false;
    //     }
    // },
    'click #btn-content':function(e,tpl){
        e.preventDefault();
        var img = Session.get('ADDIMAGEID');
        var title = tpl.$('.title').val();
        //var text = tpl.CKEDITOR.instances.editor1.getData();
        var text = tpl.$('#editor1').val();
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
        if(typeof img == "undefined" || title == "" || text == "" || text2 == "" || catId == "" || alltags == "" || layout == ""){
            if(typeof img == "undefined")
                Bert.alert( 'Images is required', 'danger', 'growl-top-right' );
            else if( title == '' )
                Bert.alert( 'title is required', 'danger', 'growl-top-right' );
            else if( text == '' )
                Bert.alert( 'text is required', 'danger', 'growl-top-right' );
            else if( text2 == '' )
                Bert.alert( 'text is required', 'danger', 'growl-top-right' );
            else if( catId == '' )
                Bert.alert( 'Category is required', 'danger', 'growl-top-right' );
            else if( alltags == '' )
                Bert.alert( 'Tag is required', 'danger', 'growl-top-right' );
            else if( layout == '' )
                Bert.alert( 'layout is required', 'danger', 'growl-top-right' );
            else 
                 Bert.alert( 'Please Check you input again', 'danger', 'growl-top-right' );
        }else{
            //alert("hello"+layout);
            Session.set("ADDIMAGEID","");
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
            	Session.set('ADDIMAGEID', fileObj._id);
          	});
        }
    },
    'click .cate':function(e,tpl){
    	e.preventDefault();
        Session.set('currentClass',this._id);
        //$(".cate").css("background-color:white");
       // $(e.currentTarget).css("background-color:red");
    	var id = this._id;
    	Session.set("catId",id);
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
    'click #preview':function(e,tpl){
        e.preventDefault();
        //alert("bong nhom sur 1");
        var result = [];
        //console.log('array: '+result);
        var img = Session.get('ADDIMAGEID');
        var title = $('.title').val();
        //var text = CKEDITOR.instances.editor1.getData();
        var text = tpl.$('#editor1').val();
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
         if(typeof img == "undefined" || title == "" || text == "" || text2 == "" || catId == "" || layout == ""){
            
            if(typeof img == "undefined")
                Bert.alert( 'Images is required', 'danger', 'growl-top-right' );
            else if( title == '' )
                Bert.alert( 'title is required', 'danger', 'growl-top-right' );
            else if( text == '' )
                Bert.alert( 'text is required', 'danger', 'growl-top-right' );
            else if( text2 == '' )
                Bert.alert( 'text is required', 'danger', 'growl-top-right' );
            else if( catId == '' )
                Bert.alert( 'Category is required', 'danger', 'growl-top-right' );
             else if( layout == '' )
                Bert.alert( 'layout is required', 'danger', 'growl-top-right' );
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
            console.log("preview: "+JSON.stringify(Session.get('PREVIEWS')));
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
    getStatus:function(status){
        html='';
        if(status==1){
            return "accept" 
        }else{
            return "pending"
        }
    }
   // hastext:function()
});
Template.disContent.events({
    "click #remove-con":function(e){
        e.preventDefault();
        var id = this._id;
        if (confirm("Are you sure you want to delete this?")) {
            Meteor.call("removeContent",id);
        }
    },
    "click #onpending":function(e){
        e.preventDefault();
        var curId=$(e.currentTarget).attr('data-id');
        //$(e.currentTarget).setAttribute("id", "onaccept");
        var status=1;
        Meteor.call("updateStatus",curId,status,function(err){
            if(err){
                 console.log("Error update status");
            }else {
                console.log("success update")
                //this.setAttribute("id", "onaccept");
                $(e.currentTarget).attr('id', 'onaccept');
            }
        })
    },
    "click #onaccept":function(e){
        e.preventDefault();
        var curId=$(e.currentTarget).attr('data-id');
        var status=0;
        Meteor.call("updateStatus",curId,status,function(err){
            if(err){
                 console.log("Error update status");
            }else {
                console.log("success update")
                //this.setAttribute("id", "onaccept");
                $(e.currentTarget).attr('id', 'onpending');
            }
        })
    }
});

Template.editContent.onRendered(function () {
    //var idContent=Router.current().params._id;
    //.log('idContent:'+idContent);
    /*Session.set('ROUTERTAG', );
    var myContent=content.findOne({"_id":idContent});
    alert('CATEGORY IS '+myContent.catId);
    Session.set('catId',myContent.catId);
    Session.set('LAYOUT',myContent.layout);
    var i;
    var arr = [];
    for (i=0;i<myContent.tags.length;i++){
        console.log(" tag "+myContent.tags[i]);
        arr.push(myContent.tags[i]);
    }
    Session.set('tagjson',arr);
    console.log("tagjson arr "+Session.get('tagjson'));
    */
});

Template.editContent.events({
    'click #btn-content':function(e){
        e.preventDefault();
        var id = this._id;
        var img = Session.get('ADDIMAGEID');
        var title = $('.title').val();
        var text = $('#editor1').val();
        var text2 =$('.text2').val();
        var catId = Session.get("catId");
        var currentImage = $('#currentImage').val();
        var oldCate = $('#oldCate').val();
        // var layout = $('#oldLay').val();
        var layout = Session.get("LAYOUT");

        //alert('pisey id:'+id +', img:'+img +', title:'+title +' ,catId'+catId +', currentImage:'+currentImage +', old cat:'+oldCate +', layout:'+layout);
        // alert(" my layout "+layout+" old "+oldLay);
        /*var alltags=Session.get('tagId');
        var msg="";
        tagsjson=[];
        if(typeof alltags !="undefined"){
            alltags=alltags.split(';');
            for(var i=0;i<alltags.length;i++){
                if(alltags[i]!=""){
                    tagsjson.push(alltags[i]);
                }
            }
        }else{
            var arrr = Session.get('tagjson');
            alert("arrr "+arrr);
            console.log("arrr "+arrr);
            tagsjson = arrr;
        }*/
        var tagsjson = [];
        $('ul.list-inline li').each( function () {
            if( typeof $(this).attr('data-id') !="undefined" ){
                tagsjson.push($(this).attr('data-id'))
            }
        })
        if(typeof img == "undefined"){
            img = currentImage;
        }
        if(typeof catId == "undefined"){
            catId=oldCate;
        }
        // if( typeof layout == "undefined"){
        //     layout=oldLay;
        // }
        console.log(tagsjson);
        if(title == "" || text == "" || layout == ""){
            if(title == "")
                Bert.alert( 'title is required', 'danger', 'growl-top-right' );
            else if(text=="")
                Bert.alert( 'text is required', 'danger', 'growl-top-right' );
            else
                Bert.alert( 'Select Layout is required!', 'danger', 'growl-top-right' );
            Session.set('page_msg',msg);
        }else{
        
            Meteor.call("editContent",id,img,title,text,text2,catId,layout,tagsjson,function(error,result){
                if(error){
                    console.log("edit content has problem!!!"+error.reason())
                }else{
                
                    /*Bert.alert( 'Update Successful!', 'success', 'growl-top-right' );
                    Session.set("tagId","");
                    delete Session.keys['tagId'];
                    Session.set('ADDIMAGEID',undefined);
                    Session.set('catId',undefined);*/
                    Session.set('tagId','');
                    Router.go('/managecontent');
                }
            });
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
                Session.set('ADDIMAGEID', fileObj._id);
            });
        }
    },
    'click .cate':function(e){
        e.preventDefault();
        Session.set('currentClass',this._id);
        Session.set("setDefault","");
        //$(".cate").css("background-color:white");
       // $(e.currentTarget).css("background-color:red");
        var id = this._id;
        Session.set("catId",id);
    },
    'click #tag':function(e){
        e.preventDefault();
        var id = this._id;

        var Tags = Session.get("tagId");
        var exist = false;
        $('ul.list-inline li').each( function(){
            if( $(this).attr('data-id') == id ){
                exist = true;
            }
        });
        if( exist != true ){
            var listTags = ( Tags !="" )? Tags+";"+id:id;
            Session.set("tagId",listTags);
        }
        
        /*
        if(Tags){
            d
            if(!Tags.match(id)){
                var listTags=Tags+";"+id;
                Session.set("tagId",listTags);
            }else{
                //console.log("tag: "+Tags);
                Session.set("tagId",Tags);
            }
            
        }else{
            var listTags=id;
            Session.set("tagId",listTags);
        }*/
        console.log(Session.get("tagId"));

    },
    'click .remove':function(e){
        e.preventDefault();
        $(e.currentTarget).parent().remove();
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
	getCategory:function(catId){
    Session.set("classtoUpdate",catId);
    return categories.find({});
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
    currentLayout:function (num, currentLayout) {
        if( num == currentLayout) return 'img-lay';
        else return;
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
    },
    getTagList: function(){
        var idContent = this._id;
        var myContent = content.findOne({_id:idContent});
       
        var arr = [];
      
        if( typeof myContent != 'undefined'){
            Session.set('catId',myContent.catId);
            Session.set('LAYOUT',myContent.layout);
            if( typeof myContent.taglist != 'undefined'){
                
                var tag = myContent.taglist;
                if( tag.length > 0 ){
                    for (var i=0; i< tag.length ;i++){
                        arr.push({id:tag[i]});
                    }
                }
            }
        }
        
        var selectTag = Session.get('tagId');
        console.log(selectTag);
        if( selectTag != "" ){
            var mytag = selectTag.split(';');
            for (var i=0; i<mytag.length; i++){
                arr.push({id:mytag[i]});
            }
        }
        
        //Session.set('tagjson',arr); 
        if( arr.length > 0) return arr;
        else return;   
        
    },
    getmyTagName: function ( tagid ) {
        if( tagid != "" ){
            var tag = tags.findOne({_id:tagid});
            return tag.title;
        }else return;
    },
    tolow:function(title){
        var convertowercase = title.toLowerCase();
        return convertowercase;
    },
    // add by chien

    getUpClass:function(id){

        var cl = categories.findOne({_id:id});
        console.log("styleclass is"+cl.title);

        return cl.title.toLowerCase();
    },
    getUpCatTitle:function(id){
        var cl = categories.findOne({_id:id});
        return cl.title;
        
        
    },
    getClass:function(_id){
        var id = _id;
        var SessionId = Session.get('currentClass');
        var catId = Session.get('setDefault');
        // alert(catId);
        //alert(SessionId);
        var cl = categories.findOne({_id:id});
        console.log("styleclass is"+cl.title);
        var css = cl.title.toLowerCase();
        if(id == catId)
        return css;
        else if(id == SessionId)
        return css;
        else
        return;
    },
    setforDefault:function(catId){
        if(catId != ""){
            Session.set("setDefault",catId);
        }
    }
});
Template.editContent.oncreate=function(){
     var image = $('#currentImage').val();
    Session.set("myimage",image);
}
