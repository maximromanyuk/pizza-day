import { Groups } from '../api/groups/groups.js';

// computes total sum of participant items
export const discountedTotal = (groupId, participant) => {
 const group = Groups.findOne(groupId);
 let summary = 0;
 // each item in order
 for(const item of participant.items) {
  let totalItemPrice = 0;
  // compare with each item in group menu
  for(const groupItem of group.menuItems) {
   if(groupItem.name === item.name) {
    // where find coupons
    if(groupItem.coupons !== 0) {
     // and count a total of all ordered items with this name,
     // for counting discount
     let totalCountOfOrderedItems = 0;
     for(const participant of event.participants) {
      for(const participantItem of participant.items) {
       if(participantItem.name === item.name) {
        totalCountOfOrderedItems += participantItem.quantity;
       }
      }
     }
     // console.log('Participant item');
     // console.log(item);
     // console.log('Group item');
     // console.log(groupItem);
     // console.log('Total count of ordered items: ' + totalCountOfOrderedItems);
     const discount = (item.price/totalCountOfOrderedItems) * item.quantity;
     totalItemPrice = item.price * item.quantity;
     // console.log('Begin item price: ' + totalItemPrice);
     // console.log('Discount: ' + discount);
     totalItemPrice -= discount;
     // console.log('Item price with discount: ' + totalItemPrice);
    } else {
     // if no coupons, calculate price without discount
     totalItemPrice += (item.price * item.quantity);
     // console.log('No coupons for: ' + item.name + '. Price: ' + (item.price * item.quantity));
    }
   }
  }
  summary += totalItemPrice;
 }
 // console.log('Summary: ' + summary)
 return Math.ceil(summary);
};
