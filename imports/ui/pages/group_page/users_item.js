import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Groups } from '../../../api/groups/groups.js';

import './users_item.html';

Template.usersItem.helpers({
	groupCreator() {
		const id = FlowRouter.getParam('groupId');
		if (!Groups.findOne(id)) return;
		
		return Groups.findOne().isGroupCreator(id);
	},
});

Template.usersItem.events({
	'click #removeUser'() {
		const groupId = FlowRouter.getParam('groupId');
		if (!Groups.findOne(groupId)) return;

		Meteor.call('groups.removeUser', groupId, this._id, (err, res) => {
			if(err) {
				console.log(err);
			} else {
				Materialize.toast('Participant removed', 4000);
			}
		});
	},
});