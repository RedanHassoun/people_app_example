import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AppConsts } from '../common/app-consts';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private socket:Socket) {
   }

  newPersonAdded():void{
    //this.socket.emit('addDoc', {});
  }

  listenToPeopleChanges(){
    return this.socket.fromEvent(AppConsts.REFRESH_PEOPLE)
  }

  personDeleted(personId:string):void{
    this.socket.emit(AppConsts.PERSON_DELETED, personId);
  }
}