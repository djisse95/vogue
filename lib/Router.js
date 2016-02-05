Router.configure({
    layoutTemplate: 'MainLayout',
    loadingTemplate: 'loading',
    onAfterAction: function(){
        if (Meteor.isClient)
            window.scrollTo(0, 0);
    }

});
Router.route('/', {
    name: 'home'
});
Router.route('/category/:_id', {
    name: 'list',
    data:function(){
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
    data:function(){
        return content.findOne({_id: this.params._id});
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