import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Materialize } from 'meteor/materialize:materialize';

import { Events } from '../../../api/events/events.js';

import './menu_item.html';

Template.menuItem.helpers({
 canAddToOrder() {
  const groupId = FlowRouter.getParam('groupId');
  const event = Events.findOne({ groupId: groupId });
  if(!event) return;

  const participant = event.participants.find((obj) => {
   return obj.userId === Meteor.userId();
  });

  if(event.status === 'ordering' &&
     participant.inviteStatus === 'confirmed') {
   return true;
  } else {
   return false;
  }
 },
});

Template.menuItem.events({
 'click #addToOrder'() {
  const groupId = FlowRouter.getParam('groupId');
  const event = Events.findOne({ groupId: groupId });
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
});
