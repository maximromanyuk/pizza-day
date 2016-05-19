import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Invites } from '../../../api/invites/invites.js';

import './invites_list.html';

import './invite_card.js';

Template.invitesList.helpers({
	invites() {
		return Invites.find();
	}
});