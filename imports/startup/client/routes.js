import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

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


FlowRouter.route('/', {
  name: "home",
  triggersEnter: [redirectIfLoggedIn],
  action(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      content: "home",
    });
  }
});

FlowRouter.route('/groups', {
  name: "groups",
  triggersEnter: [checkLoggedIn],
  action(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      content: "groupsList",
    });
  }
});

FlowRouter.route('/groups/:groupId', {
  name: "groupPage",
  action(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      content: "groupPage",
    });
  }
});

FlowRouter.route('/invites', {
  name: "invites",
  action(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      content: "invitesList",
    });
  }
});

FlowRouter.route('/eventPageTemp', {
  name: 'temporaryRoute2',
  action(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      content: "eventPage",
    });
  }
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('masterLayout', {
      content: "pageNotFound",
    });
  }
};

FlowRouter.subscriptions = function() {
  this.register('invites', Meteor.subscribe('invites'));
};
