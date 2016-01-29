 Meteor.methods({
   registerUser:function(username,fname,lname,pays,ville,email,password){
    var myroles = "member";
    targetUserId=Accounts.createUser({
    	profile:{
        username:username,
        firstname:fname,
        lastname:lname,
        pays:pays,
        ville:ville
      },
        email: email,
        password: password
       });
    Roles.setUserRoles(targetUserId,myroles);
   }
});
Meteor.methods({
    addUser:function(username,fname,lname,pays,ville,email,password,mySelect){
        targetUserId=Accounts.createUser({
            email: email,
            password: password,
            profile:{
              username:username,
              firstname:fname,
              lastname:lname,
              pays:pays,
              ville:ville
            }
       });
    Roles.setUserRoles(targetUserId, [mySelect])
   },
   deleteUser: function (id) {
      return Meteor.users.remove(id);
   }
});
// update user
Meteor.methods({
    updateroles:function(id,mySelect){
        var attr=[mySelect];
        return Meteor.users.update({_id:id},{$set:{roles:attr}});
    },
    edituser: function(id,username,fname,lname,pays,ville,email) {
        var attr={
            emails:[{address: email,verified: "false"}],
            profile:{
              username:username,
              firstname:fname,
              lastname:lname,
              pays:pays,
              ville:ville
            }
        }
        return Meteor.users.update({_id:id},{$set: attr});
        //return Meteor.users.update(id,{$set: {profile:attr}});
    }
});