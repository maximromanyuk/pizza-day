import { Template } from 'meteor/templating';
import { Materialize } from 'meteor/materialize:materialize';

import { Events } from '../../../api/events/events.js';

import { setEventInvitationStatus } from '../../../api/events/methods.js';
import { confirmOrder } from '../../../api/events/methods.js';

import './order_items.html';
import './order_item.js';

Template.orderItems.helpers({
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
});

Template.orderItems.events({
 'click #confirmOrder'() {
  const groupId = FlowRouter.getParam('groupId');
  const event = Events.findOne({ groupId: groupId });
  if(!event) return;

  confirmOrder.call({
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

  setEventInvitationStatus.call({
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
