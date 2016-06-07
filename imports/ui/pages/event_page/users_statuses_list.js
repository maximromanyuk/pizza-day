import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Groups } from '../../../api/groups/groups.js';
import { Events } from '../../../api/events/events.js';

import './users_statuses_list.html';

Template.usersStatusesList.onCreated(() => {
 Meteor.subscribe('users');
});

Template.usersStatusesList.helpers({
 usersStatuses() {
  const id = FlowRouter.getParam('groupId');
  const event = Events.findOne({ groupId: id });
  if(!event) return;

  if (!Groups.findOne(id)) return;

   // Get users with name, logoUrl and status from Event
  let users = [];
  const usersIds = Groups.findOne(id).users;
  for(let userId of usersIds) {
   const participant = event.participants.find((obj) => {
    return obj.userId === userId;
   });

   users.push({
    userId: participant.userId,
    name: Meteor.users.findOne(userId).profile.name,
    logoUrl: Meteor.users.findOne(userId).services.google.picture,
    status: participant.inviteStatus,
   });
  }

  return users;
 },
});

Template.userStatus.helpers({
 confirmed() {
  if(this.status === 'confirmed') {
   return true;
  } else {
   return false;
  }
 },
 discarded() {
  if(this.status === 'discarded') {
   return true;
  } else {
   return false;
  }
 },
});
