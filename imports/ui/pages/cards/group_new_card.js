import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './group_new_card.html';
import './group_new_card.css';

Template.group_new_card.events({
	'submit .create_group': function(e) {
		e.preventDefault();

		let text = e.target.group_name.value;
		alert(`Form confirmed! Group name: ${text}`);
		
		e.target.group_name.value = '';
		$('#group_name').prop('disabled', true);
	},
});