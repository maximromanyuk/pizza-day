import { Meteor } from 'meteor/meteor';

import { Invites } from '../invites.js';

Meteor.publish("invites", () => {
  return Invites.find({inviteTo: this.userId});
});