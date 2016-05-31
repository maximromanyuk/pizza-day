import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Materialize } from 'meteor/materialize:materialize';

import { Groups } from '../../../api/groups/groups.js';
import { removeGroup } from '../../../api/groups/methods.js';
import { removeUserFromGroup } from '../../../api/groups/methods.js';

import './group_page.html';

import './menu.js';
import './users.js';
import './order_items.js';

Template.groupPage.onRendered(() => {
 $('.modal-trigger').leanModal();
});

Template.groupPage.onCreated(() => {
 this.getGroupId = () => FlowRouter.getParam('groupId');

 Tracker.autorun(() => {
  Meteor.subscribe('group', this.getGroupId());
 });
});

Template.groupPage.helpers({
 groupId() {
   return FlowRouter.getParam('groupId');
 },
 hasGroupCreatorRights() {
  const id = FlowRouter.getParam('groupId');
		if (!Groups.findOne(id)) return;

		return Groups.findOne(id).creator === Meteor.userId();
	},
	status() {
		const id = FlowRouter.getParam('groupId');
		if (!Groups.findOne(id).event.status) return;

		return Groups.findOne(id).event.status;
	},
	date() {
		const id = FlowRouter.getParam('groupId');
		if (!Groups.findOne(id).event.date) return;

		return Groups.findOne(id).event.date;
	},
  name() {
    const id = FlowRouter.getParam('groupId');
		if (!Groups.findOne(id).name) return;

		return Groups.findOne(id).name;
  },
  activeEvent() {
    // TODO return true only when event status === 'ordering' / 'ordered' / 'delivering'

    // const groupId = FlowRouter.getParam('groupId');
    // const event = Events.findOne(groupId);
    // return event.status === 'ordering' || 'ordered' || 'delivering';
    return true;
  },
});

Template.groupPage.events({
 'click #deleteGroup'() {
  const groupId = FlowRouter.getParam('groupId');

  removeGroup.call({
   groupId,
  }, (err) => {
   if(err) {
    console.log(err);
   } else {
    FlowRouter.go('groups');
    Materialize.toast('Group removed permanently', 4000);
   }
  });
 },
 'click #leaveOrRemoveGroupModal'() {
  // $('#modal2').appendTo('body');
  // $('#modal2').css('z-index', '1500');
  $('#modal2').openModal();
 },
 'click #leaveGroup'() {
  const groupId = FlowRouter.getParam('groupId');
  const userId = Meteor.userId();
  removeUserFromGroup.call({
   groupId,
   userId,
  }, (err) => {
   if(err) {
    console.log(err);
   } else {
    FlowRouter.go('groups');
    Materialize.toast('You leaved...', 4000);
   }
  });
 },
});
