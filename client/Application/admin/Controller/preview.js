Template.preview.helpers({
    getPreview:function(){
        var allprev = Session.get('PREVIEWS');
        return allprev;
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
    }
}); 
