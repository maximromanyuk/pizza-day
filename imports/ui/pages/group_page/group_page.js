import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Materialize } from 'meteor/materialize:materialize';
import { moment } from 'meteor/momentjs:moment';

import { Groups } from '../../../api/groups/groups.js';
import { Events } from '../../../api/events/events.js';

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
  const event = Events.findOne({
   groupId: FlowRouter.getParam('groupId'),
  });

  return event === undefined ? 'no active event' : event.status;
 },

 date() {
  const event = Events.findOne({
   groupId: FlowRouter.getParam('groupId'),
  });
  if (!event) return;

  return moment(event.date).format('D MMM, YYYY');
 },

 name() {
  const id = FlowRouter.getParam('groupId');
  if (!Groups.findOne(id).name) return;

  return Groups.findOne(id).name;
 },

 participatesInEvent() {
  const event = Events.findOne({
   groupId: FlowRouter.getParam('groupId'),
  });
  if(!event) return;

  const participant = event.participants.find((obj) => {
   return obj.userId === Meteor.userId();
  });

  return (event.status === 'ordering' ||
          event.status === 'ordered'  ||
          event.status ===  'delivering') &&
         participant.inviteStatus === 'confirmed';
 },
 orderNotEmpty() {
  const event = Events.findOne({
   groupId: FlowRouter.getParam('groupId'),
  });
  if(!event) return;

  const participant = event.participants.find((obj) => {
   return obj.userId === Meteor.userId();
  });
  return participant.items.length !== 0;

 },
});

Template.groupPage.events({
 'click #deleteGroup'() {
  Meteor.call('groups.remove', {
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
  Meteor.call('groups.removeUser', {
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
