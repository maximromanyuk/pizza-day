import { Template } from 'meteor/templating';
import { Materialize } from 'meteor/materialize:materialize';

import { Events } from '../../../api/events/events.js';

import './order_list.html';
import './order_item.js';

Template.orderList.helpers({
 orderItems() {
  const groupId = FlowRouter.getParam('groupId');
  const event = Events.findOne({ groupId: groupId });

  const participant = event.participants.find((obj) => {
   return obj.userId === Meteor.userId();
  });

  return participant.items;
 },

 ordering() {
  const groupId = FlowRouter.getParam('groupId');
  const event = Events.findOne({ groupId: groupId });
  if(!event) return;

  const participant = event.participants.find((obj) => {
   return obj.userId === Meteor.userId();
  });

  if(event.status === 'ordering' &&
     participant.inviteStatus === 'confirmed' &&
     participant.orderConfirmed !== true) {
   return true;
  } else {
   return false;
  }
 },
 notEmpty() {
  const groupId = FlowRouter.getParam('groupId');
  const event = Events.findOne({ groupId: groupId });
  if(!event) return;

  const participant = event.participants.find((obj) => {
   return obj.userId === Meteor.userId();
  });

  if(participant.items.length !== 0) {
   return true;
  } else {
   return false;
  }
 },
});

Template.orderList.events({
 'click #confirmOrder'() {
  const groupId = FlowRouter.getParam('groupId');
  const event = Events.findOne({ groupId: groupId });
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
  const groupId = FlowRouter.getParam('groupId');
  const event = Events.findOne({ groupId: groupId });
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
