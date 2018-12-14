//import * as fs from 'fs';

export class Logger{
    //private static readonly FILE_NAME="server.log"
    
    static log(message){
        console.log(message);
        // fs.writeFile(Logger.FILE_NAME, message, function(err){
        //     if (err) console.log(err); 
        // });
    }
}