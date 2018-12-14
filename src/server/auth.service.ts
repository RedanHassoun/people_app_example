export class AuthService {
    private readonly constToken:string='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    
    constructor() {  
    }

    authenticate(email,password){
        console.log('server got mail='+email)
        console.log('server got password='+password);
        if(email === 'redan@mail.com' && password==='1234'){
            return {status:200,token: this.constToken}
        }else{
            return {status:400}
        }
    }
   
  }
  