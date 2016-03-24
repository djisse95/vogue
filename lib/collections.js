categories = new Mongo.Collection('categories');
article = new Mongo.Collection('article');
content = new Mongo.Collection('content');
users = Meteor.users;
tags = new Mongo.Collection('tags');

article.initEasySearch('title');

if (Meteor.isServer) {
	fullpath=process.env.PWD;
	if( typeof fullpath == 'undefined' ){
		base_path = Meteor.npmRequire('fs').realpathSync( process.cwd() + '../../' );
		base_path = base_path.split('\\').join('/');
		base_path = base_path.replace(/\/\.meteor.*$/, '');
	}else{
		base_path=fullpath;
	}
}
else{
	base_path="/";
}
images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", {path:base_path+"/uploads"})]
});