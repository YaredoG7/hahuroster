import {Injectable, EventEmitter, Output} from "@angular/core"; 
import {Observable} from "rxjs";
import {RestDataSource} from "./rest.datasource";

@Injectable()
@Output()

export class AuthService{

    variableEvent: EventEmitter<any> = new EventEmitter();
    constructor(private dataSource: RestDataSource){}

    authenticate(username: string, password: string): Observable<boolean>{
        return this.dataSource.authenticate(username, password); 
    }
    
    get authenticated(): boolean{
        return this.dataSource.auth_token != null; 
    }

    clear(){
        this.dataSource.auth_token = null;
    }

    public checkLogin(): boolean{
      return this.authenticated; 
    }
}