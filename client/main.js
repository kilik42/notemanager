import { Template } from 'meteor/templating';
import {Notes} from '../lib/collections.js';
import {Accounts} from 'meteor/accounts-base';
import { ReactiveVar } from 'meteor/reactive-var';

//accounts config
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});




import './main.html';

Template.body.helpers({
  /*
  notes: [
    {text: 'my note 1'},
    {text: 'my note 2'},
    {text: 'my note 3'}
  ]
  */

  notes(){
    return Notes.find({});
  }


});

Template.add.events({
  'submit .add-form': function(){
    event.preventDefault();
    //get input value;

    const target = event.target;
    const text = target.text.value;

    //insert not into collections
    /*
    Notes.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,

    });
    */
Meteor.call('notes.insert', text);




    //clear form
    target.text.value = '';

    //close modal
    $('#addModal').modal('close');

    return false;
  }
});

Template.note.events({
  'click .delete-note': function(){
    //Notes.remove(this._id);
    Meteor.call('notes.remove', this);

    return false;
  }
});
