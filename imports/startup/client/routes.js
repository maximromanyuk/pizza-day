import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { AccountsTemplates } from 'meteor/useraccounts:core';

// Import to load these templates
import '../../ui/layouts/master_layout.js';
import '../../ui/components/nav.js';
import '../../ui/components/footer.js';
import '../../ui/pages/page_not_found.js';

import '../../ui/stylesheets/style.css';

import '../../ui/pages/home.js';
import '../../ui/pages/groups.js';
import '../../ui/pages/group_page.js';
import '../../ui/pages/event_page.js';
import '../../ui/pages/invites.js';

FlowRouter.route('/', {
  name: "home",
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "home",
      nav: "nav",
    });
  }
});

FlowRouter.route('/groups', {
  name: "groups",
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "groups",
      nav: "nav",
    });
  }
});

// FlowRouter.route('/groups/:groupId', {
//   name: "groupPage",
//   triggersEnter: [AccountsTemplates.ensureSignedIn],
//   action: function(params, queryParams) {
//     alert(`Navigated to group with id: {params.groupId}`);
//     // BlazeLayout.render('masterLayout', {
//     //   footer: "footer",
//     //   main: "groupPage",
//     //   nav: "nav",
//     // });
//   }
// });

FlowRouter.route('/groupsTemp', {
  name: 'temporaryRoute',
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "group_page",
      nav: "nav",
    });
  }
});

FlowRouter.route('/eventPageTemp', {
  name: 'temporaryRoute2',
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "eventPage",
      nav: "nav",
    });
  }
});

FlowRouter.route('/invites', {
  name: "invites",
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "invites",
      nav: "nav",
    });
  }
});

FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "pageNotFound",
      nav: "nav",
    });
  }
};

AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
