categories = new Mongo.Collection('categories');
article = new Mongo.Collection('article');
content = new Mongo.Collection('content');
users = Meteor.users;
tags = new Mongo.Collection('tags');
/*images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", {path: "/Users/tnc/desktop/Make Up/makeup/public/upload"})]
});*/
article.initEasySearch('title');
fullpath="public/uploads";

if (Meteor.isServer) {
	fullpath=process.env.PWD;
	console.log('linux path:'+fullpath);
	if( typeof fullpath == 'undefined' ){
		base_path = Meteor.npmRequire('fs').realpathSync( process.cwd() + '../../' );
		//console.log('window path:'+base_path);
		base_path = base_path.split('\\').join('/');
		base_path = base_path.replace(/\/\.meteor.*$/, '');
	}else{
		base_path=fullpath;
	}
}
else{
	base_path="/";
}
//console.log( 'BASE PATH: '+base_path );
images = new FS.Collection("images", {
	//stores: [new FS.Store.FileSystem("images", {path:"/opt/safir/app/uploads"})]
    stores: [new FS.Store.FileSystem("images", {path:base_path+"/uploads"})]
});