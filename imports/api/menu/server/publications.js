import { Meteor } from 'meteor/meteor';

import { Menu } '../menu.js';

Meteor.publish("menu", function() {
  return Menu.find();
});