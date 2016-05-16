import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Groups = new Mongo.Collection("groups");

Meteor.methods({
  //TODO: createEvent, updateEvent, finishEvent
  // methods for adding/updating items in order here too
});
