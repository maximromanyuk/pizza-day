import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';
import { Materialize } from 'meteor/materialize:materialize';
import { Email } from 'meteor/email';
import { SSR } from 'meteor/meteorhacks:ssr';

import { Events } from '../events.js';
import { Groups } from '../../groups/groups.js';

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
  Materialize.toast('Order delivered, event ended!', 4000);
 }
};
