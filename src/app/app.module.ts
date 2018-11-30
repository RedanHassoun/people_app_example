import {RouterModule} from '@angular/router';
import { IAppState, rootReducer, INITIAL_STATE } from './app-store/store';
import { Http } from '@angular/http';
import { PeopleService } from './services/people.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PeopleComponent } from './people/people.component';
import { HttpModule } from '@angular/http';
import {NgRedux,NgReduxModule} from '@angular-redux/store';
import { PeopleDashboardComponent } from './people-dashboard/people-dashboard.component'
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AddPersonComponent } from './add-person/add-person.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component'; 


@NgModule({
  declarations: [
    AppComponent,
    PeopleComponent,
    PeopleDashboardComponent,
    AddPersonComponent,
    NavbarComponent,
    NotFoundComponent,
    ProfileComponent
  ],
  entryComponents: [
    AddPersonComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    NgReduxModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatRadioModule,
    MatTableModule,
    RouterModule.forRoot([
      {
        path: 'people/:username/:id', 
        component: ProfileComponent
      },
      {
        path: 'people', 
        component: PeopleComponent
      },
      {
        path: 'dashboard', 
        component: PeopleDashboardComponent
      },
      {
        path: '**', 
        component: NotFoundComponent
      }
    ])
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
