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

	Template.images.helpers({images:
		Images.find(
			{},
			{sort:{createdOn: -1,rating:-1}}
		)});

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
		}
	});

	Template.image_add_form.events({
		'submit .js-add-image':function (event) {
			event.preventDefault();
			var image_src, image_alt;
			image_src = event.target.img_src.value;
			image_alt = event.target.img_alt.value;

			Images.insert({
				img_src: image_src,
				img_alt: image_alt,
				createdOn: new Date()
			});

			$('#image_add_form').modal('hide');

			return false;
		}
	});
	
	$(document).on("hidden.bs.modal", function (e) {
		$('#image_add_form input').val('');
	});
}

