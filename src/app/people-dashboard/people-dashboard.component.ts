import { IAppState } from './../app-store/store';
import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-people-dashboard',
  templateUrl: './people-dashboard.component.html',
  styleUrls: ['./people-dashboard.component.css']
})
export class PeopleDashboardComponent implements OnInit {
  numOfPeople:number
  numOfMales:number
  lastUpdate:Date

  constructor(private ngRedux:NgRedux<IAppState>) {
    this.ngRedux.subscribe(()=>{
      var stateFromStore = ngRedux.getState()
      var peopleArray =  stateFromStore.peopleArray
      this.numOfPeople = peopleArray.length
      this.numOfMales = peopleArray.filter(x=> x.gender === 'Male').length
      this.lastUpdate = new Date()
    })
  }

  ngOnInit() {
  }

}
