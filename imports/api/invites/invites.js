import { Mongo } from 'meteor/mongo';

export const Invites = new Mongo.Collection('invites');

Invites.deny({
 insert() { return true; },
 update() { return true; },
 remove() { return true; },
});
