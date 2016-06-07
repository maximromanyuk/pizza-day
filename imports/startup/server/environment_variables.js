import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
 // If you vant to send emails, set your login & password for SendGrid
 process.env.MAIL_URL = 'smtp://candyogre:Max800kill@smtp.sendgrid.net:587';
});
