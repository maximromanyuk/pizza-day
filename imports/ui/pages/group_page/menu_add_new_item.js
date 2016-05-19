import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './menu_add_new_item.html';

Template.menuAddNewItem.events({
	'click #add'() {
		const groupId = FlowRouter.getParam('groupId');
		const name = $('#name').val();
		const price = $('#price').val();

		Meteor.call('menu.insert', groupId, name, price, function(err, res) {
			if(err) {
				console.log(err);
			} else {
				Materialize.toast('Item added!', 4000)
			}
		});

		$('#name').val('');
		$('#price').val('');
	}
});