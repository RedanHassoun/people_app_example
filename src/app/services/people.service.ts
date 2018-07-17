import { Injectable } from '@angular/core' 
import { Http } from '@angular/http'

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private url : string = '/api/';
  private peopleArray:any = []

  constructor(private http: Http) {
    this.peopleArray.push({id:'123',name:'Redan',mail:'rail.com'})
    this.peopleArray.push({id:'124',name:'Sam',mail:'sail.com'})
  }

  getAllPeople(){
    return this.http.get(this.url+'getAllPeople')
  }

  deletePerson(personToDelete){
    console.log('PeopleService | deleting')
    return this.http.delete(this.url +'deletePerson/'+personToDelete.id)
  }

  createPerson(person){
    console.log('Creating person : '+JSON.stringify(person))
    return this.http.post(this.url+'createPerson',person)
  }
}
