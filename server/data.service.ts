import { Logger } from './logger';  
import * as uuidv1 from 'uuid/v1';
import { Repository } from './repository';

 
export class DataService {
  private readonly peopleArray:any= []

  constructor(private repo:Repository) {   
  }

  initPeople(){
    Logger.log('Init people')
    this.peopleArray.push({id:uuidv1(),
      name:'redan',mail:'redan@mail.com',gender:'Male',address:"Tel-Aviv"});
  }

  getAllPeople():Array<any>{
    return this.peopleArray
  }

  createPerson(person):any{ 
    person.id = uuidv1()
    this.peopleArray.push(person)
    this.repo.save(person).then(res=>{
      Logger.log('saved. '+JSON.stringify(res,undefined,2))
      return person 
    },err=>{
      console.log('error. ',err)
      return null
    })
  }

  deletePerson(personId){
    let index = -1
    for(let i:number =0;i<this.peopleArray.length;i++ ){
        if(this.peopleArray[i].id === personId){
          index = i
        }
    }
  
    Logger.log('the index in array : '+ index)
    if(index > -1) {
      this.peopleArray.splice(index,1)
      Logger.log('Deleted.')
      return {status:'OK'}
    }
    
    return {status:'NOT_OK'}  
  }
}
