import { Meteor } from 'meteor/meteor';
import { Materialize } from 'meteor/materialize:materialize';

import { Invites } from '../../api/invites/invites.js';

Meteor.startup(() => {
	(function() {
		var initializing = true;
  		Invites.find().observeChanges({
    		added() {
      			if (!initializing) {
        			Materialize.toast('New invite!', 4000);
      			}
    		}
  	});
  	initializing = false;
	})();
});
