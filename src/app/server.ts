import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as uuidv1 from 'uuid/v1'; 
 
class ServerApp{  
  private readonly app = express()
  private readonly port = 8080
  private readonly peopleArray:any= []

  init(){
    this.app.use(bodyParser.json());
    
    var initPeople = ()=>{
      this.peopleArray.push({id:uuidv1(),
        name:'redan',mail:'redan@mail.com',address:"Tel-Aviv"}) 
    }
    
    initPeople()
    
    
    this.app.get('/api/getAllPeople', (req,res)=>{
      res.send(this.peopleArray)
    })
    
    this.app.post('/api/createPerson', (req,res)=>{
        var personId = uuidv1();
        var personToAdd = {id:personId,name:req.body.name,mail:req.body.mail,address: req.body.address}
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

let serverApp:ServerApp = new ServerApp() 
serverApp.init()





