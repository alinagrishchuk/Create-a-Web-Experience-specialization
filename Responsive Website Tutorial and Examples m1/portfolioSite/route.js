/**
 * Created by ALINA on 09.05.2016.
 */
Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/',function () {
	this.render('home');
});

Router.route('/news', function () {
	this.render('news');
});

