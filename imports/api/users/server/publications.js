import { Meteor } from 'meteor/meteor';

Meteor.publish("users", () => {
  return Meteor.users.find({}, {
  	fields: {
  		'profile.name': 1,
  		'services.google.picture': 1
  	}
  });
});
