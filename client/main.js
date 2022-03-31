import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './form';
import './main.html';
import {Meteor} from "meteor/meteor";
import TestCollection from "../both/test";

import './coolForm';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  this.autorun(function() {
    Meteor.subscribe('test_list');

    const elTextAreaResult = $('textarea.mongoResult');
    const data = TestCollection.find({}, {limit: 100}).fetch();
    const jsonString = JSON.stringify(data);
    elTextAreaResult.val(jsonString);
    console.log(data)
  });
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button.pocitadlo'(event, instance) {
    event.preventDefault();
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
  'click button.mongoDelete'(event, instance) {
    event.preventDefault();
    let selector = {}
    try {
      let jsonString = $('textarea.mongoSelector').val().replaceAll('\'', '\"');

      selector = JSON.parse(jsonString);

      Meteor.call('testDelete', selector, function (err, res) {
        console.log(err, res);
      })
    }catch(err) {
      alert(err);
      $('textarea.mongoSelector').val('{}');
    }
  },

  'click button.mongoInsert'(event, instance) {
    event.preventDefault();
    let data = {}
    try {
      let jsonString = $('textarea.mongoSelector').val().replaceAll('\'', '\"');
      const count = parseInt($('input.mongoCount').val()) || 1;

      data = JSON.parse(jsonString);
      delete(data._id);

      for(let i = 0; i< count; i++) {
        Meteor.call('testInsert', data, function (err, res) {
          console.log(err, res);
          if(!err) {
            $('span.counter').text((i+1) + " " + Math.round((100/count)*i) + "%");
          }
        })
      }

    }catch(err) {
      alert(err);
      $('textarea.mongoSelector').val('{}');
    }
  },

  'click button.mongoRead'(event, instance) {
    event.preventDefault();
    const elTextAreaResult = $('textarea.mongoResult');

    try {

      const selector = {"sidou_obec_kod_st":528595};

      const data = TestCollection.find({}, {limit: 100}).fetch();
      const jsonString = JSON.stringify(data);

      elTextAreaResult.val(jsonString);

      /*Meteor.call('testRead', selector, function (err, res) {
        const jsonString = JSON.stringify(res);

        elTextAreaResult.val(jsonString);
        alert(res.length);
      })*/

    }catch(err) {
      alert(err);
      $(elTextAreaResult).val(err);
    }
  },

  'click button.mongoCount':function (event) {
    event.preventDefault();

  Meteor.call('testCount', function (err, res) {
    alert('Pocet zaznamov je: '+res);
  })
  }
});

