import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Materialize } from 'meteor/materialize:materialize';
import { moment } from 'meteor/momentjs:moment';

import { Groups } from '../../../api/groups/groups.js';
import { Events } from '../../../api/events/events.js';

import { removeGroup } from '../../../api/groups/methods.js';
import { removeUserFromGroup } from '../../../api/groups/methods.js';

import './group_page.html';

import './menu.js';
import './users.js';
import './order_list.js';

Template.groupPage.onRendered(() => {
 $('.modal-trigger').leanModal();
});

Template.groupPage.onCreated(() => {
 this.getGroupId = () => FlowRouter.getParam('groupId');

 Tracker.autorun(() => {
  Meteor.subscribe('group', this.getGroupId());
  Meteor.subscribe('event', this.getGroupId());
 });
});

Template.groupPage.helpers({
 groupId() {
  return FlowRouter.getParam('groupId');
 },

 hasGroupCreatorRights() {
  const id = FlowRouter.getParam('groupId');
  if (!Groups.findOne(id)) return;

  return Groups.findOne(id).creator === Meteor.userId();
 },

 status() {
  const groupId = FlowRouter.getParam('groupId');
  const event = Events.findOne({ groupId: groupId });

  if(event === undefined) {
   return 'no active event';
  } else {
   return event.status;
  }
 },

 date() {
  const groupId = FlowRouter.getParam('groupId');
  const event = Events.findOne({ groupId: groupId });
  if (!event) return;

  return moment(event.date).format('D MMM, YYYY');
 },

 name() {
  const id = FlowRouter.getParam('groupId');
  if (!Groups.findOne(id).name) return;

  return Groups.findOne(id).name;
 },

 participatesInEvent() {
  const groupId = FlowRouter.getParam('groupId');
  const event = Events.findOne({ groupId: groupId });
  if(!event) return;

  const participant = event.participants.find((obj) => {
   return obj.userId === Meteor.userId();
  });

  if((event.status === 'ordering' ||
     event.status === 'ordered'   ||
     event.status ===  'delivering') &&
     participant.inviteStatus === 'confirmed') {
   return true;
  } else {
   return false;
  }
 },

});

Template.groupPage.events({
 'click #deleteGroup'() {
  removeGroup.call({
   groupId: FlowRouter.getParam('groupId'),
  }, (err) => {
   if(err) {
    console.log(err);
   } else {
    FlowRouter.go('groups');
    Materialize.toast('Group removed permanently', 4000);
   }
  });
 },

 'click #leaveOrRemoveGroupModal'() {
  $('#modal2').openModal();
 },

 'click #leaveGroup'() {
  removeUserFromGroup.call({
   groupId: FlowRouter.getParam('groupId'),
   userId: Meteor.userId(),
  }, (err) => {
   if(err) {
    console.log(err);
   } else {
    FlowRouter.go('groups');
    Materialize.toast('You leaved...', 4000);
   }
  });
 },
});
