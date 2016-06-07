import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';
import { Materialize } from 'meteor/materialize:materialize';

import { Events } from './events.js';
import { Groups } from '../groups/groups.js';

import { inviteUserToEvent } from '../invites/methods.js';

export const createEvent = new ValidatedMethod({
 name: 'events.insert',

 mixins: [LoggedInMixin],

 checkLoggedInError: {
  error: 'notLogged',
 },

 validate: new SimpleSchema({
  groupId: { type: String },
 }).validator(),

 run({ groupId }) {
  if(Events.findOne({ groupId: groupId })) {
   throw new Meteor.Error('Event already started!');
  }
  const users = Groups.findOne(groupId).users;
  // make structure for participants collection in event
  let participants = [];
  for(let userId of users) {
   participants.push({
    userId,
    inviteStatus: 'sended',
    items: [],
   });
  }
  Events.insert({
   groupId,
   date: new Date(),
   status: 'ordering',
   participants,
  });
  inviteToEvent(groupId, users);
 },
});

const inviteToEvent = function(groupId, users) {
 for(let userId of users) {
  inviteUserToEvent.call({
    groupId,
    userId,
  }, (err) => {
    if(err) {
      console.log(err)
    }
  });
 }
};

export const setNewDate = new ValidatedMethod({
 name: 'events.updateDate',

 mixins: [LoggedInMixin],

 checkLoggedInError: {
  error: 'notLogged',
 },

 validate: new SimpleSchema({
  groupId: { type: String },
   // TODO newStatus can be ONLY: ordering || ordered ||
   // delivering || delivered
  newDate: { type: Date },
 }).validator(),

 run({ groupId, newDate }) {
  Events.update({ groupId: groupId }, {
   $set: { date: newDate },
  });
 },
});

export const setEventInvitationStatus = new ValidatedMethod({
 name: 'events.updateParticipantStatus',

 mixins: [LoggedInMixin],

 checkLoggedInError: {
  error: 'notLogged',
 },

 validate: new SimpleSchema({
  eventId: { type: String },
  inviteTo: { type: String },
  newStatus: { type: String },
 }).validator(),

 run({ eventId, inviteTo, newStatus }) {
  Events.update(
    {  '_id': eventId, 'participants.userId': inviteTo },
   {
    $set: { 'participants.$.inviteStatus': newStatus },
   });
 },
});

export const addToOrder = new ValidatedMethod({
 name: 'events.addItemToOrder',

 mixins: [LoggedInMixin],

 checkLoggedInError: {
  error: 'notLogged',
 },

 validate: new SimpleSchema({
  eventId: { type: String },
  name: { type: String },
  price: { type: Number },
  quantity: { type: Number },
 }).validator(),

 run({ eventId, name, price, quantity }) {
  const event = Events.findOne(eventId);
  const participant = event.participants.find((obj) => {
   return obj.userId === Meteor.userId();
  });
  const orderItems = participant.items;

  const orderItem = orderItems.find((obj) => {
   return obj.name === name;
  });

  // if no such item in order -> push item to collection
  if(orderItem === undefined) {
   Events.update(
     {  '_id': eventId, 'participants.userId': Meteor.userId() },
    {
     $push: {'participants.$.items': {
      name,
      price,
      quantity,
     }},
    }
  );
  } else {
   const newQuantity = orderItem.quantity + quantity;
   // delete
   Events.update(
      {  '_id': eventId, 'participants.userId': Meteor.userId() },
    {
     $pull: {'participants.$.items': {
      name,
     }},
    }
   );
   // add with new quantity
   if(newQuantity > 0) {
    Events.update(
      {  '_id': eventId, 'participants.userId': Meteor.userId() },
     {
      $push: {'participants.$.items': {
       name,
       price,
       quantity: newQuantity,
      }},
     }
   );
   }
  }
 },
});

export const confirmOrder = new ValidatedMethod({
 name: 'events.confirmParticipantOrder',

 mixins: [LoggedInMixin],

 checkLoggedInError: {
  error: 'notLogged',
 },

 validate: new SimpleSchema({
  groupId: { type: String },
  orderConfirmed: { type: Boolean },
 }).validator(),

 run({ groupId, orderConfirmed }) {
  const event = Events.findOne({ groupId: groupId });
  Events.update(
    {  '_id': event._id, 'participants.userId': Meteor.userId() },
   {
    $set: { 'participants.$.orderConfirmed': orderConfirmed },
   });

   checkOrderingStatus(groupId);
 },
});

const checkOrderingStatus = function(groupId) {
 const event = Events.findOne({ groupId: groupId });

 const everyoneConfirmOrder = event.participants.every((obj) => {
  return obj.orderConfirmed === true;
 });
 if(everyoneConfirmOrder) { // each participant confirmed order
  Meteor.call('events.updateStatus',
   { groupId, newStatus: 'ordered' });
 }
};
