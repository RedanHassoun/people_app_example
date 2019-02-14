"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var person_1 = require("./../models/person");
var connection = new sequelize_1.Sequelize('db', 'user', 'pass', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: 'db.sqlite',
    operatorsAliases: false
});
exports.PersonModel = connection.define('Person', person_1.Person);
connection.sync({
    logging: console.log
});
connection.authenticate()
    .then(function () {
    console.log('Connected to DB');
})["catch"](function (e) {
    console.error('Unable to connect to DB', e);
    throw new Error('Unable to connect to DB');
});
exports.DBConnection = connection;
