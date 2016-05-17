import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './invite_card.html';
import './invite_card.css';

Template.invite_card.helpers({
	inviteFrom() {
		return 'John';
	},
	inviteTo() {
		return 'GDG Group';
	},
});

Template.invite_card.events({
	// TODO: catch clicks on Accept and Decline links
	'click #acceptInv'() {
		Materialize.toast('Invitation accepted!', 4000)
	},
});