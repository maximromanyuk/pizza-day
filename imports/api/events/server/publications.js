import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Events } from '../events.js';

Meteor.publish('event', (groupId) => {
 check(groupId, String);

 return Events.find({ groupId: groupId });
});
