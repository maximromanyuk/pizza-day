import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Groups } from '../groups.js';

Meteor.publish('groups', () => {
 return Groups.find();
});

Meteor.publish('group', (id) => {
 check(id, String);

 return Groups.find(id);
});
