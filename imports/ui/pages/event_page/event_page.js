import { Template } from 'meteor/templating';

import './event_page.html';

Template.eventPage.rendered = () => {
	$('.datepicker').pickadate({
		close: 'Close'
	});

	$('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
    }
  );
    $('.tooltipped').tooltip({delay: 50});
}
