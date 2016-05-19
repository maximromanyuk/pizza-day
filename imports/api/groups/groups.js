import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Groups = new Mongo.Collection("groups");

Groups.helpers({
  isGroupCreator(groupId) {
    const creatorId = Groups.findOne(groupId).creator;
    return Meteor.userId() === creatorId;
  }
});

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
      users: [Meteor.userId()],
      menuItems: [{name: 'Item1', price: 10}],
      event: {
        date: new Date(),
        status: ''
      },
  	});
  },
});

Meteor.methods({
  'menu.insert'(groupId, name, price) {
    if(!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Groups.update({_id: groupId}, { $push: { menuItems: {name: name, price: price}}})
  },

  'menu.delete'(groupId, itemId) {

  },

  'menu.edit'(groupId, itemId, newName, newPrice) {

  }
});
