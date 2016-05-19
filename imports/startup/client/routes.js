import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load these templates
import '../../ui/stylesheets/style.css';

import '../../ui/layouts/master_layout.js';
import '../../ui/pages/home.js';
import '../../ui/components/nav.js';
import '../../ui/components/footer.js';
import '../../ui/pages/page_not_found.js';

import '../../ui/pages/groups/groups_list.js';
import '../../ui/pages/invites/invites_list.js';

import '../../ui/pages/group_page/group_page.js';
import '../../ui/pages/event_page/event_page.js';

FlowRouter.route('/', {
  name: "home",
  action(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "home",
      nav: "nav",
    });
  }
});

FlowRouter.route('/groups', {
  name: "groups",
  action(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "groupsList",
      nav: "nav",
    });
  }
});

FlowRouter.route('/groups/:groupId', {
  name: "groupPage",
  action(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "groupPage",
      nav: "nav",
    });
  }
});

FlowRouter.route('/invites', {
  name: "invites",
  action(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "invitesList",
      nav: "nav",
    });
  }
});

FlowRouter.route('/eventPageTemp', {
  name: 'temporaryRoute2',
  action(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "eventPage",
      nav: "nav",
    });
  }
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "pageNotFound",
      nav: "nav",
    });
  }
};

FlowRouter.subscriptions = function() {
  this.register('invites', Meteor.subscribe('invites'));
};
