import { Template } from 'meteor/templating';

import './order_item.html';

Template.orderItem.helpers({
 canChangeQuantity() {
  // TODO true only when event status === ordering

  // const groupId = FlowRouter.getParam('groupId');
  // const event = Events.findOne(groupId);
  // return event.status === 'ordering';
  return true;
 },
});

Template.orderItem.events({
 'click #addOne'() {
 // TODO add one more to order
 },
 'click #removeOne'() {
// TODO delete one from order
 },
});
