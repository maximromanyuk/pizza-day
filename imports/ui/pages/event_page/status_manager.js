import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Materialize } from 'meteor/materialize:materialize';
import { $ } from 'meteor/jquery';

import { Events } from '../../../api/events/events.js';

import './status_manager.html';

Template.statusManager.onRendered(() => {
 const event = Events.findOne({
  groupId: FlowRouter.getParam('groupId'),
 });

 // initialize datepicker
 const $dateInput = $('.datepicker').pickadate({
  firstDay: 1,
 });
 // Use the picker object directly
 const picker = $dateInput.pickadate('picker');
 // set actual event date
 picker.set('select', event.date);

 // initialize dropdown-button
 $('.dropdown-button').dropdown({
  inDuration: 300,
  outDuration: 225,
  constrain_width: false, // Does not change width of dropdown to that of the activator
  gutter: 0, // Spacing from edge
  belowOrigin: false, // Displays dropdown below the button
 });
 $('.tooltipped').tooltip({delay: 50});
});

Template.statusManager.helpers({
 status() {
  const event = Events.findOne({
   groupId: FlowRouter.getParam('groupId'),
  });
  if(!event) return;

  return event.status;
 },
});

Template.statusManager.events({
 'change #date'(evt) {
  const groupId = FlowRouter.getParam('groupId');
  // At date change, refresh data in db
  const choosedDate = new Date(evt.target.value);
  Meteor.call('events.updateDate', {
   groupId,
   newDate: choosedDate,
  }, (err) => {
   if(err) {
    console.log(err);
   }
  });
 },

 'click #orderDropdown'(evt) {
  const groupId = FlowRouter.getParam('groupId');
  const status = evt.target.text;
  Meteor.call('events.updateStatus', {
   groupId,
   newStatus: status,
  }, (err) => {
   if(err) {
    console.log(err);
   } else {
    Materialize.toast(`Event status: ${status}!`, 4000);
   }
  });
 },
});
