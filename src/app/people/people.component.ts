import { FETCH_PEOPLE_SUCCESS, ADD_TO_PEOPLE, REMOVE_FROM_PEOPLE } from './../app-store/actions';
import { IAppState } from './../app-store/store';
import { NgRedux } from '@angular-redux/store';
import { Person } from 'src/app/model/person';
import { PeopleService } from './../services/people.service';
import { Component, OnInit } from '@angular/core'; 

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  peopleArray:Array<Person> = [] 
  hideMe:boolean[] = [] // TODO : include 'hidden' in the person fields
  newPerson:Person = new Person()

  constructor(private peopleService:PeopleService,
              private ngRedux:NgRedux<IAppState>) {
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
    this.newPerson.reset()
 
  }

  private addToPeople(person){
    this.ngRedux.dispatch({type:ADD_TO_PEOPLE,person:person})
    this.hideMe.push(true)
    this.newPerson.reset()
  }
 
  private loadPeople(people){
    this.hideMe = new Array(this.peopleArray.length).fill(true);
    this.ngRedux.dispatch({type:FETCH_PEOPLE_SUCCESS,people:people})
  }

  private removeFromPeople(person){
    this.ngRedux.dispatch({type:REMOVE_FROM_PEOPLE,person:person})
    this.hideMe.splice(0,1)
  }

  deletePerson(personToDelete){
    this.peopleService.deletePerson(personToDelete)
                        .subscribe( (response) => {
                          console.log('Deleted : '+JSON.stringify(personToDelete))
                          this.removeFromPeople(personToDelete)
                          alert('Deleted : '+personToDelete.name+
                                ', '+this.peopleArray.length+' left')
                        },
                        (error)=>{
                          console.log('An error occurred: '+error)
                          alert('An error occurred while connecting to server')
                        })
  }
 
  addPerson(){
    if(this.newPerson.isEmpty()){
      alert("Missing person data")
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
}
