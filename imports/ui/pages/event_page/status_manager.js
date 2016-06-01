import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './status_manager.html';

Template.statusManager.onRendered(() => {
 $('.datepicker').pickadate({
  firstDay: 1,
  // format: 'dd/mm/yyyy',
 });

 $('.dropdown-button').dropdown({
  inDuration: 300,
  outDuration: 225,
  constrain_width: false, // Does not change width of dropdown to that of the activator
  gutter: 0, // Spacing from edge
  belowOrigin: false, // Displays dropdown below the button
 });
 $('.tooltipped').tooltip({delay: 50});
});

Template.statusManager.events({
 'change #date'(evt) {
  // TODO at date change, refresh data in db
  // const choosedDate = new Date(evt.target.value);
  // setNewDate.call({ newDate: choosedDate, });
 },
 'click #orderDropdown'(evt) {
  const status = evt.target.text;
  console.log(status);
  // setNewStatus.call({ newStatus: status, });
 },
});
