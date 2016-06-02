import { Mongo } from 'meteor/mongo';

export const Events = new Mongo.Collection('events');

Events.deny({
 insert() { return true; },
 update() { return true; },
 remove() { return true; },
});
