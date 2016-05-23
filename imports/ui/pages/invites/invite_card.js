import { Template } from 'meteor/templating';
import { Materialize } from 'meteor/materialize:materialize';

import { addUserToGroup } from '../../../api/groups/methods.js';
import { removeInvite } from '../../../api/invites/methods.js';

import './invite_card.html';
import './invite_card.css';

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
});
