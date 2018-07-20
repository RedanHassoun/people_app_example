import { IAppState, rootReducer, INITIAL_STATE } from './app-store/store';
import { Http } from '@angular/http';
import { PeopleService } from './services/people.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PeopleComponent } from './people/people.component';
import { HttpModule } from '@angular/http';
import {NgRedux,NgReduxModule} from '@angular-redux/store'

@NgModule({
  declarations: [
    AppComponent,
    PeopleComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    NgReduxModule
  ],
  providers: [
    PeopleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private ngRedux:NgRedux<IAppState>){
      this.ngRedux.configureStore(rootReducer,INITIAL_STATE)
    }
 }
