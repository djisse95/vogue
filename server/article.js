Meteor.methods({
	addarticle:function(title,desc,img,video,youtube,cate){
		var attr = {
			title : title,
			description : desc,
			imageId : img,
			videoId : video,
			youtube:youtube,
			catId : cate
		}
		return article.insert(attr);
	},
	editarticle:function(id,title,desc,img,video,youtube,cate){
		var attr = {
			title : title,
			description : desc,
			imageId : img,
			videoId : video,
			youtube:youtube,
			catId : cate
		}
		return article.update({_id:id},{$set:attr});
	},
	removeArt:function(id){
		return article.remove({_id:id});
	}
});