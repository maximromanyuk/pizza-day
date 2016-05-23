import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';
import { _ } from 'meteor/underscore';

import { Invites } from './invites.js';
import { Groups } from '../groups/groups.js';

// insert new invite
export const invite = new ValidatedMethod({
 name: 'invites.invite',

 mixins: [LoggedInMixin],

 checkLoggedInError: {
  error: 'notLogged',
 },

 validate: new SimpleSchema({
  groupId: { type: String },
  invitedId: { type: String },
 }).validator(),

 run({ groupId, invitedId }) {
  const group = Groups.findOne(groupId);

  Invites.insert({
   inviteTo: invitedId,
   groupId,
   groupName: group.name,
   inviter: Meteor.user().profile.name,
  });
 },
});

export const removeInvite = new ValidatedMethod({
 name: 'invites.remove',

 mixins : [LoggedInMixin],

 checkLoggedInError: {
  error: 'notLogged',
 },

 validate: new SimpleSchema({
  inviteId: { type: String },
 }).validator(),

 run({ inviteId }) {
  Invites.remove(inviteId);
 },
});

// No errors when:
// - user choosed
// - user don`t participates in this group
// - user wasn`t invited earlier
export const validateUserInviting = new ValidatedMethod({
 name: 'invites.checkForInvite',

 mixins : [LoggedInMixin],

 checkLoggedInError: {
  error: 'notLogged',
 },

 validate: new SimpleSchema({
  userId: { type: String },
  toGroupWithId: { type: String },
 }).validator(),

 run({ userId, toGroupWithId }) {
  const invites = Invites.find({'inviteTo': userId, 'groupId': toGroupWithId}).fetch();
  const users = Groups.findOne(toGroupWithId).users;

  if(_.indexOf(users, userId) !== -1) {
   throw new Meteor.Error('usrInGroupAlready',
        'User participates in group already');
  }

  if(invites.length !== 0) {
   throw new Meteor.Error('usrWasInvitedEarlier',
        'This user was invited earlier');
  }
 },
});
