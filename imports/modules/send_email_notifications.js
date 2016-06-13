import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { SSR } from 'meteor/meteorhacks:ssr';

import { Groups } from '../api/groups/groups.js';
import { Events } from '../api/events/events.js';

import { discountedTotal } from './discounted_total.js';

// TODO too big function! Refactor it! NOW!
export const sendEmailNotifications = (groupId) => {
 const group = Groups.findOne(groupId);
 const event = Events.findOne({ groupId });

 if(event.status !== 'ordered') return;
 SSR.compileTemplate( 'htmlEmail', Assets.getText( 'html_email.html' ) );
 SSR.compileTemplate( 'htmlGroupCreatorEmail', Assets.getText( 'html_group_creator_email.html' ) );

// computes total event sum
 const discountedGroupTotal = () => {
  let totalSum = 0;
  for(const participant of event.participants) {
   totalSum += discountedTotal(groupId, participant);
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
  console.log(`Email sended to: ${usrEmail}`);

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
    total: discountedTotal(groupId, participant),
    orderItems: participant.items,
   });
  }
 }
 // send event summary for group creator
 sendEmail(group.creator, 'htmlGroupCreatorEmail', {
  groupTotal: discountedGroupTotal(),
  groupOrderItems: groupOrderItems(),
  groupItems: group.menuItems,
 });
};
