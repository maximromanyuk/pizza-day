import { Template } from 'meteor/templating';
import { Materialize } from 'meteor/materialize:materialize';

import { addUserToGroup } from '../../../api/groups/methods.js';
import { removeInvite } from '../../../api/invites/methods.js';
import { setEventInvitationStatus } from '../../../api/events/methods.js';

import './invite_card.html';
import './invite_card.css';

Template.inviteCard.helpers({
  date() {
    return moment(this.date).format('D MMM, YYYY');
  }
});

Template.inviteCard.events({
 'click #acceptInv'() {
  addUserToGroup.call({
   groupId: this.groupId,
   inviteTo: this.inviteTo,
  }, (err) => {
   if(err) {
    console.log(err);
   } else {
    removeInvite.call({
     inviteId: this._id,
    }, (err) => {
     if(err) {
      console.log(err);
     }
    });
    Materialize.toast('Invitation accepted!', 4000);
   }
  });
 },

 'click #declineInv'() {
  removeInvite.call({
   inviteId: this._id,
  }, (err) => {
   if(err) {
				console.log(err);
   } else {
    Materialize.toast('Invitation declined.', 4000);
   }
  });
 },

 'click #acceptEventInv'() {
  setEventInvitationStatus.call({
   eventId: this.eventId,
   inviteTo: this.inviteTo,
   newStatus: 'confirmed',
  }, (err) => {
   if(err) {
    console.log(err);
   } else {
    removeInvite.call({
     inviteId: this._id,
    }, (err) => {
     if(err) {
      console.log(err);
     }
    });
    Materialize.toast('Participating in event now!', 4000);
   }
  });
 },

 'click #declineEventInv'() {
  setEventInvitationStatus.call({
   eventId: this.eventId,
   inviteTo: this.inviteTo,
   newStatus: 'discarded',
  }, (err) => {
   if(err) {
    console.log(err);
   } else {
    removeInvite.call({
     inviteId: this._id,
    }, (err) => {
     if(err) {
      console.log(err);
     }
    });
    Materialize.toast('Participation discarded', 4000);
   }
  });
 },
});
