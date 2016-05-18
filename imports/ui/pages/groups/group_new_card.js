import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './group_new_card.html';
import './group_new_card.css';

Template.groupNewCard.rendered=function() {
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
}

Template.groupNewCard.events({
	'submit .createGroup': function(e) {
		e.preventDefault();

		let groupName = e.target.group_name.value;
		//TODO: check if it is a real link
		let logoUrl = e.target.logo_url.value;
		Materialize.toast(`Group '${groupName}' created! ${logoUrl}`, 4000)
		
		e.target.group_name.value = '';
		e.target.logo_url.value = '';
		// disable input after creating
		// $('#group_name').prop('disabled', true);

		// Meteor.call('groups.insert', groupName);
	},
});