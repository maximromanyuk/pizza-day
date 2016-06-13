import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Events } from '../../../api/events/events.js';

import './order_item.html';

Template.orderItem.helpers({
 canChangeQuantity() {
  const event = Events.findOne({
   groupId: FlowRouter.getParam('groupId'),
  });
  if(!event) return;

  const participant = event.participants.find((obj) => {
   return obj.userId === Meteor.userId();
  });

  return event.status === 'ordering' &&
         participant.orderConfirmed !== true;
 },
});

Template.orderItem.events({
 'click #addOne'() {
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
   }
  });
 },

 'click #removeOne'() {
  const event = Events.findOne({
   groupId: FlowRouter.getParam('groupId'),
  });
  if(!event) return;

  Meteor.call('events.addItemToOrder', {
   eventId: event._id,
   name: this.name,
   price: parseInt(this.price, 10),
   quantity: (-1),
  }, (err) => {
   if(err) {
    console.log(err);
   }
  });
 },
});
