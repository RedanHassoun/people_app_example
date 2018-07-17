const express = require('express')
const bodyParser = require("body-parser");
const uuidv1 = require('uuid/v1');
const app = express()
const port = 8080


var peopleArray = []

app.use(bodyParser.json());

var initPeople = ()=>{
  peopleArray.push({id:uuidv1(),name:'redan',mail:'redan@mail.com',address:"Tel-Aviv"}) 
}

initPeople()


app.get('/api/getAllPeople', (req,res)=>{
  res.send(peopleArray)
})

app.post('/api/createPerson', (req,res)=>{
    var personId = uuidv1();
    var personToAdd = {id:personId,name:req.body.name,mail:req.body.mail,address: req.body.address}
    peopleArray.push(personToAdd)
    console.log(JSON.stringify(personToAdd)+', added.')
    console.log('Array size now is : '+peopleArray.length)
    res.send(personToAdd);
})

app.delete('/api/deletePerson/:id', (req,res)=>{
  console.log('Deleting person id:'+req.params.id);
  var index = -1
  for(i=0;i<peopleArray.length;i++ ){
      if(peopleArray[i].id === req.params.id){
        index = i
      }
  }

  console.log('the index in array : '+ index)
  if(index > -1) {
    peopleArray.splice(index,1)
    console.log('Deleted.')
  }
  res.send({status:'OK'})
})



app.listen(port,()=>{})
