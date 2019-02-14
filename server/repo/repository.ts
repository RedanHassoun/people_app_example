import { DBConnection, PersonModel } from './sequelize.connection'; 

export class Repository {
    //private personModel = mongoose.model('Person',Person);

    constructor() {
    }

    save(person:any){
        PersonModel.create({
            name: person.name,
            mail: person.mail,
            gender: person.gender,
            address: person.address
        })
        return null
        // var personToSave = new this.personModel({
        //     name: person.name,
        //     mail: person.mail,
        //     gender: person.gender,
        //     address: person.address
        // })
        // return personToSave.save()
    }
}