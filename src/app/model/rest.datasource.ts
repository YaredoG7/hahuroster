import {Injectable} from "@angular/core"; 
import {HttpClient} from "@angular/common/http"; 
import {Observable} from "rxjs"; 
import {Employee} from "./employee.model";  
import {TimeTrack} from "./timeTrack.model"; 
import {map} from "rxjs/operators";
import {HttpHeaders} from "@angular/common/http";

const PROTOCOL = "http";
const PORT = 3500; 

@Injectable()
export class RestDataSource{
    baseUrl: string; 
    auth_token: string; 

    constructor(private http: HttpClient){
        this.baseUrl = "http://localhost:3000/";

        
    }

    getEmployees(): Observable<Employee[]>{
        return this.http.get<Employee[]>(this.baseUrl + "employees");
    }

    // save the order ==> to be implemented in other sense here 


    authenticate(user: string, pass: string): Observable<boolean>{

        return this.http.post<any>(this.baseUrl + "login", {
            name: user, password: pass
        }).pipe(map(response => {
            console.log(response);
            this.auth_token = response.success ? response.token: null; 
            return response.success;
        }));
       
    }

    saveEmployee(employee: Employee): Observable<Employee>{

        return this.http.post<Employee>(this.baseUrl + "employees", employee, this.getOptions()); 
    }

    updateEmployee(employee): Observable<Employee>{
        return this.http.put<Employee>(`${this.baseUrl}employees/${employee.id}` , employee, this.getOptions())
    }

    deleteEmployee(id:number): Observable<Employee>{
        return this.http.delete<Employee>(`${this.baseUrl}employees/${id}` , this.getOptions())
    }


   // get all times from time track

   getTimeTracks(): Observable<TimeTrack[]>{
       return this.http.get<TimeTrack[]>(this.baseUrl + "timetrack"); 
   }

   // register new timer for non existent user 
   registerTime(timetrack):  Observable<TimeTrack>{
    return this.http.post<TimeTrack>(this.baseUrl + "timetrack", timetrack, this.getOptions())
   }

   // inserts new date to the absent array 
   saveNewAbsent(timetrack): Observable<TimeTrack>{
       return this.http.put<TimeTrack>(`${this.baseUrl}timetrack/${timetrack.id}` , timetrack, this.getOptions())
   }

   // register all the hours that has been missued

   hoursWasted(timetrack): Observable<TimeTrack>{
    return this.http.put<TimeTrack>(`${this.baseUrl}latehours/${timetrack.id}` , timetrack, this.getOptions())
   }

   // register over time

   overTime(timetrack):Observable<TimeTrack>{
    return this.http.put<TimeTrack>(`${this.baseUrl}overtime/${timetrack.id}` , timetrack, this.getOptions())
   }

  // update sickleave dates 
   sickLeave(timetrack):Observable<TimeTrack>{
    return this.http.put<TimeTrack>(`${this.baseUrl}sickleave/${timetrack.id}` , timetrack, this.getOptions())
   }


 // update holiday dates 

 insertHoliday(timetrack):Observable<TimeTrack>{
    return this.http.put<TimeTrack>(`${this.baseUrl}holiday/${timetrack.id}` , timetrack, this.getOptions())
   }

// delete a timetracker 

 deleteTimeTrack(id:number): Observable<Employee>{
    return this.http.delete<Employee>(`${this.baseUrl}timetrack/${id}` , this.getOptions())
}

   // for authentication purpose
    private getOptions(){
        return {
            headers: new HttpHeaders({
                "Authorization": `Bearer<${this.auth_token}>`
            }) 
        }
    }
}
