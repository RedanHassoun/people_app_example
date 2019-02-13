import { Document, Schema, Model, model} from "mongoose";
var mongoose = require('mongoose');

export class Repository {
    private url:string = 'mongodb://localhost:27017/'
    private dbName:string = 'PeopleApp';
    private db = null;
    private personModel = null;

    constructor() {
    }

    save(person:any){
        var personToSave = new this.personModel({
            name: person.name,
            mail: person.mail,
            gender: person.gender,
            address: person.address
        })
        return personToSave.save()
    }

    initDBConnection(){
        mongoose.Promise = global.Promise
        mongoose.connect(this.url+this.dbName)
        this.personModel = mongoose.model('Person',{
            name:{
                type:String,
                required:true,
                minLength: 1,
                trim: true
            },
            mail:{
                type:String,
                required:true
            },
            gender:{
                type:String,
                required:true
            },
            address:{
                type:String,
                required:true
            }
        })
      }
}