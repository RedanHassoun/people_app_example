"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var uuidv1 = require("uuid/v1");
var ServerApp = /** @class */ (function () {
    function ServerApp() {
        this.app = express();
        this.port = 8080;
        this.peopleArray = [];
    }
    ServerApp.prototype.init = function () {
        var _this = this;
        this.app.use(bodyParser.json());
        var initPeople = function () {
            _this.peopleArray.push({ id: uuidv1(),
                name: 'redan', mail: 'redan@mail.com', gender: 'Male', address: "Tel-Aviv" });
        };
        initPeople();
        this.app.get('/api/getAllPeople', function (req, res) {
            res.send(_this.peopleArray);
        });
        this.app.post('/api/createPerson', function (req, res) {
            var personId = uuidv1();
            var personToAdd = { id: personId,
                name: req.body.name,
                mail: req.body.mail,
                gender: req.body.gender,
                address: req.body.address };
            _this.peopleArray.push(personToAdd);
            console.log(JSON.stringify(personToAdd) + ', added.');
            console.log('Array size now is : ' + _this.peopleArray.length);
            res.send(personToAdd);
        });
        this.app["delete"]('/api/deletePerson/:id', function (req, res) {
            console.log('Deleting person id:' + req.params.id);
            var index = -1;
            for (var i = 0; i < _this.peopleArray.length; i++) {
                if (_this.peopleArray[i].id === req.params.id) {
                    index = i;
                }
            }
            console.log('the index in array : ' + index);
            if (index > -1) {
                _this.peopleArray.splice(index, 1);
                console.log('Deleted.');
            }
            res.send({ status: 'OK' });
        });
        this.app.listen(this.port, function () { });
    };
    return ServerApp;
}());
var serverApp = new ServerApp();
serverApp.init();
