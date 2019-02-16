import { PersonModel } from "server/repo/sequelize.connection";

export var authenticate = (req,res,next)=>{
    let token = req.header('x-auth')
    PersonModel.findByToken(token)
        .then((person)=>{
          if(!person){
            res.status(404).send({})
          }

          req.person = person;
          req.token = token;
          next();
        })
        .catch(e=>{
          res.status(401).send(e)
        })
  }