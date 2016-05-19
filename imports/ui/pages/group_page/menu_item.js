import './menu_item.html';

Template.menuItem.events({
	'click #addToOrder'() {
		
	},
	'click #delete'() {
		const groupId = FlowRouter.getParam('groupId');

		Meteor.call('menu.delete', groupId, this.name, function(err, res) {
			if(err) {
				console.log(err);
			} else {
				Materialize.toast('Item removed permanently', 4000)
			}
		});
	}
});