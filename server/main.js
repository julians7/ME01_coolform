import { Meteor } from 'meteor/meteor';
import UsersCollection from "../both/users";
import TestCollection from "../both/test";
import "./methods/TestMethods";
import "./publish/TestPublish";

Meteor.startup(() => {
  // code to run on server at startup
});

