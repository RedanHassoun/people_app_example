import { IAppState } from './../app-store/store';
import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-people-dashboard',
  templateUrl: './people-dashboard.component.html',
  styleUrls: ['./people-dashboard.component.css']
})
export class PeopleDashboardComponent implements OnInit {
  private numOfPeople:number
  private numOfMales:number
  private lastUpdate:Date

  constructor(private ngRedux:NgRedux<IAppState>) {
  }

  ngOnInit() {
    this.ngRedux.subscribe(()=>{
      var stateFromStore = this.ngRedux.getState()
      console.log('stateFromStore='+stateFromStore)
      var peopleArray =  stateFromStore.peopleArray
      console.log('peopleArray='+peopleArray)
      this.numOfPeople = peopleArray.length
      this.numOfMales = peopleArray.filter(x=> x.gender === 'Male').length
      this.lastUpdate = new Date()
    })
  }

}
