import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { Groups } from '../groups/groups.js';

export const Invites = new Mongo.Collection('invites');

Meteor.methods({
  'invites.invite'(groupId, invitedId) {
  	if(!Meteor.userId()) {
  		throw new Meteor.Error('not-authorized');
  	}

  	let group = Groups.findOne(groupId);
  	
  	Invites.insert({
  		inviteTo: invitedId,
  		groupId: groupId,
  		groupName: group.name,
  		inviter: Meteor.user().profile.name
  	});
  }
});
