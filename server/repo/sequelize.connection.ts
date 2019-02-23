import {Sequelize} from 'sequelize';
import { Person } from './../models/person';
import jwt = require('jsonwebtoken');
import _ = require('lodash');
import bcrypt = require('bcryptjs');
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

PersonModel.removeToken = function(token) {
    console.log('removing by token:',token)
    return PersonModel.findByToken(token)
        .then(p=>{
            console.log('setting token to empty string')
            return p.update({token:''})
        })
        .catch(e=>{
            console.error('An error occurred while removing token:',token)
            return Promise.reject(e)
        })
};

PersonModel.hook('beforeCreate', (person, options) => {
    let saltRounds = 10
    let salt = bcrypt.genSaltSync(saltRounds)
    person.password = bcrypt.hashSync(person.password,salt)
});

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

PersonModel.findByCredentials = function(mail,password){
    var Person = this;
    return Person.findOne({ where: {mail:mail}})
                 .then(p=>{
                    if(!p){
                        console.log('user not exists!!')
                        return Promise.reject({})
                    }
                    return new Promise((resolve,reject)=>{
                        let isPassEqual = bcrypt.compareSync(password, p.password);
                        if(isPassEqual){
                            console.log('user exists and authenticated',JSON.stringify(p,undefined,2))
                            resolve(p)
                        }else{
                            console.log('user exists and NOT authenticated',p)
                            reject({})
                        }
                    })
                 })
}

PersonModel.findByToken = function(token){
    var Person = this;
    var decoded;

    try{
        decoded = jwt.verify(token,SECRET_KEY)
        return Person.findOne({ where: {
                                id: decoded.id,
                                token: token,
                                access: 'auth'
                            }})
    }catch(e){
        console.error(`An error occurred while verifying token: ${token}`,e)
        return Promise.reject(e)
    }
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