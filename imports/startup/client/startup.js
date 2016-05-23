import { Meteor } from 'meteor/meteor';
import { Materialize } from 'meteor/materialize:materialize';

import { Invites } from '../../api/invites/invites.js';

Meteor.startup(() => {
 (function() {
  let initializing = true;
  Invites.find().observeChanges({
   added(id, fields) {
    if(fields.inviteTo === Meteor.userId()) {
     if (!initializing) {
      Materialize.toast('New invite!', 4000);
     }
    }
   },
  });
  initializing = false;
 })();
});
