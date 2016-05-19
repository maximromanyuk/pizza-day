import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { $ } from 'meteor/jquery';
import { _ } from 'meteor/underscore';

import { Groups } from '../../../api/groups/groups.js';
import { Invites } from '../../../api/invites/invites.js';

import './users.html';
import './users_item.js';

Template.users.onCreated(function usersOnCreated() {
	this.subscribe('users');
});

Template.users.rendered = function() {
	$('.modal-trigger').leanModal();
}

Template.users.helpers({
	usersList() {
		if(!Meteor.user()) return;

		return Meteor.users.find();
	},
	participantsList() {
		let groupId = FlowRouter.getParam('groupId');
		if (!Groups.findOne(groupId)) return;

		let users = Groups.findOne(groupId).users;

		let fullUsers = [];
		for(let i=0; i<users.length; i++) {
			fullUsers.push(Meteor.users.findOne(users[i]));
		}
		
		return fullUsers;
	},

	groupCreator() {
		let groupId = FlowRouter.getParam('groupId');
		if (!Groups.findOne(groupId)) return;
		
		return Groups.findOne().isGroupCreator(groupId);
	}
});

Template.users.events({
	'click #addParticipant'() {
		// initialize dropdown
		$('select').material_select();
		// open modal window
		$('#modal1').openModal();
	},

	'submit #user-choose'(e, template) {
		e.preventDefault();

		let groupId = FlowRouter.getParam('groupId');
		let selectedUsrId = $('#user-select').val();

		Meteor.call('invites.invite', groupId, selectedUsrId, function(err, res) {
			if(err) {
				console.log(err);
			} else {
				Materialize.toast('Invite send!', 4000);
				Materialize.toast('Send one more or close popup', 4000)
			}
		});
	}
});


		
