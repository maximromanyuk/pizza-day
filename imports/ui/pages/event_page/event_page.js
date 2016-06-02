import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Materialize } from 'meteor/materialize:materialize';

import { createEvent } from '../../../api/events/methods.js';

import { Events } from '../../../api/events/events.js';

import './event_page.html';
import './status_manager.js';
import './users_statuses_list.js';

Template.eventPage.onCreated(() => {
 this.getGroupId = () => FlowRouter.getParam('groupId');

 Tracker.autorun(() => {
  Meteor.subscribe('event', this.getGroupId());
 });
});

Template.eventPage.helpers({
 canCreateNewEvent() {
  // TODO if no event for current group, return true
  const groupId = FlowRouter.getParam('groupId');
  if(Events.findOne({ groupId: groupId })) {
   return false;
  } else {
   return true;
  }
 },
});

Template.eventPage.events({
 'click #createEvent'() {
  // TODO create new event
  const groupId = FlowRouter.getParam('groupId');
  createEvent.call({
   groupId,
  }, (err) => {
   if(err) {
    Materialize.toast(err.error, 4000);
   } else {
    Materialize.toast('Event created!', 4000);
   }
  });
 },
});
