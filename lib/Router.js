Router.configure({
    layoutTemplate: 'MainLayout',
    loadingTemplate: 'loading',
    onAfterAction: function(){
        if (Meteor.isClient)
            window.scrollTo(0, 0);
    },
     onStop: function() {
        $(".close").click();
    }

});
Router.route('/', {
    name: 'home',
    data:function(){
        $('.hold_swiper').show();
        return;
    }
});
Router.route('/category/:_id', {
    name: 'list',
    data:function(){
        $('.hold_swiper').show();
        Session.set("NUM-PAGE",1);
        var num = 1;
        $(".count-num").html(num);
        return categories.findOne({_id:this.params._id});
    }  
});
// ============== Categories ================
Router.route('/categories', {
    name: 'categories'
});
Router.route('/managecategories', {
    name: 'discategories'
});
Router.route('/updatecate/:_id',{
    name:'updatecate',
    data:function(){
        return categories.findOne({_id: this.params._id});
    }
});
// ================== user =====================
Router.route('/login', {
    name: 'login'
});
Router.route('/register', {
    name: 'register'
});
//=========== Search ============= //
Router.route('/search', {
    name: 'searchBox'
});
// =========== Mange User ============== //
Router.route('/manageuser', {
    name: 'manageuser'
});
Router.route('/edituser/:_id', {
    name: 'edituser',
    data: function(){
        return Meteor.users.findOne({_id: this.params._id});
    }
});
Router.route('/tags', {
    name: 'tags'
});
Router.route('/addContent', {
    name: 'addContent'
});
Router.route('/managecontent', {
    name: 'disContent'
});
Router.route('/editContent/:_id', {
    name: 'editContent',
    data: function(){
        return content.findOne({_id: this.params._id});
    }
});
Router.route('/contentslide', {
    name: 'contentslide'
});
Router.route('/mycontent', {
    name: 'disContentByUser'
});
Router.route('/contentdetail/:_id', {
    name: 'contentdetail',
    waitOn:function(){
        return [Meteor.subscribe('content')];
    },
    data:function(){
        $('.hold_swiper').hide();
        return content.findOne({_id: this.params._id});
    },
    onAfterAction: function() {
        var content =  this.data();
        if (!Meteor.isClient) {
            return;
        }
        var imgId = content.imageId;
        var img = images.findOne({_id:imgId});
        if(img){
            var imgPath = img.copies.images.key;
        }
        var desc = content.description.text1.replace(/(\<[^\>]*\>)|(\&nbsp\;)|(\\n)/g, "");
        if (desc.length > 160) {
            desc = desc.trim().substring(0, 160).split(" ").slice(0, -1).join(" ") + "…";
        } else {
            desc = desc.trim().substring(0, desc.length);
        }
        SEO.set({
            title: content.title + " | Zibamode",
            meta: {
                'description': desc
            },
            og: {
                'title': content.title + " | Zibamode",
                'description': desc,
                'image':Meteor.absoluteUrl()+'upload/'+imgPath
            }
        });
    }
});


Router.route('/preview',{
  name:"preview"
 });
Router.route('/preview/first',{
    name:"first"
});
Router.route('/preview/second',{
    name:"second"
});