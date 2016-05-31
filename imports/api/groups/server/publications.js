import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Groups } from '../groups.js';

Groups.publicFields = {
 name: 1,
 logoUrl: 1,
 users: 1,
};

Meteor.publish('groups', () => {
 return Groups.find({}, {
  fields: Groups.publicFields,
 });
});

Meteor.publish('group', (id) => {
 check(id, String);

 return Groups.find(id);
});
