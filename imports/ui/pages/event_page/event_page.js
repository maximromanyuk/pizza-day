import './event_page.html';
import './status_manager.js';
import './users_statuses_list.js';

Template.eventPage.helpers({
 canCreateNewEvent() {
  // TODO if no event for current group, return true
  return true;
 },
});

Template.eventPage.events({
 'click #createEvent'() {
  // TODO create new event
 },
});
