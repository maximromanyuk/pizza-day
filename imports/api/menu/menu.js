import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Menu = new Mongo.Collection('menu');

Meteor.methods({
  //TODO: addMenuItem, updateMenuItem, orderItem
  // methods for managing coupons here maybe. Not shure
});
