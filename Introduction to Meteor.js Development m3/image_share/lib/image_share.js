/**
 * Created by ALINA on 09.05.2016.
 */

Images = new Mongo.Collection("images");

if(Meteor.isClient) {

	Template.body.helpers({username: function () {
		if (Meteor.user()) {
			return Meteor.user().username;
		}
		else {
			return "anonymous user"
		}
	}});
	Accounts.ui.config({
		passwordSignupFields: 'USERNAME_AND_EMAIL'
	});

	Template.images.helpers({
		images: function () {
			if (Session.get('userFilter')) {
				console.log(Session.get('userFilter'));
				return Images.find(
					{createdBy: Session.get('userFilter')},
					{sort:{createdOn: -1,rating:-1}})
			}
			else {
				return Images.find(
					{},
					{sort:{createdOn: -1,rating:-1}})
			}
		},
		getUser: function(user_id) {
			var user = Meteor.users.findOne({_id: user_id});
			if (user)	{
				return user.username;
			}
			else {
				return "anon";
			}
		},
		filtering_images: function () {
			if (Session.get('userFilter')) {
				return true
			}
			else {
				return false;
			}
		},
		getFilterUser: function () {
			var user = Meteor.users.findOne({_id: Session.get('userFilter')});
			if (user)	{
				return user.username;
			}
			else {
				return "";
			}
		}

	});

	Template.images.events({
		'click .js-del-image':function (event) {
			var image_id = this._id;
			console.log(image_id);
			$('#'+image_id).hide('slow',function () {
				Images.remove({"_id": image_id});
			});
		},

		'click .js-rate-image':function (event) {
			console.log(event.currentTarget);
			console.log(this);
			var rating = $(event.currentTarget).data("userrating");
			console.log("you click on the stars - " + rating);
			var image_id = this.id;
			Images.update({"_id": image_id},
										{$set: {rating: rating}});
		},

		'click .js-show-image-form':function (event) {
			console.log('click .js-show-image-form');
			$('#image_add_form').modal('show');
		},

		'click .js-set-image-filter':function (event) {
			Session.set("userFilter", this.createdBy);
			console.log(Session.get('userFilter'));
		},
		'click .js-unset-image-filter': function (event) {
			Session.set("userFilter", undefined);
		}

	});

	Template.image_add_form.events({
		'submit .js-add-image':function (event) {
			event.preventDefault();
			var image_src, image_alt;
			image_src = event.target.img_src.value;
			image_alt = event.target.img_alt.value;
			if (Meteor.user()){

				Images.insert({
					img_src: image_src,
					img_alt: image_alt,
					createdOn: new Date(),
					createdBy: Meteor.user()._id
				});
			}

			$('#image_add_form').modal('hide');

			return false;
		}
	});
	
	$(document).on("hidden.bs.modal", function (e) {
		$('#image_add_form input').val('');
	});
}

