import {NgModule} from "@angular/core"; 
import {EmployeeRepository} from "./employee.repository"; 
import {StaticDataSource} from "./static.datasource"; 
import {RestDataSource} from "./rest.datasource";
import {HttpClientModule} from "@angular/common/http";  
import {AuthService} from "./auth.service"; 
import {TimeTrackRepository} from "./timetrack.repository"; 
import {SalaryRepository} from "./salary.repository"; 
import {NotificationService} from '../notification/notification.service'; 
import {NgbDatepickerI18nEth} from './ethcalendar.service';

@NgModule({
    imports: [HttpClientModule], 
    providers: [ StaticDataSource, NotificationService, 
               {provide: StaticDataSource, useClass: RestDataSource}, 
    RestDataSource, AuthService, EmployeeRepository, TimeTrackRepository, SalaryRepository, NgbDatepickerI18nEth]
})
export class ModelModule{}