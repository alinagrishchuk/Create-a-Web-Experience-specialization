/**
 * Created by ALINA on 09.05.2016.
 */

this.Documents = new Mongo.Collection("documents");

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
        editor.setOption("mode", "html");
        editor.setOption("theme",'monokai');

        editor.on("change", function(cm_editor, info){
          console.log("changing...")
          console.log(Meteor);
          $("#viewer_iframe").contents().find("html").html(cm_editor.getValue());
        });
      }
    },

  });

  Template.time_display.helpers({
    "current_time": function () {
      return Session.get("current_time");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // startup code that creates a document in case there isn't one yet.
    if (!Documents.findOne()){// no documents yet!
      Documents.insert({title:"my new document"});
    }
  });
}