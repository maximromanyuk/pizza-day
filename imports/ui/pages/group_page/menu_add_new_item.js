import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Materialize } from 'meteor/materialize:materialize';
import { $ } from 'meteor/jquery';
import { _ } from 'meteor/underscore';

import './menu_add_new_item.html';

Template.menuAddNewItem.onRendered(() => {
 $('#price').keyup((e) => {
  if(e.keyCode === 13) {
   $('#add').click();
  }
 });
});


Template.menuAddNewItem.events({
	// TODO: make it using form, catching 'submit'
 'click #add'() {
  const name = $('#name').val();
  const price = $('#price').val();

  if(_.isEmpty(name) || _.isEmpty(price)) {
   Materialize.toast('Fill 2 fields, stupid!', 4000);
   return;
  }

  Meteor.call('menu.addNewItem', {
   groupId: FlowRouter.getParam('groupId'),
   name,
   price: parseInt(price, 10),
  }, (err) => {
   if(err) {
    console.log(err);
   } else {
    Materialize.toast('Item added!', 4000);
   }
  });

  $('#name').val('');
  $('#price').val('');
 },
});
