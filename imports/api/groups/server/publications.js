import { Meteor } from 'meteor/meteor';

import { Groups } '../groups.js';

Meteor.publish("groups", function() {
  return Groups.find();
});