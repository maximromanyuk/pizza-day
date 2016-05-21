import { Template } from 'meteor/templating';
import { Materialize } from 'meteor/materialize:materialize';
import { $ } from 'meteor/jquery';

import { imageUrlValidator } from '../../../modules/imageUrlValidator.js';

import { createNewGroup } from '../../../api/groups/methods.js';

import './group_new_card.html';
import './group_new_card.css';

Template.groupNewCard.events({
	'submit .createGroup': function(e) {
		e.preventDefault();

		const name = e.target.group_name.value;
		const logoUrl = e.target.logo_url.value;

		// check for empty fields		
		if(_.isEmpty(name) || _.isEmpty(logoUrl)) {
			Materialize.toast('Fill 2 fields, stupid!', 4000);
			return;
		}

		// check if url - image
		imageUrlValidator(logoUrl, (res) => {
			if(res === false) {
				Materialize.toast('Invalid logo url, try another!', 4000);
				return;
			} else {
				e.target.group_name.value = '';
				e.target.logo_url.value = '';

				createNewGroup.call({
					groupName: name,
					logoUrl: logoUrl
				}, (err, res) => {
					if(err) {
							alert(err);
						} else {
							Materialize.toast(`Group '${name}' created!`, 4000);
						}
				});
			}
		});
	},
});