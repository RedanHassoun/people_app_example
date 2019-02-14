import {Sequelize} from 'sequelize';
import { Person } from './../models/person';

const connection = new Sequelize('db','user','pass',{
    host: 'localhost',
    dialect: 'sqlite',
    storage: 'db.sqlite',
    operatorsAliases:false
}) 

export var PersonModel = connection.define('Person',Person);

connection.sync({
    logging: console.log
})

connection.authenticate()
.then(()=>{
    console.log('Connected to DB')
})
.catch(e =>{
    console.error('Unable to connect to DB',e)
    throw new Error('Unable to connect to DB')
})

export var DBConnection = connection