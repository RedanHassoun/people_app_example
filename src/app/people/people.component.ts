import { Router } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { FETCH_PEOPLE_SUCCESS, ADD_TO_PEOPLE, REMOVE_FROM_PEOPLE } from './../app-store/actions';
import { IAppState } from './../app-store/store';
import { NgRedux } from '@angular-redux/store';
import { Person } from 'src/app/model/person';
import { PeopleService } from './../services/people.service';
import { Component, OnInit,ViewChild, OnDestroy } from '@angular/core'; 
import { MatDialog } from '@angular/material/dialog';
import { AddPersonComponent } from 'src/app/add-person/add-person.component';
import {MatTable} from '@angular/material';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit,OnDestroy {
  peopleArray:Array<Person> = []  
  @ViewChild(MatTable) table: MatTable<any>;
  columnsToDisplay = ['name' , 'mail','address','gender','delete'];
  storeUnsubscribe;
  
  constructor(private peopleService:PeopleService,
              private ngRedux:NgRedux<IAppState>,
              private dialog:MatDialog,
              private authenticationService:AuthenticationService,
              private router: Router) {
      this.storeUnsubscribe = ngRedux.subscribe(()=>{
        var currState = ngRedux.getState()
        this.peopleArray = currState.peopleArray
        this.refreshTable()
      })
  }

  ngOnInit() { 
    this.peopleService.getAll()
                        .subscribe((people)=>{
                          console.log('ngOnInit | '+people)
                          this.loadPeople(people)
                        }) 
  }

  ngOnDestroy(): void { 
    if(this.storeUnsubscribe)
      this.storeUnsubscribe()
  }

  private refreshTable(){
    if(this.table != undefined){
      this.table.renderRows()
    } 
  }

  openAddPersonDialog(){
    // TODO : remove
    console.log('Opening dialog')
    this.dialog.open(AddPersonComponent)
                  .afterClosed()
                  .subscribe((result)=>{
                    this.table.renderRows()
                  })
  }
 
  private loadPeople(people){ 
    this.ngRedux.dispatch({type:FETCH_PEOPLE_SUCCESS,people:people})
  }

  private removeFromPeople(person){
    this.ngRedux.dispatch({type:REMOVE_FROM_PEOPLE,person:person}) 
  }

  deletePerson(personToDelete){
    this.peopleService.delete(personToDelete.id)
                        .subscribe( (response) => {
                          this.removeFromPeople(personToDelete) 
                        },
                        (error:AppError)=>{
                          if(error instanceof NotFoundError){
                            console.log('Person not found : '+JSON.stringify(personToDelete));
                            alert('This person is already deleted')
                          }else
                            throw error // The error will be handled by Angular
                        })
  }

  logout(){
    this.authenticationService.logout()
    this.router.navigate(['/']);
  }
}
