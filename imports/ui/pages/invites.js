import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './invites.html';

import './cards/invite_card.js';

Template.invites.onCreated(function invitesOnCreated() {
	Meteor.subscribe('invites');
});

Template.invites.helpers({
	invites() {
		//TODO
		// return Invites.find();
		return [{inviter: 'Maksim', group: 'JSSolutions'}];
	}
});