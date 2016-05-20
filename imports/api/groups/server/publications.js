import { Meteor } from 'meteor/meteor';

import { Groups } from '../groups.js';

Meteor.publish("groups", () => {
  return Groups.find();
});

Meteor.publish("group", (id) => {
  return Groups.find(id);
});