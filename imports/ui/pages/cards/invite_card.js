import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './invite_card.html';
import './invite_card.css';

Template.invite_card.helpers({
	
});

Template.invite_card.events({
	'click #acceptInv'() {
		Materialize.toast('Invitation accepted!', 4000)
	},
	'click #declineInv'() {
		Materialize.toast('Invitation declined.', 4000)
	},
});