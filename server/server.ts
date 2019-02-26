import { Repository } from './repo/repository';
import { DataService } from './data.service'; 
import { Logger } from './logger';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { AuthService } from './auth.service';
import _ = require('lodash');
import { authenticate } from './middleware/authenticate';
const SERVER_PORT:number = 3000

class ServerApp{  
  private readonly app = express() 

  constructor(private port:number,
              private peopleService:DataService,
              private authService:AuthService){
  }
 
  init(){
    this.app.use(bodyParser.json());
    
    this.app.get('/api/peopleapp',authenticate, (req,res)=>{
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
                console.log(`Person ${p.name} saved successfully`)
                res.header('x-auth', p.token).send(p)
              })
              .catch(e=>{
                console.error('Cannot save person',JSON.stringify(e,undefined,2))
                console.error('Error posting person',e)
                res.status(400).send(e)
              })
    })
 
    
    this.app.delete('/api/peopleapp/:id',authenticate, (req,res)=>{
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
      res.send(req.person)
    })

    this.app.post('/api/users/login', (req,res)=>{
      let person = _.pick(req.body, [
        'mail','password'
      ])

      if(!person.mail || !person.password){
        res.status(400).send({message:"mail and password should be specified"})
      }

      this.peopleService.findPersonByCredentials(person.mail, person.password)
          .then(p=>{
            let token = p.token
            if(!token){
              let msg = `An error occurred while generating token for ${person.mail}`
              console.log(msg)
              res.status(500).send({message:msg})
            }
            res.header('x-auth', token).send(p)
          })
          .catch(e=>{
            res.status(400).send(e)
          })
    })
    

    this.app.delete('/api/users/me/token',authenticate, (req,res)=>{
      let token = req.header('x-auth')
      this.peopleService.removeTokenForUser(token)
            .then((p)=>{
              res.status(200).send()
            })
            .catch(e=>{
              console.error('An error occurred while deleting the token:',token)
              console.error(JSON.stringify(e))
              res.status(400).send(e)
            })
    });

    this.app.listen(this.port,()=>{})
  }
}

let repo:Repository = new Repository()
let serverApp:ServerApp = new ServerApp(SERVER_PORT,
                                        new DataService(repo),
                                        new AuthService()) 

serverApp.init();






