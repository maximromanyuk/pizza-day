import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Materialize } from 'meteor/materialize:materialize';
import { $ } from 'meteor/jquery';

import { Groups } from '../../../api/groups/groups.js';
import { Events } from '../../../api/events/events.js';

import './users.html';
import './users_item.js';

Template.users.onCreated(() => {
 Meteor.subscribe('users');
});

Template.users.onRendered(() => {
 $('.modal-trigger').leanModal();
});

Template.users.helpers({
 usersList() {
  if(!Meteor.user()) return;

  return Meteor.users.find();
 },
 participantsList() {
  const id = FlowRouter.getParam('groupId');
  if (!Groups.findOne(id)) return;

		// in group object we hold just participants ids,
		// in cycle we get users with name & logo from googleAPI
  let users = [];
  const usersIds = Groups.findOne(id).users;
  for(const usrId of usersIds) {
   users.push(Meteor.users.findOne(usrId));
  }

  return users;
 },

 hasGroupCreatorRights() {
  const id = FlowRouter.getParam('groupId');
  if (!Groups.findOne(id)) return;

  return Groups.findOne(id).creator === Meteor.userId();
 },

 eventNotStarted() {
  const groupId = FlowRouter.getParam('groupId');
  const event = Events.findOne({ groupId });
  if(!event) return true;

  return (event.status === 'delivered' || event.status === '');
 },
});

Template.users.events({
 'click #addParticipant'() {
	// initialize dropdown
  $('select').material_select();
	// open modal window
  $('#modal1').openModal();
 },

 'submit #user-choose'(evt) {
  evt.preventDefault();

  const groupId = FlowRouter.getParam('groupId');
  const selectedUsrId = $('#user-select').val();

  Meteor.call('invites.checkForInvite', {
   userId: selectedUsrId,
   toGroupWithId: groupId,
  }, (err) => {
   if(err) {
    if(err.error === 'validation-error') {
     Materialize.toast('Please, choose user to invite!', 4000);
    } else if(err.error === 'usrInGroupAlready') {
     Materialize.toast('This user participates already!', 4000);
    } else if(err.error === 'usrWasInvitedEarlier') {
     Materialize.toast('This user invited already!', 4000);
    } else {
     console.log(err);
    }
   } else {
    Meteor.call('invites.invite', {
     groupId,
     invitedId: selectedUsrId,
    }, (err) => {
     if(err) {
      console.log(err);
     } else {
      Materialize.toast('Invite send!', 4000);
      Materialize.toast('Send one more or close popup', 4000);
     }
    });
   }
  });
 },
});
