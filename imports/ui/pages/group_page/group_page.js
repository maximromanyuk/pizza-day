import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Tracker } from 'meteor/tracker';

import { Groups } from '../../../api/groups/groups.js';

import './group_page.html';

import './menu.js';
import './users.js';

Template.groupPage.onCreated(function groupPageOnCreated() {
	this.autorun(() => {
		const id = FlowRouter.getParam('groupId');
		this.subscribe('group', id);
	});
});

Template.groupPage.helpers({
	groupCreator() {
		let id = FlowRouter.getParam('groupId');
		if (!Groups.findOne(id)) return;
		
		return Groups.findOne().isGroupCreator(id);
	}
});