import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Groups } from '../../../api/groups/groups.js';

import './group_card.html';
import './group_card.css';

Template.groupCard.helpers({
 participant() {
  const groupParticipants = Groups.findOne(this._id).users;

  return groupParticipants.indexOf(Meteor.userId()) > -1;
 },
});
