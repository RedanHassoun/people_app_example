import { Component, OnInit } from '@angular/core';
import { Person } from '../model/person';
import { PeopleService } from '../services/people.service';
import { NgRedux } from '@angular-redux/store';
import { MatDialogRef } from '@angular/material/dialog';
import { IAppState } from '../app-store/store';
import { AddPersonComponent } from '../add-person/add-person.component';
import { AppError } from '../common/app-error';
import { BadInputError } from '../common/bad-input-error';
import { ADD_TO_PEOPLE } from '../app-store/actions';
import { Router } from '@angular/router';
import { AppUtil } from '../common/app-util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  newPerson:Person

  constructor(private peopleService:PeopleService,
              private router: Router,
              private ngRedux:NgRedux<IAppState>) { 
  }

  ngOnInit() {
    this.newPerson = new Person()
    this.newPerson.reset()
  }

  addPerson(){
    console.error(this.newPerson) 
    if(this.newPerson.isEmpty()){
      alert("Missing person input")
    }else{  
      if(!this.newPerson.isPasswordMatch()){
        alert('Password mismatch!')
        return // TODO : add proper validation
      }
      console.log('Running service to add : '+JSON.stringify(this.newPerson))
      this.peopleService.create(this.newPerson)
                  .subscribe((response)=>{
                    console.log('Create person response: '+response)
                    this.addToPeople(response.json()) 
                    this.newPerson.reset()
                    AppUtil.extractAndSaveToken(response)
                    this.router.navigate(['/people']);
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
  }

}
