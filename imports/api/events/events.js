import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Events = new Mongo.Collection('events');

Meteor.methods({
  //TODO: createEvent, updateEvent, finishEvent
  // methods for adding/updating items in order here too
});
