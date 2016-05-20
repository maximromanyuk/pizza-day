import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { $ } from 'meteor/jquery';

import { Groups } from '../../../api/groups/groups.js';
import { Invites } from '../../../api/invites/invites.js';

import './users.html';
import './users_item.js';

Template.users.onCreated(() => {
	Meteor.subscribe('users');
});

Template.users.rendered = () => {
	$('.modal-trigger').leanModal();
}

Template.users.helpers({
	usersList() {
		if(!Meteor.user()) return;

		return Meteor.users.find();
	},
	// only users who take part in group
	participantsList() {
		const id = FlowRouter.getParam('groupId');
		if (!Groups.findOne(id)) return;

		// in group object we hold just participants ids,
		// in cycle we get users with name & logo from googleAPI
		let users = [];
		const usersIds = Groups.findOne(id).users;
		for(let i=0; i<usersIds.length; i++) {
			users.push(Meteor.users.findOne(usersIds[i]));
		}
		
		return users;
	},

	hasGroupCreatorRights() {
		const id = FlowRouter.getParam('groupId');
		if (!Groups.findOne(id)) return;
		
		return Groups.findOne(id).creator === Meteor.userId();
	},
});

Template.users.events({
	'click #addParticipant'() {
		// initialize dropdown
		$('select').material_select();
		// open modal window
		$('#modal1').openModal();
	},

	'submit #user-choose'(e) {
		e.preventDefault();

		const groupId = FlowRouter.getParam('groupId');
		const selectedUsrId = $('#user-select').val();

		// if user wasn`t selected
		if(selectedUsrId == null) {
			Materialize.toast('Please, choose user to invite!', 4000);
			return;
		}

		// check maybe this user already in group
		const users = Groups.findOne(groupId).users;
		if(users.includes(selectedUsrId)) {
			Materialize.toast('This user participates already!', 4000);
			return;
		}

		Meteor.call('invites.invite', groupId, selectedUsrId, (err, res) => {
			if(err) {
				console.log(err);
			} else {
				Materialize.toast('Invite send!', 4000);
				Materialize.toast('Send one more or close popup', 4000)
			}
		});
	},
});


		
