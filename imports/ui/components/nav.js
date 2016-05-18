import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import { Invites } from '../../api/invites/invites.js';

import './nav.html';

Template.nav.rendered = function() {
  $(".button-collapse").sideNav();
};

Template.nav.helpers({
	invitesCounter() {
		// TODO: return true invites counter
		// made for simplicity, at prototyping stage now
		return Invites.find().count();
	},
});
