Router.configure({
    layoutTemplate: 'MainLayout'
});
Router.route('/', {
    name: 'home'
    /*,
    waitOn: function () {
        return [Meteor.subscribe('content'),Meteor.subscribe('categories')];
    },
    data:function(){
        var items = content.find({}).fetch();
        Session.set('nb_contents',items.length);
        var contentsToDisplay=[];
        var currentPage=Session.get('currentPage');
        var sizePage=12;
        var nbPage=Math.trunc(items.length/sizePage);

        if(items.length%sizePage > 0){
            nbPage=nbPage+1;
        }
        var arr=[];
        for(var i=0;i<nbPage;i++)
            arr[i]=i+1;

        //console.log('nombre de page:'+nbPage);
        //console.log(Session.get('arrayPage'));
        //console.log('CURRENT PAGE:'+Session.get('currentPage'));

        Session.set('arrayPage',arr);
        var start=currentPage*sizePage;
        var end=start+sizePage;
        if(end>items.length)
            end=items.length;
        for(var i=start,j=0;i<end;i++,j++)
            contentsToDisplay[j]=items[i];

        return {"myitems":contentsToDisplay};
    }*/
});
Router.route('/category/:_id', {
    name: 'list',
    data:function(){
        Session.set("NUM-PAGE",1);
        var num = 1;
        $(".count-num").html(num);
        return categories.findOne({_id:this.params._id});
    }
    /*,
    waitOn: function () {
        return [Meteor.subscribe('content'),Meteor.subscribe('categories')];
    },
    data:function(){

        /*var catId = Session.get("categoriesId");
        console.log('category:'+catId);*/
       /*
        var items = content.find({catId:this.params._id}).fetch();
        Session.set('nb_contents',items.length);
        var contentsToDisplay=[];
        var currentPage=Session.get('currentPage');
        var sizePage=12;

        var nbPage=Math.trunc(items.length/sizePage);

        
        if(items.length%sizePage > 0){
            nbPage=nbPage+1;
           
        }
        var arr=[];
        for(var i=0;i<nbPage;i++)
            arr[i]=i+1;


        Session.set('CATID', catid);
        // console.log('nombre de page:'+nbPage);
        // console.log(Session.get('arrayPage'));
        // console.log('CURRENT PAGE:'+Session.get('currentPage'));
        Session.set('arrayPage',arr);
        console.log("arrayPage "+arr);
        var start=currentPage*sizePage;
        console.log("CURRENT-PAGE="+currentPage);
        var end=start+sizePage;
        if(end>items.length)
            end=items.length;
        for(var i=start,j=0;i<end;i++,j++)
            contentsToDisplay[j]=items[i];
        var sesscatId = Session.get('CATID');
        var catid = this.params._id;

        if( sesscatId ){
            if( sesscatId != catid ){ 
                Session.set('currentPage',0);
                Session.set('arrayPage', arr);
            }
        }
      
        //Session.set('currentPage',0);
        return {"myitems":contentsToDisplay};
    }*/  
});
/*Router.route('/list', {
    name: 'list',
    waitOn: function () {
        return [Meteor.subscribe('content'),Meteor.subscribe('categories')];
    },
    data:function(){

        var catId = Session.get("categoriesId");
        console.log('category:'+catId);
        var items = content.find({catId:catId}).fetch();
        Session.set('nb_contents',items.length);
        var contentsToDisplay=[];
        var currentPage=Session.get('currentPage');
        var sizePage=12;

        var nbPage=Math.trunc(items.length/sizePage);
        if(items.length%sizePage>0)
            nbPage=nbPage+1;
        var arr=[];
        for(var i=0;i<nbPage;i++)
            arr[i]=i+1;
        console.log('nombre de page:'+nbPage);
        console.log(Session.get('arrayPage'));
        console.log('CURRENT PAGE:'+Session.get('currentPage'));
        Session.set('arrayPage',arr);

        var start=currentPage*sizePage;
        var end=start+sizePage;
        if(end>items.length)
            end=items.length;
        for(var i=start,j=0;i<end;i++,j++)
            contentsToDisplay[j]=items[i];

        return {"myitems":contentsToDisplay};
    }
    
});*/
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