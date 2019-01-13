import {Component} from "@angular/core"; 
import {NgForm} from "@angular/forms"; 
import {Router} from "@angular/router";
//import {AuthService} from "../model/auth.service";

@Component({
    templateUrl: "login.component.html"
})
export class AuthComponent{
    public username: string; 
    public password: string;
    public errorMessage: string;

    constructor(private router: Router){}

    // authencticate the user depnding on the selected user paramer / employee or admin 

    authenticate(form: NgForm){
        if (form.valid){
          // do authentication
           this.router.navigateByUrl("/main"); 
        } else {
            this.errorMessage = "Form data in valid"
        }
    }
}