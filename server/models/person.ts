import {Sequelize} from 'sequelize'; 

export var Person = {
    id:{
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name:Sequelize.STRING,
    mail:Sequelize.STRING,
    gender:Sequelize.STRING,
    address:Sequelize.TEXT
}