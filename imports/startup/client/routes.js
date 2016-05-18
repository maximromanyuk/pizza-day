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

import '../../ui/pages/group_page.js';
import '../../ui/pages/event_page.js';

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
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "groupsList",
      nav: "nav",
    });
  }
});

FlowRouter.route('/groups/:groupId', {
  name: "groupPage",
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "groupPage",
      nav: "nav",
    });
  }
});

FlowRouter.route('/invites', {
  name: "invites",
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "invitesList",
      nav: "nav",
    });
  }
});


FlowRouter.route('/groupsTemp', {
  name: 'temporaryRoute',
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "groupPage",
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

FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "pageNotFound",
      nav: "nav",
    });
  }
};
