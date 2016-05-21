import { Meteor } from 'meteor/meteor';
import { Materialize } from 'materialize:materialize';

import { Invites } from '../../api/invites/invites.js';

Meteor.startup(() => {
	Invites.find().observechanges({
		added: function() {
			Materialize.toast('New invite!', 4000);
		}
	});
});