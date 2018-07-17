import { PeopleService } from './../services/people.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  peopleArray:any[] = [] 
  hideMe:boolean[] = []
  newPersonName:string // TODO : create a Person class
  newPersonMail:string 
  newPersonAddress:string

  constructor(private peopleService:PeopleService) { }

  ngOnInit() { 
    this.peopleService.getAllPeople()
                        .subscribe((response)=>{
                          console.log('ngOnInit | '+response.json())
                          this.initPeople( response.json())
                        },
                      (error)=>{
                        console.log('An error occurred: '+error)
                        alert('An error occurred while connecting to server')
                      })
    this.newPersonMail = ""
    this.newPersonName = ""
    this.newPersonAddress = ""
 
  }

  private addToPeople(person){
    this.peopleArray.push(person)
    this.hideMe.push(true)
    this.newPersonMail = ""
    this.newPersonName = ""
    this.newPersonAddress = ""
  }

  private initPeople(people){
    this.peopleArray = people 
    this.hideMe = new Array(this.peopleArray.length).fill(true);
  }

  private removeFromPeople(person){
    var index = this.peopleArray.indexOf(person)
    this.peopleArray.splice(index,1)
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
    if(
        (this.newPersonMail==="") || 
        (this.newPersonName==="") || 
        (this.newPersonAddress==="") ){
      alert("Missing person data")
    }else{
      var person = {
        name: this.newPersonName,
        mail : this.newPersonMail,
        address : this.newPersonAddress
      }
      this.peopleService.createPerson(person)
                          .subscribe((response)=>{
                            console.log('Create person response: '+JSON.stringify(response))
                            this.addToPeople(response.json()) 
                            this.newPersonMail = ""
                            this.newPersonName = ""
                            this.newPersonAddress = ""
                          },
                          (error)=>{
                            console.log('An error occurred: '+error)
                            alert('An error occurred while connecting to server')
                          })
    }


  }
}
