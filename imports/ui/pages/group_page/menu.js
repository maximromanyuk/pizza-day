import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Groups } from '../../../api/groups/groups.js';

import './menu.html';
import './menu_item.js';
import './menu_add_new_item.js';

Template.menu.helpers({
	menuItems() {
		const groupId = FlowRouter.getParam('groupId');
		if (!Groups.findOne(groupId)) return;
		
		return Groups.findOne(groupId).menuItems;
	}
});