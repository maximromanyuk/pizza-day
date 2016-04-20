import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './nav.html';

Template.nav.rendered = function() {
  $(".button-collapse").sideNav();
};
