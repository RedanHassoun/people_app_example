import { BadInputError } from './../common/bad-input-error';
import { AppError } from './../common/app-error';
import { IAppState } from './../app-store/store';
import { ADD_TO_PEOPLE } from './../app-store/actions';
import { PeopleService } from './../services/people.service';
import { Person } from './../model/person';
import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {
  newPerson:Person

  constructor(private peopleService:PeopleService,
              private ngRedux:NgRedux<IAppState>,
              private dialogRef:MatDialogRef<AddPersonComponent>) { 
  }

  ngOnInit() {
    this.newPerson = new Person()
    this.newPerson.reset()
  }

  addPerson(){
    if(this.newPerson.isEmpty()){
      alert("Missing person input")
    }else{  
      console.log('Running service to add : '+JSON.stringify(this.newPerson))
      this.peopleService.createPerson(this.newPerson)
                          .subscribe((response)=>{
                            console.log('Create person response: '+JSON.stringify(response))
                            this.addToPeople(response.json()) 
                            this.newPerson.reset()
                          },
                          (error:AppError)=>{
                            
                            if(error instanceof BadInputError){
                              let msg:string = 'Bad input'
                              console.log(msg)
                              alert(msg) 
                              this.newPerson.reset() 
                            }else
                              throw error
                          })
    } 
  }


  private addToPeople(person){
    /* Dispatch an action to redux reducer */
    this.ngRedux.dispatch({type:ADD_TO_PEOPLE,person:person}) 
    
    /* Housekeeping */
    this.newPerson.reset()
    this.dialogRef.close()
  }
  
}
