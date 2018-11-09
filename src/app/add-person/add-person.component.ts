import { IAppState } from './../app-store/store';
import { ADD_TO_PEOPLE } from './../app-store/actions';
import { PeopleService } from './../services/people.service';
import { Person } from './../model/person';
import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {
  newPerson:Person
  private addPersonForm:FormGroup

  constructor(private peopleService:PeopleService,
              private ngRedux:NgRedux<IAppState>,
              private dialogRef:MatDialogRef<AddPersonComponent>) { 
  }

  ngOnInit() {
    this.newPerson = new Person()
    this.newPerson.reset()
    this.addPersonForm = new FormGroup({
      'name': new FormControl(this.newPerson.name, [
        Validators.required,
        Validators.minLength(4)
      ]),
      'mail': new FormControl(this.newPerson.mail),
      'address': new FormControl(this.newPerson.address, 
                                  Validators.required),
      'gender': new FormControl()
    }); 
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
                          (error)=>{
                            console.log('An error occurred: '+error)
                            this.newPerson.reset()
                            alert('An error occurred while connecting to server')
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
