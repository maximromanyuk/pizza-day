import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Groups = new Mongo.Collection("groups");

Meteor.methods({
  //TODO: createEvent, updateEvent, finishEvent
  // methods for adding/updating items in order here too
  'groups.insert'(groupName, logoUrl) {
  	check(groupName, String);

  	// Make sure the user is logged in before inserting a task
  	if(!Meteor.userId()) {
  		throw new Meteor.Error('not-authorized');
  	}

  	Groups.insert({
  		name: groupName,
      logoUrl: logoUrl,
      creator: Meteor.userId(),
      users: [Meteor.userId()]
  	});
  },
});
