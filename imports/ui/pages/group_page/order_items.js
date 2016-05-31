import { Template } from 'meteor/templating';

import './order_items.html';
import './order_item.js';

Template.orderItems.helpers({
 orderItems() {
   // TODO return items owned by user in his orderItems

  //  const groupId = FlowRouter.getParam('groupId');
  //  const event = Events.findOne(groupId);
  //  const user = event.participants.find((obj) => {
  //    return obj.userId === Meteor.userId();
  //  });
  //  return user.items;

  return [{name: 'Neopolitano', price: 80}, {name: 'Cola', price: 10}];
 },
});
