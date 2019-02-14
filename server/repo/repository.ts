import { DBConnection, PersonModel } from './sequelize.connection'; 

export class Repository {
    constructor() {
    }

    findAll(){
        return PersonModel.findAll()
    }

    delete(personId:any){
        return PersonModel.destroy({
            where: {id: personId}
        })
    }

    save(person:any){
        return PersonModel.create({
            name: person.name,
            mail: person.mail,
            gender: person.gender,
            address: person.address
        })
    }
}