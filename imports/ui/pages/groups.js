import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Groups } from '../../api/groups/groups.js';

import './groups.html';

import './cards/group_card.js';
import './cards/group_new_card.js';

Template.groups.onCreated(function groupsOnCreated() {
	Meteor.subscribe('groups');
});

Template.groups.helpers({
	groups() {
		return Groups.find();
	},
});