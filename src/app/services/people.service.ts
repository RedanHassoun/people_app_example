import { Injectable } from '@angular/core' 
import { Http } from '@angular/http' 
import { ClientDataService } from './client-data.service';

@Injectable({
  providedIn: 'root'
})
export class PeopleService extends ClientDataService { 
  constructor(http:Http){
    super( /* The URL */ '/api/peopleapp/',http);
  }
}
