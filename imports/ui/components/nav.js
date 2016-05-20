import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { $ } from 'meteor/jquery';

import { Invites } from '../../api/invites/invites.js';

import './nav.html';

Template.nav.rendered = () => {
  $(".button-collapse").sideNav();
};

Template.nav.helpers({
	invitesCounter() {
		return Invites.find().count();
	},
});
