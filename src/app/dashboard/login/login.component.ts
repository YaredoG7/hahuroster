import { Component } from '@angular/core';
import { AuthService } from '../../model/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public username: string;
  public password: string;
  public errorMessage: string;

  constructor(private router: Router, private auth: AuthService) {}

  authenticate(form: NgForm) {
    if (form.valid) {
      // do the authentication
      this.auth
        .authenticate(this.username, this.password)
        .subscribe(response => {
          if (response) {
            this.router.navigateByUrl('/main');
          }
          this.errorMessage = 'Authentication Failed';
        });
    } else {
      this.errorMessage = 'Form Data Invalid';
    }
  }
}
