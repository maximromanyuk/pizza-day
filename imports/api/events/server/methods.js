import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';
import { Email } from 'meteor/email';
import { SSR } from 'meteor/meteorhacks:ssr';

import { Events } from '../events.js';
import { Groups } from '../../groups/groups.js';

export const createEvent = new ValidatedMethod({
 name: 'events.createNew',

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

const inviteToEvent = (groupId, users) => {
 for(let userId of users) {
  Meteor.call('invites.inviteToEvent', {
   groupId,
   userId,
  }, (err) => {
   if(err) {
    console.log(err);
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
   // TODO find better way
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

const checkOrderingStatus = (groupId) => {
 const event = Events.findOne({ groupId: groupId });

 const everyoneConfirmOrder = event.participants.every((obj) => {
  return obj.orderConfirmed === true;
 });
 if(everyoneConfirmOrder) { // each participant confirmed order
  Meteor.call('events.updateStatus',
   { groupId, newStatus: 'ordered' });
 }
};

export const setNewStatus = new ValidatedMethod({
 name: 'events.updateStatus',

 mixins: [LoggedInMixin],

 checkLoggedInError: {
  error: 'notLogged',
 },

 validate: new SimpleSchema({
  groupId: { type: String },
   // TODO newStatus can be ONLY: ordering || ordered ||
   // delivering || delivered
  newStatus: { type: String },
 }).validator(),

 run({ groupId, newStatus }) {
   // TODO when set to 'ordering', remove all orderItems
   // AND set orderComfirmed=false
  Events.update({ groupId: groupId }, {
   $set: { status: newStatus },
  });

  // Failed to check event status here (db insert asynchronous),
  // failed to do it in callback too
  // Do it in methods. Don`t know how to do it better

  // Send emails when 'ordered'
  sendEmailNotifications(groupId);
  // Delete event when 'delivered'
  removeEvent(groupId);
 },
});

const sendEmailNotifications = (groupId) => {
 const group = Groups.findOne(groupId);
 const event = Events.findOne({ groupId: groupId });

 if(event.status !== 'ordered') return;
 SSR.compileTemplate( 'htmlEmail', Assets.getText( 'html_email.html' ) );
 SSR.compileTemplate( 'htmlGroupCreatorEmail', Assets.getText( 'html_group_creator_email.html' ) );

 // computes total sum of participant items
 const total = (participant) => {
  let summary = 0;
  for(const item of participant.items) {
   summary += (item.price * item.quantity);
  }
  return summary;
 };

 // computes total event sum
 const groupTotal = () => {
  let totalSum = 0;
  for(const participant of event.participants) {
   totalSum += total(participant);
  }
  return totalSum;
 };

// returns collection of all ordered items in event
 const groupOrderItems = () => {
  let orderItems = [];
  for(const participant of event.participants) {
   for(const item of participant.items) {
    const index = orderItems.findIndex((obj) => {
     if (obj.name === item.name) { return true; }
    });
    if( index !== -1 ) {
     orderItems[index].quantity += item.quantity;
    } else {
     orderItems.push(item);
    }
   }
  }
  return orderItems;
 };

 const sendEmail = (userId, templateToRender, emailData) => {
  const usrEmail = Meteor.users.findOne(userId).services.google.email;
  const subject = templateToRender === 'htmlEmail' ? 'Order details' : 'Group order summary';
  console.log('Email sended to: ' + usrEmail);

  Email.send({
   to: usrEmail,
   from: 'Pizza Day app <pizzadayever@gmail.com>',
   subject,
   html: SSR.render( templateToRender, emailData ),
  });
 };

 // send order summary for each participant
 for(const participant of event.participants) {
  if(participant.inviteStatus === 'confirmed') {
   sendEmail(participant.userId, 'htmlEmail', {
    total: total(participant),
    orderItems: participant.items,
   });
  }
 }
 // send event summary for group creator
 sendEmail(group.creator, 'htmlGroupCreatorEmail', {
  groupTotal: groupTotal(),
  groupOrderItems: groupOrderItems(),
 });
};

const removeEvent = (groupId) => {
 const event = Events.findOne({ groupId: groupId });
 if(event.status === 'delivered') {
  Events.remove({_id: event._id});
 }
};
