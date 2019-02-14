import {Sequelize} from 'sequelize'; 

export var Person = {
    id:{
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name:{
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            len: [3]
        }
    },
    mail:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            isEmail: true
        }
    },
    gender:Sequelize.STRING,
    address:Sequelize.TEXT
}