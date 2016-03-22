Session.set('page_msg','');
Template.login.events({
    'click #login': function(event, tpl){
        event.preventDefault();
        var email = $('[name=email1]').val();
        var password = $('[name=password1]').val();
      //  alert('!!! '+email1+password1);
       /* Meteor.loginWithPassword(email1, password1, function(error){
            if(error){
            Bert.alert(error.reason,'danger', 'growl-top-left' );
            Session.set("loginError",error.reason);
            }else{
                Bert.alert('login success!','success', 'growl-top-left' );
                Router.go('/');
            }
        }); */
          Meteor.loginWithPassword(email, password, function(error){
           if(error){
            console.log(error.reason);
            Bert.alert(error.reason, 'danger','growl-top-left');
           } else {
             Bert.alert("login successful!", 'success', 'growl-top-left');
             var loggedInUser = Meteor.user();
             var addContent = Session.get('addContent');
             var group = 'mygroup';
            if(addContent == 1){
                Router.go('/addContent');
            }
            else if (Roles.userIsInRole(loggedInUser, ['Admin'], group)) {
             Router.go('/manageuser');
             $('.close').click();
            }
            else if (Roles.userIsInRole(loggedInUser, ['member'], group)) { 
             Router.go('/');
              $('.close').click();
            }else{
             Router.go('/');
              $('.close').click();
            }
           }
          });
    },
    'click #register': function(event, tpl){
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
       
            if( username == '' )
                Bert.alert( 'username is required', 'danger', 'growl-top-right' );
            else if( fname == '' )
                Bert.alert( 'firstname is required', 'danger', 'growl-top-right' );
            else if( lname == '' )
                Bert.alert( 'lastname is required', 'danger', 'growl-top-right' );
            else if( pays == '' )
                Bert.alert( 'pays is required', 'danger', 'growl-top-right' );
            else if( ville == '' )
                Bert.alert( 'ville is required', 'danger', 'growl-top-right' );
            else if( email == '' )
                Bert.alert( 'email is required', 'danger', 'growl-top-right' );
            else if( password == '' )
                Bert.alert( 'password is required', 'danger', 'growl-top-right' );
            // else
            //     Bert.alert('please check input again','danger','growl-top-right');

             else if(username.match(letters)){
                if(email.match(mailformat))
                {
                    if(password.match(passw))   
                    {

                        Meteor.call('registerUser',username,fname,lname,pays,ville,email,password, function(err){
                            if(err){
                                Bert.alert(err.reason,'danger', 'growl-top-right' );
                                Session.set("registerError",err.reason);
                            }else{
                                Session.set("registerError","");
                                Bert.alert('Register success','success', 'growl-top-right' );
                                Router.go('login'); 
                            }  
                        }); 
                    }  
                    else  
                    { 
                        $("#error_pass").text("[6 to 10 characters,at least 1 specail characters and 1 numeric digits]").css("color","red");  
                        $('[name=password]').focus(); 
                        return false;  
                    } 
                }  
                else  
                {  
                    $("#error_email").text("invalid email address!").css("color","red");  
                    $('[name=email]').focus();  
                    return false;  
                }  
                
            }else{
            //     $("#error_fname").text("plese fill username").css("color","red");
            //     $('[name=username]').focus(); 
            //     return false;    
                Bert.alert('please check input again','danger','growl-top-right');
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
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password, function(error){
            if(error){
                console.log(error.reason);
            } else {
                alert("successfully");
                Router.go('home');
            }
        });
        // Router.go('/');
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
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var password = $('#password').val();
        var mySelect = $('#mySelect').val();
        var result = users.find({emails:email}); 
        //console.log(username,fname,lname,email);
        var msg = '';
        if( result.count() > 0 || username == '' || fname == '' || lname == '' || pays == '' || email == '' || !email.match(re) || password == '' || mySelect == ''){
            if( username == '' )
                Bert.alert( 'username is required', 'danger', 'growl-top-right' );
            else if( fname == '' )
                Bert.alert( 'firstname is required', 'danger', 'growl-top-right' );
            else if( lname == '' )
                Bert.alert( 'lastname is required', 'danger', 'growl-top-right' );
            else if( pays == '' )
                Bert.alert( 'pays is required', 'danger', 'growl-top-right' );
            else if( email == '' )
                Bert.alert( 'email is required', 'danger', 'growl-top-right' );
            else if (!email.match(re))
                Bert.alert( 'Not format email', 'danger', 'growl-top-right' );
            else if( password == '' )
                Bert.alert( 'password is required', 'danger', 'growl-top-right' );
            else if( mySelect == '' )
                Bert.alert( 'mySelect is required', 'danger', 'growl-top-right' );
            else if( result.count() > 0 )
                Bert.alert( 'Email name is already exist.', 'danger', 'growl-top-right' );
            else
                Bert.alert('please check input again','danger','growl-top-right');
        }else{
            Meteor.call('addUser',username,fname,lname,pays,ville,email,password,mySelect, function(err){
                if(err){
                    Bert.alert(err.reason,'danger', 'growl-top-right' );
                    Session.set("registerError",err.reason);
                }else{
                    Session.set("registerError","");
                    Bert.alert('Register success','success', 'growl-top-right' );
                    Router.go('manageuser'); 
                }  
            }); 
        }         
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
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // var password = $('#password').val();
        var mySelect = $('#mySelect').val();
       // alert("it Working"+id+" "+username+" "+fname+" "+lname+" "+pays+" "+ville+" "+email);
       var result = users.find({emails:email}); 
        //console.log(username,fname,lname,email);
        var msg = '';
        if( result.count() > 0 || username == '' || fname == '' || lname == '' || pays == '' || email == '' || !email.match(re) || mySelect == ''){
            if (!email.match(re))
                Bert.alert( 'Not format email', 'danger', 'growl-top-right' );
            if( username == '' )
                Bert.alert( 'username is required', 'danger', 'growl-top-right' );
            else if( fname == '' )
                Bert.alert( 'firstname is required', 'danger', 'growl-top-right' );
            else if( lname == '' )
                Bert.alert( 'lastname is required', 'danger', 'growl-top-right' );
            else if( pays == '' )
                Bert.alert( 'pays is required', 'danger', 'growl-top-right' );
            else if( email == '')
                Bert.alert( 'email is required', 'danger', 'growl-top-right' );
            else if (!email.match(re))
                Bert.alert( 'Not format email', 'danger', 'growl-top-right' );
            else if( mySelect == '' )
                Bert.alert( 'mySelect is required', 'danger', 'growl-top-right' );
            else if( result.count() > 0 )
                Bert.alert( 'Email name is already exist.', 'danger', 'growl-top-right' );
            else
                Bert.alert('please check input again','danger','growl-top-right');

            
        }else{
        Session.set("registerError","");
        delete Session.keys['registerError'];
        Meteor.call('edituser',id,username,fname,lname,pays,ville,email,mySelect, function(err) {
            Meteor.call('updateroles',id,mySelect,function(err){
            Bert.alert('Update success!','success', 'growl-top-left' );  
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
// Template.login.helpers({
//     loginError:function(){
//         var msg = Session.get("loginError");
//         if( msg ) return true;
//         else return false;
//     },
//     loginErrormsg: function(){
//         return Session.get("loginError");
//     }
// });
// Template.login.helpers({
    
//     getmsg: function(){
//         var msg = Session.get('page_msg',msg);
//         if( msg !="" ) return msg;
//         else msg ='';
//     },
//     registerError:function(){
//         var msg = Session.get("registerError");
//         if( msg ) return true;
//         else return false;
//     },
//     registerErrormsg: function(){
//         return Session.get("registerError");
//     }
// });
// Template.manageuser.helpers({
    
//     getmsg: function(){
//         var msg = Session.get('page_msg',msg);
//         if( msg !="" ) return msg;
//         else msg ='';
//     },
//     registerError:function(){
//         var msg = Session.get("registerError");
//         if( msg ) return true;
//         else return false;
//     },
//     registerErrormsg: function(){
//         return Session.get("registerError");
//     }
// });
// Template.edituser.helpers({
    
//     getmsg: function(){
//         var msg = Session.get('page_msg',msg);
//         if( msg !="" ) return msg;
//         else msg ='';
//     },
//     registerError:function(){
//         var msg = Session.get("registerError");
//         if( msg ) return true;
//         else return false;
//     },
//     registerErrormsg: function(){
//         return Session.get("registerError");
//     }
// });