import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router'; 
import { Materialize } from 'meteor/materialize:materialize';

import { removeItemFromMenu } from '../../../api/groups/methods.js';

import './menu_item.html';

Template.menuItem.events({
	'click #addToOrder'() {
		//TODO
	},
	'click #delete'() {
		const groupId = FlowRouter.getParam('groupId');

		removeItemFromMenu.call({
			groupId: groupId,
			name: this.name
		}, (err, res) => {
			if(err) {
				console.log(err);
			} else {
				Materialize.toast('Item removed permanently', 4000);
			}
		});
	}
});