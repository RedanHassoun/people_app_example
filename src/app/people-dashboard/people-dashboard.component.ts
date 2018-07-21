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
  lastUpdate:Date

  constructor(private ngRedux:NgRedux<IAppState>) {
    this.ngRedux.subscribe(()=>{
      var stateFromStore = ngRedux.getState()
      this.numOfPeople = stateFromStore.peopleArray.length
      this.lastUpdate = new Date()
    })
  }

  ngOnInit() {
  }

}
