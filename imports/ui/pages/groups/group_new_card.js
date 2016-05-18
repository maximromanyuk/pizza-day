import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './group_new_card.html';
import './group_new_card.css';

Template.groupNewCard.events({
	'submit .create_group': function(e) {
		e.preventDefault();

		let groupName = e.target.group_name.value;
		Materialize.toast(`Group '${groupName}' created!`, 4000)
		
		e.target.group_name.value = '';
		// disable input after creating
		// $('#group_name').prop('disabled', true);

		Meteor.call('groups.insert', groupName);
	},
});