import { Injectable } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';
import { Http } from '@angular/http';
import { BadInputError } from './../common/bad-input-error';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';

@Injectable({
  providedIn: 'root'
})
export class ClientDataService {
  constructor(private url:string,private http: Http) { 
  }

  getAll(){
    return this.http.get(this.url)
                .catch(this.handleError)
  }

  delete(id:string){ 
    return this.http.delete(this.url + id)
                .catch(this.handleError)
  }

  create(resource){ 
    return this.http.post(this.url,resource.json())
              .catch(this.handleError)
  }

  private handleError(error:Response){
    if(error.status === 400)
      return Observable.throw(new BadInputError(error.json()))

    if(error.status === 404)
      return Observable.throw(new NotFoundError())

    return Observable.throw(new AppError(error.json()))
  }
}
