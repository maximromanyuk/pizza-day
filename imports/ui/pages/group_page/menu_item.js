import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Materialize } from 'meteor/materialize:materialize';

import { Events } from '../../../api/events/events.js';

import { removeItemFromMenu } from '../../../api/groups/methods.js';

import './menu_item.html';

Template.menuItem.helpers({
 canAddToOrder() {
 // show addToOrder button only when event on 'ordering' stage
  const groupId = FlowRouter.getParam('groupId');
  const event = Events.findOne({ groupId: groupId });
  if(!event) return;

  if(event.status === 'ordering') {
   return true;
  } else {
   return false;
  }
 },
});

Template.menuItem.events({
 'click #addToOrder'() {
    // TODO
 },
 'click #delete'() {
  const groupId = FlowRouter.getParam('groupId');

  removeItemFromMenu.call({
   groupId,
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
