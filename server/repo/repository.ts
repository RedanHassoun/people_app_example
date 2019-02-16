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
        let personToSave = PersonModel.build(person)
        return personToSave.save().then((p)=>{
            p.tokens = []
            let token = p.generateAuthToken()
            p.tokens.push(token)
            return p
        })
    }
}