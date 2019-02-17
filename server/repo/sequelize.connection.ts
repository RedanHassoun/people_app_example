import {Sequelize} from 'sequelize';
import { Person } from './../models/person';
import jwt = require('jsonwebtoken');
import _ = require('lodash');
import {Promise} from 'es6-promise'

const SECRET_KEY:string = 'ww234r432e%%$2433'
const connection = new Sequelize('db','user','pass',{
    host: 'localhost',
    dialect: 'sqlite',
    storage: 'db.sqlite',
    operatorsAliases:false
}) 

export var PersonModel = connection.define('Person',Person);

PersonModel.prototype.generateAuthToken = function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({id:user.id,access},SECRET_KEY).toString();
    user.token = token
    user.access = 'auth' 
    console.log(`Generated token for user: ${user.name}, token=${token}`)
    return token
}; 
  
PersonModel.prototype.toJSON = function(){
    var user = this;
    let toReturn = {
        id:user.id,
        name:user.name,
        mail:user.mail,
        gender:user.gender,
        address:user.address
    }
    return toReturn
}

PersonModel.findByToken = function(token){
    var Person = this;
    var decoded;

    try{
        decoded = jwt.verify(token,SECRET_KEY)
    }catch(e){
        return Promise.reject(e)
    }

    return Person.findOne({ where: {
        id: decoded.id,
        'tokens.token': token,
        'tokens.access': 'auth'
    }})
}

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