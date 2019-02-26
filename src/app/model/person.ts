export class Person {
    id:string = ""
    name:string = ""
    mail:string = ""
    address:string = ""
    gender:string = ""
    isHidden:boolean = true 
    password:string = ""
    passwordConfirm:string = ""

    isPasswordMatch():boolean{
        if(this.password && this.password === this.passwordConfirm){
            return true
        }
        return false
    }
    setId(id:string){
        this.id = id 
    }

    getPassword():string{
        return this.password 
    }

    setPassword(password:string):void{
        this.password = password
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

    getGender(){
        return this.gender
    }

	setGender(gender){
        this.gender = gender
    }
	
    json(){
        return {
            id: this.id,
            name : this.name,
            mail : this.mail,
            gender: this.gender,
            address : this.address,
            password: this.password
        }
    }

    reset(){
        this.name = ""
        this.mail = ""
        this.address = ""
        this.gender = ""
        this.password = ""
        this.passwordConfirm = ""
    }

    isEmpty(){
        return (this.getName().trim() ==="") || 
        (this.getAddress().trim() ==="") || 
        (this.getMail().trim() ==="") || 
        (this.getGender().trim() ==="") ||
        (this.getPassword().trim() ==="")
    }
	
	static fromRequest(req):Person{ 
        let p = new Person();
        p.id = undefined
        p.setName(req.body.name) 
        p.setMail(req.body.mail)
        p.setGender(req.body.gender)
        p.setAddress(req.body.address)

        return p 
    }
}
