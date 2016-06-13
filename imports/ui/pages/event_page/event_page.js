import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Materialize } from 'meteor/materialize:materialize';

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
  return !Events.findOne({
   groupId: FlowRouter.getParam('groupId'),
  });
 },
});

Template.eventPage.events({
 'click #createEvent'() {
  const groupId = FlowRouter.getParam('groupId');
  Meteor.call('events.createNew', {
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
