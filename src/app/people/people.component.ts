import { FETCH_PEOPLE_SUCCESS, ADD_TO_PEOPLE, REMOVE_FROM_PEOPLE } from './../app-store/actions';
import { IAppState } from './../app-store/store';
import { NgRedux } from '@angular-redux/store';
import { Person } from 'src/app/model/person';
import { PeopleService } from './../services/people.service';
import { Component, OnInit } from '@angular/core'; 
import { MatDialog } from '@angular/material/dialog';
import { AddPersonComponent } from 'src/app/add-person/add-person.component';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  peopleArray:Array<Person> = []  

  constructor(private peopleService:PeopleService,
              private ngRedux:NgRedux<IAppState>,
              private dialog:MatDialog) {
      ngRedux.subscribe(()=>{
        var currState = ngRedux.getState()
        this.peopleArray = currState.peopleArray
      })
  }

  ngOnInit() { 
    this.peopleService.getAllPeople()
                        .subscribe((response)=>{
                          console.log('ngOnInit | '+response.json())
                          this.loadPeople( response.json())
                        },
                      (error)=>{
                        console.log('An error occurred: '+error)
                        alert('An error occurred while connecting to server')
                      }) 
 
  }

  openAddPersonDialog(){
    console.log('Opening dialog')
    this.dialog.open(AddPersonComponent)
  }
 
  private loadPeople(people){ 
    this.ngRedux.dispatch({type:FETCH_PEOPLE_SUCCESS,people:people})
  }

  private removeFromPeople(person){
    this.ngRedux.dispatch({type:REMOVE_FROM_PEOPLE,person:person}) 
  }

  deletePerson(personToDelete){
    this.peopleService.deletePerson(personToDelete)
                        .subscribe( (response) => {
                          console.log('Deleted : '+JSON.stringify(personToDelete))
                          this.removeFromPeople(personToDelete) 
                        },
                        (error)=>{
                          console.log('An error occurred: '+error)
                          alert('An error occurred while connecting to server')
                        })
  }
}
