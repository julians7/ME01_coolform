import { Meteor } from 'meteor/meteor';
import TestCollection from "../../both/test";
import UsersCollection from "../../both/users";

Meteor.publish('test_list', function () {
   return TestCollection.find({});
});

Meteor.publish('users_list', function () {
   return UsersCollection.find({});
});