import { Injectable } from '@angular/core' 
import { Http } from '@angular/http'
import { Person } from 'src/app/model/person';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private url : string = '/api/'; 

  constructor(private http: Http) { 
  }

  getAllPeople(){
    return this.http.get(this.url+'getAllPeople')
  }

  deletePerson(personToDelete:Person){
    console.log('PeopleService | deleting')
    return this.http.delete(this.url +'deletePerson/'+personToDelete.id)
  }

  createPerson(person){
    console.log('Creating person : '+JSON.stringify(person.json()))
    return this.http.post(this.url+'createPerson',person.json())
  }
}
