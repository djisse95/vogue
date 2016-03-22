var IR_BeforeHooks = {
    isAdmin: function(pause) {
      console.log('djib hook');   
        if (!Roles.userIsInRole(Meteor.userId(), ['Admin'])) {
          this.render('login');
          pause();
        }else{
          this.next();
        }
    },
    isAdminOrMember:function(pause){
      if (!Roles.userIsInRole(Meteor.userId(), ['Admin','member'])) {
          this.render('login');
          pause();
      }else{
          this.next();
      }
    }
}
var routerNameAdmin=[
  
  'categories',
  'managecategories',
  "manageuser",
  "tags"
];
var routerNameMember=[
  '/',
  "login",
  "register",
  'addContent',
  'disContent',
  'editContent'
];
Router.before(IR_BeforeHooks.isAdmin, {only:routerNameAdmin});//for admin
Router.before(IR_BeforeHooks.isAdminOrMember, {only:routerNameMember});//for member
