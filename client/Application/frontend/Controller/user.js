Session.set('page_msg','');
Session.set("registerError","");
Session.set("loginError","");
Template.login.events({
    'click #login': function(e, tpl){
        event.preventDefault();
        var email1 = $('[name=email1]').val();
        var password1 = $('[name=password1]').val();
      //  alert('!!! '+email1+password1);
        Meteor.loginWithPassword(email1, password1, function(error){
            if(error){
            console.log(error.reason);
            Session.set("loginError",error.reason);
            }else{
                Router.go('/');
            }
        }); 
    },
    'click #register': function(e, tpl){
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
        var result = users.find({emails:email}); 
        //console.log(username,fname,lname,email);
        var msg = '';
        if( result.count() > 0 || username == '' || fname == '' || lname == '' || pays == '' || email == '' || password == ''){
            if( username == '' )
                msg += 'User Name is required.';
            if( fname == '' )
                msg += 'First Name is required.';
            if( lname == '' )
                msg += 'last NameL is required.';
            if( pays == '' )
                msg += 'pays is required.';
            if( email == '' )
                msg += 'email is required.';
            if( password == '' )
                msg += 'password is required.';
            
            if( result.count() > 0 ){
                msg = " Email name is already exist. ";
            }
            //console.log("required");
            Session.set("registerError", msg );
            Session.set('page_msg',msg);
        //alert("It working: "+username+" "+fname+" "+lname+" "+pays+" "+ville+" "+email+" "+password);
        }else{
            Meteor.call('registerUser',username,fname,lname,pays,ville,email,password, function(err){
                if(err){
                    console.log(err.reason);
                    Session.set("registerError",err.reason);
                }else{
                    Session.set("registerError","");
                    Router.go('login'); 
                }  
            }); 
        }         
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
        var result = users.find({emails:email}); 
        //console.log(username,fname,lname,email);
        var msg = '';
        if( result.count() > 0 || username == '' || fname == '' || lname == '' || pays == '' || email == '' || password == '' || mySelect == ''){
            if( username == '' )
                msg += 'User Name is required.';
            if( fname == '' )
                msg += 'First Name is required.';
            if( lname == '' )
                msg += 'last NameL is required.';
            if( pays == '' )
                msg += 'pays is required.';
            if( email == '' )
                msg += 'email is required.';
            if( password == '' )
                msg += 'password is required.';
            if( mySelect == '' )
                msg += 'Myselect is required.';
            
            if( result.count() > 0 ){
                msg = " Email name is already exist. ";
            }
            //console.log("required");
            Session.set("registerError", msg );
            Session.set('page_msg',msg);
        //alert("It working: "+username+" "+fname+" "+lname+" "+pays+" "+ville+" "+email+" "+password);
        }else{
            Session.set("registerError","");
            delete Session.keys['registerError'];
            Meteor.call('registerUser',username,fname,lname,pays,ville,email,password,mySelect, function(err){
                if(err){
                    console.log(err.reason);
                    Session.set("registerError",err.reason);
                }else{
                    Session.set("registerError","");
                    Router.go('manageuser'); 
                }  
            }); 
        }         
    },
    "click #edituser":function(event,tpl){
        Session.set("registerError","");
        delete Session.keys['registerError'];
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
       // alert("it Working"+id+" "+username+" "+fname+" "+lname+" "+pays+" "+ville+" "+email);
       var result = users.find({emails:email}); 
        //console.log(username,fname,lname,email);
        var msg = '';
        if( result.count() > 0 || username == '' || fname == '' || lname == '' || pays == '' || email == ''  || mySelect == ''){
            if( username == '' )
                msg += 'User Name is required.';
            if( fname == '' )
                msg += 'First Name is required.';
            if( lname == '' )
                msg += 'last NameL is required.';
            if( pays == '' )
                msg += 'pays is required.';
            if( email == '' )
                msg += 'email is required.';
            // if( password == '' )
            //     msg += 'password is required.';
            if( mySelect == '' )
                msg += 'Myselect is required.';
            
            if( result.count() > 0 )
                msg = " Email name is already exist. ";
            
            //console.log("required");
            Session.set("registerError", msg );
            Session.set('page_msg',msg);
        //alert("It working: "+username+" "+fname+" "+lname+" "+pays+" "+ville+" "+email+" "+password);
        }else{
        Session.set("registerError","");
        delete Session.keys['registerError'];
        Meteor.call('edituser',id,username,fname,lname,pays,ville,email,mySelect, function(err) {
            Meteor.call('updateroles',id,mySelect,function(err){  
            Router.go('/manageuser');
            });
        });
        }
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
Template.login.helpers({
    loginError:function(){
        var msg = Session.get("loginError");
        if( msg ) return true;
        else return false;
    },
    loginErrormsg: function(){
        return Session.get("loginError");
    }
});
Template.login.helpers({
    
    getmsg: function(){
        var msg = Session.get('page_msg',msg);
        if( msg !="" ) return msg;
        else msg ='';
    },
    registerError:function(){
        var msg = Session.get("registerError");
        if( msg ) return true;
        else return false;
    },
    registerErrormsg: function(){
        return Session.get("registerError");
    }
});
Template.manageuser.helpers({
    
    getmsg: function(){
        var msg = Session.get('page_msg',msg);
        if( msg !="" ) return msg;
        else msg ='';
    },
    registerError:function(){
        var msg = Session.get("registerError");
        if( msg ) return true;
        else return false;
    },
    registerErrormsg: function(){
        return Session.get("registerError");
    }
});
Template.edituser.helpers({
    
    getmsg: function(){
        var msg = Session.get('page_msg',msg);
        if( msg !="" ) return msg;
        else msg ='';
    },
    registerError:function(){
        var msg = Session.get("registerError");
        if( msg ) return true;
        else return false;
    },
    registerErrormsg: function(){
        return Session.get("registerError");
    }
});