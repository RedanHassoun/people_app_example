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
        unique: true,
        validate:{
            isEmail: true
        }
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            len: [3]
        }
    },
    token:{
        type: Sequelize.STRING,
        allowNull:false
    },
    access:{
        type:Sequelize.STRING,
        allowNull:false
    },
    gender:{
        type:Sequelize.STRING
    },
    address:{
        type:Sequelize.TEXT
    }
}