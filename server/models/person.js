"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
exports.Person = {
    id: {
        type: sequelize_1.Sequelize.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.Sequelize.UUIDV4
    },
    name: {
        type: sequelize_1.Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3]
        }
    },
    mail: {
        type: sequelize_1.Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    gender: sequelize_1.Sequelize.STRING,
    address: sequelize_1.Sequelize.TEXT
};
