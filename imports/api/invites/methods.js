import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Invites } from './invites.js';
import { Groups } from '../groups/groups.js';


export const invite = new ValidatedMethod({
  name: 'invites.invite',
  
  mixins : [LoggedInMixin],
  
  checkLoggedInError: {
    error: 'notLogged',
  },

  validate: new SimpleSchema({
    groupId: { type: String },
    invitedId: { type: String }
  }).validator(),

  run({ groupId, invitedId }) {
    const group = Groups.findOne(groupId);

    Invites.insert({
      inviteTo: invitedId,
      groupId: groupId,
      groupName: group.name,
      inviter: Meteor.user().profile.name
    });
  }
});

export const removeInvite = new ValidatedMethod({
  name: 'invites.remove',
  
  mixins : [LoggedInMixin],
  
  checkLoggedInError: {
    error: 'notLogged',
  },

  validate: new SimpleSchema({
    inviteId: { type: String }
  }).validator(),

  run({ inviteId }) {
    Invites.remove(inviteId);
  }
});