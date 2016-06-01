import { Template } from 'meteor/templating';

import './users_statuses_list.html';

Template.usersStatusesList.helpers({
 usersStatuses() {
// TODO return participantsList
  return [{
   name: 'Gregory',
   logoUrl: '',
   status: 'confirmed',
  }, {
   name: 'Vovan',
   logoUrl: '',
   status: 'discarded',
  }, {
   name: 'Kakon',
   logoUrl: '',
   status: 'sended',
  }];
 },
});

Template.userStatus.helpers({
 confirmed() {
  // TODO check in some collection for participant status
 },
 discarded() {

 },
});
