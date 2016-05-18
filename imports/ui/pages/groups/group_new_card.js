import { Template } from 'meteor/templating';
import { Materialize } from 'meteor/materialize:materialize';
import { $ } from 'meteor/jquery';

import './group_new_card.html';
import './group_new_card.css';

Template.groupNewCard.events({
	'submit .createGroup': function(e) {
		e.preventDefault();

		const groupName = e.target.group_name.value;
		//TODO: check if it is a real link
		const logoUrl = e.target.logo_url.value;
		
		e.target.group_name.value = '';
		e.target.logo_url.value = '';
		// disable input after creating
		// $('#group_name').prop('disabled', true);

		Meteor.call('groups.insert', 
			groupName,
			logoUrl,
			(err, res) => {
			 	if(err) {
			 		alert(err);
			 	} else {
					Materialize.toast(`Group '${groupName}' created!`, 4000);
			 	}
			 });
	},
});