import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Groups } from '../../../api/groups/groups.js';

import './group_page.html';

import './menu.js';
import './users.js';

Template.groupPage.onCreated(() => {
	const id = FlowRouter.getParam('groupId');
	Meteor.subscribe('group', id);
});

Template.groupPage.helpers({
	hasGroupCreatorRights() {
		const id = FlowRouter.getParam('groupId');
		if (!Groups.findOne(id)) return;

		return Groups.findOne(id).creator === Meteor.userId();
	},
	status() {
		const id = FlowRouter.getParam('groupId');
		if (!Groups.findOne(id)) return;

		return Groups.findOne(id).event.status;
	},
	date() {
		const id = FlowRouter.getParam('groupId');
		if (!Groups.findOne(id)) return;

		return Groups.findOne(id).event.date;
	},
});
