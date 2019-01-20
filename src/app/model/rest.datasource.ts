import {Injectable} from "@angular/core"; 
import {HttpClient} from "@angular/common/http"; 
import {Observable, throwError } from "rxjs"; 
import {Employee} from "./employee.model";  
import {TimeTrack} from "./timeTrack.model"; 
import {map, catchError, retry} from "rxjs/operators";
import {HttpHeaders, HttpResponse, HttpErrorResponse} from "@angular/common/http";
import {Salary} from "./salary.model"; 

const PROTOCOL = "http";
const PORT = 3500; 

@Injectable()
export class RestDataSource{
    baseUrl: string; 
    auth_token: string; 

    constructor(private http: HttpClient){
      //  this.baseUrl = "http://localhost:300/";

      this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;        
    }

    getEmployees(): Observable<HttpResponse<Employee[]>>{
        return this.http.get<Employee[]>(this.baseUrl + "employees", { observe: 'response' })
                        .pipe(catchError(this.handleError));
    }
    
    authenticate(user: string, pass: string): Observable<boolean>{

        return this.http.post<any>(this.baseUrl + "login", {
            name: user, password: pass
        }).pipe(map(response => {
            console.log(response);
            this.auth_token = response.success ? response.token: null; 
            return response.success;
        }));
       
    }

    saveEmployee(employee: Employee): Observable<HttpResponse<Employee>>{

        return this.http.post<Employee>(this.baseUrl + "employees", employee, { observe: 'response' })
                        .pipe(catchError(this.handleError)); 
    }

    updateEmployee(employee): Observable<HttpResponse<Employee>>{
        return this.http.put<Employee>(`${this.baseUrl}employees/${employee.id}` , employee, { observe: 'response' })
    }

    deleteEmployee(id:number): Observable<HttpResponse<Employee>>{
        return this.http.delete<Employee>(`${this.baseUrl}employees/${id}` , { observe: 'response' })
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


// get the salary items

getSalaries(): Observable<Salary[]>{
   return this.http.get<Salary[]>(this.baseUrl + "salaries");
}

// save new salary details

saveSalary(salary: Salary): Observable<Salary>{
    console.log("I got " + salary.empId); 
    return this.http.post<Salary>(this.baseUrl + "salaries", salary);
}

   // for authentication purpose
    private getOptions(){
        return {
            headers: new HttpHeaders({
                "Authorization": `Bearer<${this.auth_token}>`
            }) 
        }
    }

  // handle error message 

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
    //  this.notificationService.error('An error occurred:' + error.error.message); 
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
     // this.notificationService.error('Server returned an unsuccessful response code:' + error.status)
     console.error(
       `Backend returned code ${error.status}, ` +
      `body was: ${error.message}`);
      
    }
    // return an observable with a user-facing error message
    return throwError(
        'Server came back with error! Code: ' + error.status + ' '+ error.statusText);
  };

}
