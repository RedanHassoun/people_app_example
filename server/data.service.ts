import { Logger } from './logger';  
import * as uuidv1 from 'uuid/v1';
import { Repository } from './repo/repository';

 
export class DataService { 

  constructor(private repo:Repository) {   
  } 

  getAllPeople(){
    return this.repo.findAll()
  }

  createPerson(person):any{
    return this.repo.save(person)
  }

  deletePerson(personId){
    return this.repo.delete(personId)
  }

  findPersonByCredentials(mail,password){
    return this.repo.findPersonByCredentials(mail,password)
  }

  removeTokenForUser(token){
    return this.repo.removeTokenForUser(token)
  }
}
