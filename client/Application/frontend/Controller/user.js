Template.login.events({
    'click #login': function(event){
        event.preventDefault();
        var email1 = $('[name=email1]').val();
        var password1 = $('[name=password1]').val();
        alert('!!! '+email1+password1);
        Meteor.loginWithPassword(email1, password1, function(error){
            if(error){
                // alert('!!! Your Email & Password is not Match');
            }else{
                Router.go('/beauty');
            }
        }); 
    },
    'click #register': function(event){
        event.preventDefault();
        var username = $('#username').val();
        var fname= $('[name=firstname]').val();
        var lname = $('[name=lastname]').val();
        var pays = $('[name=country]').val();
        var ville = $('[name=city]').val();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
        var passw=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/;
        var letters = /^[A-Za-z]+$/;  
        alert("It working: "+username+" "+fname+" "+lname+" "+pays+" "+ville+" "+email+" "+password);
        Meteor.call('registerUser',username,fname,lname,pays,ville,email,password);          
    }
});
Template.header.events({
    'click #logout': function(event){
        event.preventDefault();
        //alert('logout!!!');
        Meteor.logout();
        Router.go('/login');
    },
    'click #login': function(event){
        event.preventDefault();
        Router.go('/');
    }
});
// ================ Manage User =================== //
Session.set("count",0);
Template.manageuser.events({
    "click #remove":function(e){
        e.preventDefault();
        var id = this._id;
        //alert('Remove Project!!!'+id);
        if (confirm("Are you sure you want to delete this?")) {
            Meteor.call("deleteUser",id);
        }
    },
    'click #adduser': function(e){
        e.preventDefault();
        var username = $('#username').val();
        var fname = $('#firstname').val();
        var lname = $('#lastname').val();
        var pays = $('#country').val();
        var ville = $('#city').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var mySelect = $('#mySelect').val();
        //alert(username+email+password+mySelect);
        Meteor.call('addUser',username,fname,lname,pays,ville,email,password,mySelect);
        //Router.go('project');
    }
});
Template.manageuser.helpers({
    getroles:function(){
        return Meteor.roles.find({});
    },
    listuser:function(){
        var a = Session.get("count");
        a++;
        var allUser = Meteor.users.find({});
        return allUser;
    },
});
//==================== Update User =======================
Template.edituser.events({
   'click #edituser': function(e){
        e.preventDefault();
        var id = this._id;
        var username = $('#username').val();
        var fname = $('[name=firstname]').val();
        var lname = $('[name=lastname]').val();
        var pays = $('[name=country]').val();
        var ville = $('[name=city]').val();
        var email = $('#email').val();
        // var password = $('#password').val();
        var mySelect = $('#mySelect').val();
        alert("it Working"+id+" "+username+" "+fname+" "+lname+" "+pays+" "+ville+" "+email);
        Meteor.call('edituser',id,username,fname,lname,pays,ville,email);
        Meteor.call('updateroles',id,mySelect);
        Router.go('/manageuser');
    }
});
Template.edituser.helpers({
     position: function(posit){
      return posit[0];
     },
     displayuser:function(){
        return Meteor.roles.find({});
     }
});