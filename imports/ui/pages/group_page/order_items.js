import { Template } from 'meteor/templating';

import { Events } from '../../../api/events/events.js';

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
});
