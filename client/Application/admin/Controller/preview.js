Template.preview.helpers({
   /* getPreview:function(){
        var allprev = Session.get('PREVIEWS');
        return allprev;
    },*/
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
    relateContent:function(){
        var id = this.catId;
       // console.log(" catId "+catId);

        var items = content.find({catId:id}, {sort: {createdAt: -1}}).fetch();
        return items.slice(1,3);
    },
    getImageRelated:function(image){
        var img = images.findOne({_id:image});
        if(img){
            //console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
    },
    getLayout1: function(){
        var allprev = Session.get('PREVIEWS');
        console.log("preview: "+JSON.stringify(Session.get('PREVIEWS')));
        //console.log("Display :"+allprev);
        var data;
        allprev.forEach(function(da){
            if(da.layout==1){
                data = allprev;
            }
        });
        return data;
        
    },
    getLayout2: function(){
        var allprev = Session.get('PREVIEWS');
        var data;
        allprev.forEach(function(da){
            if(da.layout==2){
                data = allprev;
            }
        });
        return data;
    },
    getLayout3: function(){
        var allprev = Session.get('PREVIEWS');
        var data;
        allprev.forEach(function(da){
            if(da.layout==3){
                data = allprev;
            }
        });
        return data;
    }

}); 
Template.preview.events({
    'click #addContent':function(e,tpl){
        e.preventDefault();
        var title = tpl.$('.title').text();
        var text = tpl.$('.text1').text();
        var text2 = tpl.$('.text2').text();
        var img = Session.get('ADDIMAGEID');
        var catId = Session.get("catId");
        var layout = Session.get("LAYOUT");
        var alltags=Session.get('tagId');
        //alert('ok: '+image);
        var msg="";
        alltags=alltags.split(';');
        tagsjson=[];
        for(var i=0;i<alltags.length;i++){
            if(alltags[i]!=""){
                tagsjson.push(alltags[i]);
            }
        }
        
        Meteor.call('addContent',img,title,text,text2,catId,layout,tagsjson);  
        alert('Success '); 
        Router.go('/managecontent');
        
    }
});