import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Groups } from '../../../api/groups/groups.js';

import './group_card.html';
import './group_card.css';

Template.groupCard.helpers({
	participant() {
		const users = Groups.findOne(this._id).users;
		const currentUser = Meteor.userId();
		
		if(users.indexOf(currentUser) > -1) {
			return true;
		}
	}
});
