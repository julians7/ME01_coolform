import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import './main.html';
import {Meteor} from "meteor/meteor";
import UsersCollection from "../both/users";
import kendo from '@progress/kendo-ui';

let users = [];

function editUser(event) {
    event.preventDefault();
    const dataItem = this.dataItem($(event.currentTarget).closest("tr"));

    const elForm = $('form');
    $(elForm).find('input[name=firstname]').val(dataItem.firstname);
    $(elForm).find('input[name=lastname]').val(dataItem.lastname);
    $(elForm).find('input[name=_id]').val(dataItem._id);
}

function removeUser(event) {
    event.preventDefault();
    const dataItem = this.dataItem($(event.currentTarget).closest("tr"));

    if(dataItem._id) {
        Meteor.call('userRemove', dataItem._id);
    }
}

Template.form.onCreated(function() {
    const elDiv = $('table#table');

    this.autorun(function () {
        Meteor.subscribe('users_list');

        const elDiv = $('div#table');

        const data = UsersCollection.find().fetch();

        $(elDiv).kendoGrid({
            sortable: true,
            dataSource: {
                data: data
            },
            columns: [
                {field: 'firstname', title: 'Meno'},
                {field: 'lastname', title: 'Priezvisko'},
                { command: {"text": "Edit", click: editUser}, title: "&nbsp;", width: 120 },
                { command: {"text": "Remove", click: removeUser}, title: "&nbsp;", width: 120 }
            ]
        })


        /*
                $(elDiv).find('tr').each((i, el) => {
                    $(el).remove();
                })*/

        /*UsersCollection.find({}, {sort: {_id: -1}}).forEach(user => {
            const elTr = $('<tr></tr>');
            const tdId = $(`<td>${user._id}</td>`);
            const tdFirstname = $(`<td>${user.firstname}</td>`);
            const tdLastname = $(`<td>${user.lastname}</td>`);
            const tdUpdate = $('<td></td>');
            const btnUpdate = $('<button>Update</button>');
            btnUpdate.on('click', event => {
                event.preventDefault();

                const elForm = $('form');
                $(elForm).find('input[name=firstname]').val(user.firstname);
                $(elForm).find('input[name=lastname]').val(user.lastname);
                $(elForm).find('input[name=_id]').val(user._id);
            });

            const tdRemove = $('<td></td>');
            const btnRemove = $('<button>Remove</button>');
            btnRemove.on('click', event => {
                event.preventDefault();
                Meteor.call('userRemove', user._id);
            });

            tdUpdate.append(btnUpdate);
            tdRemove.append(btnRemove);

            $(elTr).append(tdId)
                .append(tdFirstname)
                .append(tdLastname)
                .append(tdUpdate)
                .append(tdRemove);

            elDiv.append(elTr);
        })
     });*/
    });
});

Template.form.helpers({
    users() {
        return users;
    }
});

Template.form.events({
    'submit form'(event) {
        // increment the counter when button is clicked
        event.preventDefault();

        const data = $(event.currentTarget).serializeArray().reduce(function (obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});

        const id = data._id;
        delete(data._id);

        if(!id) {
            Meteor.call('userInsert', data, function (err, res) {

            })
        } else {
            Meteor.call('userUpdate', id, data, function (err, res) {

            })
        }

        event.currentTarget.reset();
        $(event.currentTarget).find('input[type=hidden]').each((i, el) => {
            $(el).val("");
        })
    },
});
