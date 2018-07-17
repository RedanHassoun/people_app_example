export class Person {
    id:string = ""
    name:string = ""
    mail:string = ""
    address:string = ""

    setId(id:string){
        this.id = id 
    }

    setName(name:string){
        this.name = name 
    }

    setMail(mail:string){
        this.mail = mail 
    }

    setAddress(address:string){
        this.address = address
    }

    getId(){
        return this.id 
    }

    getName(){
        return this.name 
    }

    getMail(){
        return this.mail 
    }

    getAddress(){
        return this.address
    }

    json(){
        return {
            id: this.id,
            name : this.name,
            mail : this.mail,
            address : this.address 
        }
    }

    reset(){
        this.name = ""
        this.mail = ""
        this.address = ""
    }
}
