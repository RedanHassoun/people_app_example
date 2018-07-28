import { Logger } from './logger';  
import * as uuidv1 from 'uuid/v1'; 
 
export class DataService {
  private readonly peopleArray:any= [] 

  constructor() {  
  }

  initPeople(){
    Logger.log('Init people')
    this.peopleArray.push({id:uuidv1(),
      name:'redan',mail:'redan@mail.com',gender:'Male',address:"Tel-Aviv"}) 
  }

  getAllPeople():Array<any>{
    return this.peopleArray
  }

  createPerson(person):any{ 
    person.id = uuidv1()  
    this.peopleArray.push(person)
    Logger.log(JSON.stringify(person)+', added.')
    Logger.log('Array size now is : '+this.peopleArray.length)
    return person 
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
