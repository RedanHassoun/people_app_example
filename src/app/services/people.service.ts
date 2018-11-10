import { BadInputError } from './../common/bad-input-error';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { Injectable } from '@angular/core' 
import { Http } from '@angular/http'
import { Person } from 'src/app/model/person';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private url : string = '/api/'; 

  constructor(private http: Http) { 
  }

  getAllPeople(){
    return this.http.get(this.url+'getAllPeople')
                .catch((error:Response)=>{
                    return Observable.throw(error)
                })
  }

  deletePerson(personToDelete:Person){ 
    return this.http.delete(this.url +
                            'deletePerson/'+
                            personToDelete.id)
                        .catch((error:Response)=>{
                            if(error.status === 404)
                              return Observable.throw(new NotFoundError())
                            return Observable.throw(new AppError(error))
                        })
  }

  createPerson(person){
    console.log('Creating person : '+JSON.stringify(person.json()))
    return this.http.post(this.url+'createPerson',person.json())
              .catch((error:Response)=>{
                  if(error.status === 400)
                    return Observable.throw(new BadInputError(error.json()))
                  return Observable.throw(new AppError(error.json()))
              })
  }
}
