import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { $ } from 'meteor/jquery';

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
  if (!Groups.findOne(id)) return;

   // Get users with name, logoUrl and status from Event
  let users = [];
  const usersIds = Groups.findOne(id).users;
  for(let userId of usersIds) {
   const name = Meteor.users.findOne(userId).profile.name;
   const logoUrl = Meteor.users.findOne(userId).services.google.picture;

   const result = $.grep(event.participants, (obj) => { return obj.userId === userId; });
   const status = result[0].inviteStatus;
   users.push({
    name,
    logoUrl,
    status,
   });
  }

  return users;
 },
});

Template.userStatus.helpers({
 confirmed() {
  // TODO check in some collection for participant status
 },
 discarded() {

 },
});
