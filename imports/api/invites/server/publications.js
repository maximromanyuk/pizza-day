import { Meteor } from 'meteor/meteor';

import { Invites } from '../invites.js';

Meteor.publish("invites", function() {
  return Invites.find({inviteTo: this.userId});
});