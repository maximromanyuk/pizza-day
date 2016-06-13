import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Materialize } from 'meteor/materialize:materialize';

import { Groups } from '../../../api/groups/groups.js';
import { Events } from '../../../api/events/events.js';

import './menu_item.html';

Template.menuItem.onRendered(() => {
 $('.tooltipped').tooltip({delay: 50});
});

Template.menuItem.helpers({
 canAddToOrder() {
  const event = Events.findOne({
   groupId: FlowRouter.getParam('groupId'),
  });
  if(!event) return;

  const participant = event.participants.find((obj) => {
   return obj.userId === Meteor.userId();
  });

  return (event.status === 'ordering' &&
         participant.inviteStatus === 'confirmed' &&
         participant.orderConfirmed !== true);
 },

 hasGroupCreatorRights() {
  const groupId = FlowRouter.getParam('groupId');
  if (!Groups.findOne(groupId)) return;

  return Groups.findOne(groupId).creator === Meteor.userId();
 },

 canAddCoupon() {
  const groupId = FlowRouter.getParam('groupId');
  const event = Events.findOne({ groupId });
  if (!Groups.findOne(groupId)) return;
  if(!event) return true;

  return (event.status === 'ordering');
 },
});

Template.menuItem.events({
 'click #addToOrder'() {
  const event = Events.findOne({
   groupId: FlowRouter.getParam('groupId'),
  });
  if(!event) return;

  Meteor.call('events.addItemToOrder', {
   eventId: event._id,
   name: this.name,
   price: parseInt(this.price, 10),
   quantity: 1,
  }, (err) => {
   if(err) {
    console.log(err);
   } else {
    Materialize.toast('Item in order now!', 4000);
   }
  });
 },

 'click #delete'() {
  Meteor.call('menu.removeItem', {
   groupId: FlowRouter.getParam('groupId'),
   name: this.name,
  }, (err) => {
   if(err) {
    console.log(err);
   } else {
    Materialize.toast('Item removed permanently', 4000);
   }
  });
 },

 'click #addCoupon'() {
  Meteor.call('group.addCoupon', {
   groupId: FlowRouter.getParam('groupId'),
   name: this.name,
   quantity: 1,
  });
 },

 'click #removeCoupon'() {
  Meteor.call('group.addCoupon', {
   groupId: FlowRouter.getParam('groupId'),
   name: this.name,
   quantity: -1,
  });
 },
});
