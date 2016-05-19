import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Materialize } from 'meteor/materialize:materialize';
import { $ } from 'meteor/jquery';

import { Groups } from '../../../api/groups/groups.js';
import { Invites } from  '../../../api/invites/invites.js';

import './invite_card.html';
import './invite_card.css';

Template.inviteCard.events({
	'click #acceptInv'() {
		Meteor.call('groups.addUser',
		 this.groupId, this.inviteTo, (err, res) => {
			if(err) {
				console.log(err);
			} else {
				Meteor.call('invites.remove', this._id);
				Materialize.toast('Invitation accepted!', 4000);
			}
		})
	},
	'click #declineInv'() {
		Meteor.call('invites.remove', this._id, (err, res) => {
			if(err) {
				console.log(err);
			} else {
				Materialize.toast('Invitation declined.', 4000);
			}
		});
	},
});