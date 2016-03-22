Meteor.startup(function() {
	var url = Meteor.absoluteUrl();
      return SEO.config({
        title: 'Fashion Lifestyle and Makeup magazineVogue | Zibamode',
        meta: {
          'description': 'Zibamode is a fashion and lifestyle magazine that is published monthly in 23 different national and regional editions by Condé Nast.'
        },
        og: {
          'image': url +'images/logo-zibamode.svg' 
        }
      });
});