import { DataService } from './data.service'; 
import { Logger } from './logger';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as uuidv1 from 'uuid/v1';   
 
const SERVER_PORT:number = 8080

class ServerApp{  
  private readonly app = express()

  constructor(private port:number,
              private peopleService:DataService){
  }
 
  init(){
    this.app.use(bodyParser.json());
    
    this.peopleService.initPeople()
    
    this.app.get('/api/peopleapp', (req,res)=>{
      res.send(this.peopleService.getAllPeople())
    })
    
    this.app.post('/api/peopleapp', (req,res)=>{
        let personToAdd = {id:undefined,
        name:req.body.name,
        mail:req.body.mail,
        gender:req.body.gender,
        address:req.body.address}

        res.send(this.peopleService.createPerson(personToAdd));
    })
    
    this.app.delete('/api/peopleapp/:id', (req,res)=>{
      console.log('Deleting person id:'+req.params.id);
      res.send(this.peopleService.deletePerson(req.params.id))
    })
    
    this.app.listen(this.port,()=>{})
  }
}

let serverApp:ServerApp = new ServerApp(SERVER_PORT,
                                        new DataService()) 
serverApp.init()





