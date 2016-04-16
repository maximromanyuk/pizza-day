import './app-body.html';

import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

Template.App_body.onCreated(function appBodyOnCreated() {
  this.state = new ReactiveDict();
  // ...
});

Template.App_body.helpers({
  // ...
});

Template.App_body.events({
  // ...
});