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
        let personToSave = PersonModel.build(person);
        let token = personToSave.generateAuthToken()
        return personToSave.save()
            .then((p)=>{
            console.log(`Person ${p.name} saved successfully`)
            return p
        })
        .catch(e=>{
            console.error('Cannot save person',JSON.stringify(e,undefined,2))
            return e
        })
    }
}