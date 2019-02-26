import { AppConsts } from "./app-consts";

export class AppUtil{
    static extractAndSaveToken(response:any):void{
        if(!response['headers']){
            throw new Error('No headers found in response')
        }
        let headers = response['headers'].toJSON()
        if(!headers['x-auth'][0]){
            throw new Error('Cannot find token inside headers')
        }
        localStorage.setItem(AppConsts.KEY_USER_TOKEN,headers['x-auth'][0]);
    }
}