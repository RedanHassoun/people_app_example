import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as uuidv1 from 'uuid/v1'; 
const SERVER_PORT:number = 8080

class ServerApp{  
  private readonly app = express()
  private readonly peopleArray:any= [] 

  constructor(private port:number){
  }

  private initPeople(){
    this.peopleArray.push({id:uuidv1(),
      name:'redan',mail:'redan@mail.com',gender:'Male',address:"Tel-Aviv"}) 
  }

  init(){
    this.app.use(bodyParser.json());
    
    this.initPeople()
    
    this.app.get('/api/getAllPeople', (req,res)=>{
      res.send(this.peopleArray)
    })
    
    this.app.post('/api/createPerson', (req,res)=>{
        var personId = uuidv1();
        var personToAdd = {id:personId,
                          name:req.body.name,
                          mail:req.body.mail,
                          gender:req.body.gender,
                          address:req.body.address}
        this.peopleArray.push(personToAdd)
        console.log(JSON.stringify(personToAdd)+', added.')
        console.log('Array size now is : '+this.peopleArray.length)
        res.send(personToAdd);
    })
    
    this.app.delete('/api/deletePerson/:id', (req,res)=>{
      console.log('Deleting person id:'+req.params.id);
      let index = -1
      for(let i:number =0;i<this.peopleArray.length;i++ ){
          if(this.peopleArray[i].id === req.params.id){
            index = i
          }
      }
    
      console.log('the index in array : '+ index)
      if(index > -1) {
        this.peopleArray.splice(index,1)
        console.log('Deleted.')
      }
      res.send({status:'OK'})
    })
    
    this.app.listen(this.port,()=>{})
  }
}

let serverApp:ServerApp = new ServerApp(SERVER_PORT) 
serverApp.init()





