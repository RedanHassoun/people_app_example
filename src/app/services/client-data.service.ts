import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/Observable/throw';
import { Http, Headers } from '@angular/http';
import { BadInputError } from './../common/bad-input-error';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { AppConsts } from '../common/app-consts';

@Injectable({
  providedIn: 'root'
})
export class ClientDataService {
  constructor(private url:string,private http: Http) { 
  }

  private createAuthorizationHeader(headers: Headers) {
    headers.append('x-auth', localStorage.getItem(AppConsts.KEY_USER_TOKEN)); 
  }

  getAll(){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.url,{ headers: headers})
                .map(response => response.json())
                .catch(this.handleError)
  }

  delete(id:string){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(this.url + id,{ headers: headers})
                .map(response => response.json())
                .catch(this.handleError)
  }

  create(resource){
    return this.http.post(this.url,resource.json())
              .map(response => response.json())
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
