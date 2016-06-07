import { Mongo } from 'meteor/mongo';

import { Invites } from '../invites/invites.js';

class GroupsCollection extends Mongo.Collection {
 remove(selector, callback) {
  Invites.remove({groupId: selector._id});
  return super.remove(selector, callback);
 }
}

export const Groups = new GroupsCollection('groups');

Groups.deny({
 insert() { return true; },
 update() { return true; },
 remove() { return true; },
});
