import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { $ } from 'meteor/jquery';
import { _ } from 'meteor/underscore';

import { addNewItemToMenu } from '../../../api/groups/methods.js';

import './menu_add_new_item.html';

Template.menuAddNewItem.rendered = () => {
	$("#price").keyup((e) => {
    if(e.keyCode == 13){
        $("#add").click();
    }
});
}


Template.menuAddNewItem.events({
	//TODO: make it using form, catching 'submit'
	'click #add'() {
		const groupId = FlowRouter.getParam('groupId');
		const name = $('#name').val();
		const price = $('#price').val();
		
		if(_.isEmpty(name) || _.isEmpty(price)) {
			Materialize.toast('Fill 2 fields, stupid!', 4000);
			return;
		}

		addNewItemToMenu.call({
			groupId: groupId,
			name: name,
			price: parseInt(price, 10)
		}, (err, res) => {
			if(err) {
				console.log(err);
			} else {
				Materialize.toast('Item added!', 4000);
			}
		});

		$('#name').val('');
		$('#price').val('');
	}
});