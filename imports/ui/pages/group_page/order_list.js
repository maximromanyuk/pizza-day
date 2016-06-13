import { Template } from 'meteor/templating';
import { Materialize } from 'meteor/materialize:materialize';

import { Events } from '../../../api/events/events.js';

import './order_list.html';
import './order_item.js';

Template.orderList.helpers({
 orderItems() {
  const event = Events.findOne({
   groupId: FlowRouter.getParam('groupId'),
  });

  const participant = event.participants.find((obj) => {
   return obj.userId === Meteor.userId();
  });

  return participant.items;
 },

 ordering() {
  const event = Events.findOne({
   groupId: FlowRouter.getParam('groupId'),
  });
  if(!event) return;

  const participant = event.participants.find((obj) => {
   return obj.userId === Meteor.userId();
  });

  return event.status === 'ordering' &&
         participant.inviteStatus === 'confirmed' &&
         participant.orderConfirmed !== true;
 },
 notEmpty() {
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

Template.orderList.events({
 'click #confirmOrder'() {
  const groupId = FlowRouter.getParam('groupId');
  const event = Events.findOne({ groupId });
  if(!event) return;

  Meteor.call('events.confirmParticipantOrder', {
   groupId,
   orderConfirmed: true,
  }, (err) => {
   if(err) {
    console.log(err);
   } else {
    Materialize.toast('Order confirmed', 4000);
   }
  });
 },

 'click #declineParticipation'() {
  const event = Events.findOne({
   groupId: FlowRouter.getParam('groupId'),
  });
  if(!event) return;

  Meteor.call('events.updateParticipantStatus', {
   eventId: event._id,
   inviteTo: Meteor.userId(),
   newStatus: 'discarded',
  }, (err) => {
   if(err) {
    console.log(err);
   } else {
    Materialize.toast('Participation discarded', 4000);
   }
  });
 },
});
