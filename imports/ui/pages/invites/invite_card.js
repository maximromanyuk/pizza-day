import { Template } from 'meteor/templating';
import { Materialize } from 'meteor/materialize:materialize';

import './invite_card.html';
import './invite_card.css';

Template.inviteCard.helpers({
 date() {
  return moment(this.date).format('D MMM, YYYY');
 },
});

Template.inviteCard.events({
 'click #acceptGroupInv'() {
  Meteor.call('groups.addUser', {
   groupId: this.groupId,
   inviteTo: this.inviteTo,
  }, (err) => {
   if(err) {
    console.log(err);
   } else {
    Meteor.call('invites.remove', {
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

 'click #declineGroupInv'() {
  Meteor.call('invites.remove', {
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
  Meteor.call('events.updateParticipantStatus', {
   eventId: this.eventId,
   inviteTo: this.inviteTo,
   newStatus: 'confirmed',
  }, (err) => {
   if(err) {
    console.log(err);
   } else {
    Meteor.call('invites.remove', {
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
  Meteor.call('events.updateParticipantStatus', {
   eventId: this.eventId,
   inviteTo: this.inviteTo,
   newStatus: 'discarded',
  }, (err) => {
   if(err) {
    console.log(err);
   } else {
    Meteor.call('invites.remove', {
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
