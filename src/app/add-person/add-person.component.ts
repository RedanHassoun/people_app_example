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
  newPerson:Person = new Person()

  constructor(private peopleService:PeopleService,
              private ngRedux:NgRedux<IAppState>,
              private dialogRef:MatDialogRef<AddPersonComponent>) { 

  }

  ngOnInit() {
  }

  addPerson(){
    if(this.newPerson.isEmpty()){
      alert("Missing person input")
    }else{ 
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
    this.ngRedux.dispatch({type:ADD_TO_PEOPLE,person:person}) 
    this.newPerson.reset()
    this.dialogRef.close()
  }
  
}
