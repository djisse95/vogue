Template.contentdetail.helpers({
    getImage:function(id){
        var img = images.findOne({_id:id});
        if(img){
            //console.log(img.copies.images.key);
            return img.copies.images.key;
        }else{
            return;
        }
    },
    relateContent:function(cId){
        // console.log(" c id "+cId);
        var id = this.catId;
        var items = content.find({_id:{$ne:cId}},{catId:id},{sort: {createdAt: -1}}).fetch();
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
        var layout = this.layout;
        var id = this._id;
        console.log("Display :"+layout);
        if(layout==1){
            return content.findOne({_id:id});
        }
    },
    getLayout2: function(){
        var layout = this.layout;
        var id = this._id;
        console.log("Display :"+layout);
        if(layout==2){
            return content.findOne({_id:id});
        }
    },
    getLayout3: function(){
        var layout = this.layout;
        var id = this._id;
        console.log("Display :"+layout);
        if(layout==3){
            return content.findOne({_id:id});
        }
    }

});
Template.contentslide.render = function(){
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: false,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 3000,
        autoplayDisableOnInteraction: false
    });
}