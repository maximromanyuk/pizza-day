import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';

import { Groups } from './groups.js';

export const addUserToGroup = new ValidatedMethod({
 name: 'groups.addUser',

 mixins: [LoggedInMixin],

 checkLoggedInError: {
  error: 'notLogged',
  message: 'You need to be logged in to call this method', // Optional
  reason: 'You need to login', // Optional
 },

 validate: new SimpleSchema({
  groupId: { type: String },
  inviteTo: { type: String },
 }).validator(),

 run({ groupId, inviteTo }) {
  Groups.update({_id: groupId},
   { $push: { users: inviteTo}});
 },
});

export const createNewGroup = new ValidatedMethod({
 name: 'groups.insert',

 mixins: [LoggedInMixin],

 checkLoggedInError: {
  error: 'notLogged',
 },

 validate: new SimpleSchema({
  groupName: { type: String },
    // TODO: maybe check with imageUrlValidator?
  logoUrl: { type: SimpleSchema.RegEx.Url },
 }).validator(),

 run({ groupName, logoUrl }) {
  // TODO: make Group class?
  Groups.insert({
   name: groupName,
   logoUrl,
   creator: Meteor.userId(),
   users: [Meteor.userId()],
   menuItems: [],
  });
 },
});

export const removeGroup = new ValidatedMethod({
 name: 'groups.remove',

 mixins: [LoggedInMixin],

 checkLoggedInError: {
  error: 'notLogged',
 },

 validate: new SimpleSchema({
  groupId: { type: String },
 }).validator(),

 run({ groupId }) {
  Groups.remove({_id: groupId});
 },
});

export const removeUserFromGroup = new ValidatedMethod({
 name: 'groups.removeUser',

 mixins: [LoggedInMixin],

 checkLoggedInError: {
  error: 'notLogged',
 },

 validate: new SimpleSchema({
  groupId: { type: String },
  userId: { type: String },
 }).validator(),

 run({ groupId, userId }) {
  Groups.update({_id: groupId},
                  { $pull: { users: userId}});
 },
});

// TODO check if item with name exists
export const addNewItemToMenu = new ValidatedMethod({
 name: 'menu.insert',

 mixins: [LoggedInMixin],

 checkLoggedInError: {
  error: 'notLogged',
 },

 validate: new SimpleSchema({
  groupId: { type: String },
  name: { type: String },
  price: { type: Number },
 }).validator(),

 run({ groupId, name, price }) {
  Groups.update({_id: groupId},
                { $push: { menuItems: {name, price}}});
 },
});

export const removeItemFromMenu = new ValidatedMethod({
 name: 'menu.delete',

 mixins: [LoggedInMixin],

 checkLoggedInError: {
  error: 'notLogged',
 },

 validate: new SimpleSchema({
  groupId: { type: String },
  name: { type: String },
 }).validator(),

 run({ groupId, name }) {
  Groups.update({_id: groupId},
                  {$pull: {menuItems: {name}}},
                  false, true);
 },
});
