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