import {Meteor} from "meteor/meteor";
import UsersCollection from "../../both/users";
import TestCollection from "../../both/test";

Meteor.methods({
    userInsert:function (data) {
        if(!data)
            throw new Meteor.Error('Missing data!');

        UsersCollection.insert(data);
    },
    usersRead:function () {
        return UsersCollection.find().fetch();
    },
    userRemove:function (userId) {
        if(!userId)
            throw new Meteor.Error('Missing userId!');

        UsersCollection.remove({_id: userId});
    },
    userUpdate:function (userId, data) {
        if(!userId || !data)
            throw new Meteor.Error('Missing userId!');

        UsersCollection.update({_id: userId}, {$set: data});
    },
    test:function () {
        TestCollection.insert({julius: 10});
    },
    testDelete:function (selector) {
        TestCollection.remove(selector);
    },
    testInsert:function (data) {
        TestCollection.insert(data);
    },
    testRead:function (selector) {
        return TestCollection.find(selector).fetch();
    },
    testCount:function () {
        return TestCollection.find().count();
    }
})
