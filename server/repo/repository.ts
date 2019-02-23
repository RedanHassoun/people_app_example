import { DBConnection, PersonModel } from './sequelize.connection';
import {Promise} from 'es6-promise'

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
    }

    findPersonByCredentials(mail,password){
        return PersonModel.findByCredentials(mail,password)
        .then(p=>{
            let token = p.generateAuthToken()
            p.token = token
            return p.update({token:token})
        })
        .catch(e=>{
            console.error('Error while login ',JSON.stringify(e,undefined,2))
            return Promise.reject(e)
        })
    }
}