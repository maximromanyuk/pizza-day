import { Template } from 'meteor/templating';
import { Materialize } from 'meteor/materialize:materialize';

import { imageUrlValidator } from '../../../modules/image_url_validator.js';

import './group_new_card.html';
import './group_new_card.css';

Template.groupNewCard.events({
 'submit .createGroup'(evt) {
  evt.preventDefault();

  const groupName = evt.target.group_name.value;
  const logoUrl = evt.target.logo_url.value;

  // check for empty fields
  if(_.isEmpty(groupName) || _.isEmpty(logoUrl)) {
   Materialize.toast('Fill 2 fields, please!', 4000);
   return;
  }

 // check if url - image
  imageUrlValidator(logoUrl, (res) => {
   if(res === false) {
    Materialize.toast('Invalid logo url, try another', 4000);
    return;
   } else {
    evt.target.group_name.value = '';
    evt.target.logo_url.value = '';

    Meteor.call('groups.insert', {
     groupName,
     logoUrl,
    }, (err) => {
     if(err) {
      alert(err);
     } else {
      Materialize.toast(`Group '${name}' created!`, 4000);
     }
    });
   }
  });
 },
});
