import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Materialize } from 'meteor/materialize:materialize';

import { removeItemFromMenu } from '../../../api/groups/methods.js';

import './menu_item.html';

Template.menuItem.helpers({
  canAddToOrder() {
		// TODO: show button only when event on 'ordering' stage
    return false;
  },
});

Template.menuItem.events({
  'click #addToOrder'() {
    // TODO
  },
  'click #delete'() {
    const groupId = FlowRouter.getParam('groupId');

    removeItemFromMenu.call({
      groupId,
      name: this.name,
    }, (err) => {
      if(err) {
				console.log(err);
      } else {
        Materialize.toast('Item removed permanently', 4000);
      }
    });
  },
});
