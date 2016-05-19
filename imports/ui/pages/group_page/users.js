import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Groups } from '../../../api/groups/groups.js';

import './users.html';
import './users_item.js';

Template.users.onCreated(function usersOnCreated() {
	this.subscribe('users');
});

Template.users.helpers({
	usersList() {
		if(!Meteor.user()) return;
		console.log(Meteor.users.findOne());
		return Meteor.users.find();
	},

	groupCreator() {
		let id = FlowRouter.getParam('groupId');
		if (!Groups.findOne(id)) return;
		
		return Groups.findOne().isGroupCreator(id);
	}
});