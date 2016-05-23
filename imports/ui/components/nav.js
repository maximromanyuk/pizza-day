import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import { Invites } from '../../api/invites/invites.js';

import './nav.html';

Template.nav.onRendered(() => {
 $('.button-collapse').sideNav();
});

Template.nav.helpers({
 invitesCounter() {
  return Invites.find().count();
 },
});
