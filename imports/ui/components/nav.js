import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
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

Template.nav.events({  
  'click #login-buttons-logout'() {
    Meteor.logout(function() {
      // Redirect to login
      FlowRouter.go('/');
    });

    return;
  }
});