import { IAppState } from './../app-store/store';
import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Person } from '../model/person';

@Component({
  selector: 'app-people-dashboard',
  templateUrl: './people-dashboard.component.html',
  styleUrls: ['./people-dashboard.component.css']
})
export class PeopleDashboardComponent{
  @select('peopleArray') peopleArray$

  constructor(private ngRedux:NgRedux<IAppState>) {
  }
 

  private getNumberOfMales(peopleArray:Array<Person>){
    return peopleArray.filter(x=> x.gender === 'Male').length
  }

  private getNumberOfFemales(peopleArray:Array<Person>){
    return peopleArray.length - this.getNumberOfMales(peopleArray)
  }
}
