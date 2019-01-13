import {NgModule} from "@angular/core"; 
import {EmployeeRepository} from "./employee.repository"; 
import {StaticDataSource} from "./static.datasource"; 
import {RestDataSource} from "./rest.datasource";
import{HttpClientModule} from "@angular/common/http";  
import {AuthService} from "./auth.service"; 
import {TimeTrackRepository} from "./timetrack.repository"; 

@NgModule({
    imports: [HttpClientModule], 
    providers: [ StaticDataSource, 
               {provide: StaticDataSource, useClass: RestDataSource}, 
    RestDataSource, AuthService, EmployeeRepository, TimeTrackRepository]
})
export class ModelModule{}