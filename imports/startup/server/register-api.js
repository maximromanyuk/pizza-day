// This defines all the collections, publications and methods
// that the application provides as an API to the client.

ServiceConfiguration.configurations.upsert({
 service: 'google',
}, {
 $set: {
  clientId: Meteor.settings.google.clientId,
  loginStyle: 'popup',
  secret: Meteor.settings.google.secret,
 },
});

import '../../api/groups/groups.js';
import '../../api/groups/server/methods.js';
import '../../api/groups/server/publications.js';

import '../../api/invites/invites.js';
import '../../api/invites/server/methods.js';
import '../../api/invites/server/publications.js';

import '../../api/events/events.js';
import '../../api/events/server/methods.js';
import '../../api/events/server/publications.js';

import '../../api/users/server/publications.js';
