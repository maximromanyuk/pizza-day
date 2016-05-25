import { Mongo } from 'meteor/mongo';

import { Invites } from '../invites/invites.js';

class GroupsCollection extends Mongo.Collection {
 remove(selector, callback) {
  console.log(selector);
  Invites.remove({groupId: selector._id}, (err) => {
   if(err) {
    console.log(err);
   } else {
    console.log('Invites from this group was removed');
   }
  });
  return super.remove(selector, callback);
 }
}

export const Groups = new GroupsCollection('groups');
