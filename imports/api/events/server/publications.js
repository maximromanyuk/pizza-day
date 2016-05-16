import { Meteor } from 'meteor/meteor';

import { Events } '../events.js';

Meteor.publish("events", function() {
  return Events.find();
});