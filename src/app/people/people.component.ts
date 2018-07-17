import { Person } from 'src/app/model/person';
import { PeopleService } from './../services/people.service';
import { Component, OnInit } from '@angular/core'; 

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  peopleArray:Person[] = [] 
  hideMe:boolean[] = []
  newPerson:Person = new Person()

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
    this.newPerson.reset()
 
  }

  private addToPeople(person){
    this.peopleArray.push(person)
    this.hideMe.push(true)
    this.newPerson.reset()
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
        (this.newPerson.getName() ==="") || 
        (this.newPerson.getAddress() ==="") || 
        (this.newPerson.getMail() ==="") ){
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
