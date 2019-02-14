"use strict";
exports.__esModule = true;
var sequelize_connection_1 = require("./sequelize.connection");
var Repository = /** @class */ (function () {
    //private personModel = mongoose.model('Person',Person);
    function Repository() {
    }
    Repository.prototype.save = function (person) {
        sequelize_connection_1.PersonModel.create({
            name: person.name,
            mail: person.mail,
            gender: person.gender,
            address: person.address
        });
        return null;
        // var personToSave = new this.personModel({
        //     name: person.name,
        //     mail: person.mail,
        //     gender: person.gender,
        //     address: person.address
        // })
        // return personToSave.save()
    };
    return Repository;
}());
exports.Repository = Repository;
