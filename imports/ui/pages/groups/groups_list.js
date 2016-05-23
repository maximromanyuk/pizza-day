import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Groups } from '../../../api/groups/groups.js';

import './groups_list.html';

import './group_card.js';
import './group_new_card.js';

Template.groupsList.onCreated(() => {
 Meteor.subscribe('groups');
});

Template.groupsList.helpers({
 groups() {
  return Groups.find();
 },
});
