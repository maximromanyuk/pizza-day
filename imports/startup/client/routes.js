import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Tracker } from 'meteor/tracker';

import '../../ui/stylesheets/style.css';

import '../../ui/layouts/master_layout.html';
import '../../ui/pages/home.html';
import '../../ui/components/nav.js';
import '../../ui/components/footer.html';
import '../../ui/pages/page_not_found.html';

import '../../ui/pages/groups/groups_list.js';
import '../../ui/pages/invites/invites_list.js';

import '../../ui/pages/group_page/group_page.js';
import '../../ui/pages/event_page/event_page.js';

// triggers
function checkLoggedIn(ctx, redirect) {
 if (!Meteor.userId()) {
  redirect('/');
 }
}

function redirectIfLoggedIn(ctx, redirect) {
 if (Meteor.userId()) {
  redirect('/groups');
 }
}

// routes
FlowRouter.route('/', {
 name: 'home',
 triggersEnter: [redirectIfLoggedIn],
 action() {
  BlazeLayout.render('masterLayout', {
   content: 'home',
  });
 },
});

FlowRouter.route('/groups', {
 name: 'groups',
 triggersEnter: [checkLoggedIn],
 action() {
  BlazeLayout.render('masterLayout', {
   content: 'groupsList',
  });
 },
});

FlowRouter.route('/groups/:groupId', {
 name: 'groupPage',
 action() {
  BlazeLayout.render('masterLayout', {
   content: 'groupPage',
  });
 },
});

FlowRouter.route('/groups/:groupId/event', {
 name: 'eventPage',
 action() {
  BlazeLayout.render('masterLayout', {
   content: 'eventPage',
  });
 },
});

FlowRouter.route('/invites', {
 name: 'invites',
 triggersEnter: [checkLoggedIn],
 action() {
  BlazeLayout.render('masterLayout', {
   content: 'invitesList',
  });
 },
});

FlowRouter.notFound = {
 action() {
  BlazeLayout.render('masterLayout', {
   content: 'pageNotFound',
  });
 },
};

// global subscriptions
FlowRouter.subscriptions = function() {
 this.register('invites', Meteor.subscribe('invites'));
};

// not authorized users redirects to main page
Tracker.autorun(() => {
 if (!Meteor.userId()) {
  FlowRouter.go('/');
 }
});

Accounts.onLogin(() => {
 FlowRouter.go('groups');
});
