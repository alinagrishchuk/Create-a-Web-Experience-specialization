/**
 * Created by ALINA on 09.05.2016.
 */

Songs = new Mongo.Collection("songs");

this.Documents = new Mongo.Collection("documents");
EditingUsers = new Mongo.Collection("editingUsers");

if(Meteor.isClient) {
  Meteor.setInterval(function () {
		var date = new Date();
		var str = date.getFullYear() + "-"
		  + (date.getMonth() + 1) + "-" + date.getDate()
		  + " " +  date.getHours() + ":" + date.getMinutes()
		  + ":" + date.getSeconds();

    Session.set("current_time", str);
  },1000);

  Template.editor.helpers({
    docid:function () {
      doc =  Documents.findOne();
      if (doc) {
        return doc._id;
      }
      else {
        return undefined;
      }
    },
    config:function(){
      return function(editor){
        editor.setOption("lineNumbers", true);
        editor.setOption("theme", "cobalt");
        editor.on("change", function(cm_editor, info){
          $("#viewer_iframe").contents().find("html").html(cm_editor.getValue());
          Meteor.call("addEditingUser");
        });
      }
    }

  });

  Template.editingUsers.helpers({
    users: function () {
      var doc,user, eusers;
      doc = Documents.findOne();

      if (!doc) {return;}

      eusers = EditingUsers.findOne({docid: doc._id});
      if (!eusers) {return;}

      users = new Array();
      var i = 0;
      for (var user_id in eusers.users) {
        users[i] = fixObjectKeys(eusers.users[user_id]);
        i++;
      }
      return users;
    }
  });

  Template.time_display.helpers({
    "current_time": function () {
      return Session.get("current_time");
    }
  });


}//end isClient..

if (Meteor.isServer) {
  Meteor.startup(function () {
    // startup code that creates a document in case there isn't one yet.
    if (!Documents.findOne()) {
      Documents.insert({title:"my new document"});
    }
  });
}

Meteor.methods({
  addEditingUser: function () {
    var doc,user, eusers;
    doc = Documents.findOne();

    if (!doc) {return;}
    if(!this.userId) {return}

    user = Meteor.user().profile;
    eusers = EditingUsers.findOne({docid:doc._id});

    if(!eusers) {
      eusers = { docid: doc._id,  users: {}};
    }
    user.lastEdit = new Date();
    eusers.users[this.userId] = user;
    EditingUsers.upsert({_id: eusers._id},eusers);
  }
});

function fixObjectKeys(obj){
  var newObj = {};
  for (key in obj){
    var key2 = key.replace("-", "");
    newObj[key2] = obj[key];
  }
  return newObj;
}