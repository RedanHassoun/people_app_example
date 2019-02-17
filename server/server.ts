import { Repository } from './repo/repository';
import { DataService } from './data.service'; 
import { Logger } from './logger';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { AuthService } from './auth.service';
import _ = require('lodash');
import { PersonModel } from './repo/sequelize.connection';
import { authenticate } from './middleware/authenticate';
const SERVER_PORT:number = 8080

class ServerApp{  
  private readonly app = express() 

  constructor(private port:number,
              private peopleService:DataService,
              private authService:AuthService){
  }
 
  init(){
    this.app.use(bodyParser.json()); 
    
    this.app.post('/api/authenticate', (req,res)=>{
      let result = this.authService.authenticate(req.body.email,req.body.password)
      Logger.log('Server result: '+result)

      res.send(result)
    })
     
    this.app.get('/api/peopleapp', (req,res)=>{
      this.peopleService.getAllPeople()
        .then(people=>{
          res.json(people)
        })
        .catch(e=>{
          console.error('Cant get all people!')
          res.status(404).send(e) 
        })
    })
    
    this.app.post('/api/peopleapp', (req,res)=>{
        let person = _.pick(req.body, [
          'name','mail','password','gender','address'
        ])
        this.peopleService.createPerson(person)
              .then(p=>{
                res.header('x-auth', p.token).send(p)
              })
              .catch(e=>{
                console.error('Error posting person',e)
                res.status(400).send(e)
              })
    })
    
    this.app.delete('/api/peopleapp/:id', (req,res)=>{
      console.log('Deleting person id:'+req.params.id);
      this.peopleService.deletePerson(req.params.id)
        .then(()=>{
          res.send({status:'OK'})
        })
        .catch(err=>{
          console.error(`Can't delete person with id: ${req.params.id} `,err)
          res.status(400).send({status:'NOT_OK'}) 
        })
    })
    
    this.app.get('/api/users/me',authenticate,(req,res)=>{
      let token = req.header('x-auth')
      PersonModel.findByToken(token)
          .then((person)=>{
            if(!person){
              res.status(401).send({})
            }

            res.send(req.person)
          })
          .catch(e=>{
            res.status(401).send(e)
          })
    })
    
    this.app.listen(this.port,()=>{})
  }
}

let repo:Repository = new Repository()
let serverApp:ServerApp = new ServerApp(SERVER_PORT,
                                        new DataService(repo),
                                        new AuthService()) 

serverApp.init();






