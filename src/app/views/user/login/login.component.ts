import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {LoginResponseType} from "../../../../types/login-response.type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$/')]),
  })

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  constructor(private authService: AuthService, private router: Router) {
  }

  login() {
    if(this.loginForm.valid) {
      this.authService.login(this.email?.value, this.password?.value)
        .subscribe({
          next: (data: LoginResponseType) => {

            if (data.error || !data.accessToken || !data.refreshToken
              || !data.fullName || !data.userId) {
              this.router.navigate(['/']);
              throw new Error(data.message ? data.message : 'Error with data on login');
            }
            // Auth.setTokens(result.accessToken, result.refreshToken);
            // Auth.setUserInfo({
            //   fullName: result.fullName,
            //   userId: result.userId,
            //   email: this.email as string
            // })
            this.router.navigate(['/choice']);



          },
          error: (error: HttpErrorResponse) => {
            this.router.navigate(['/']);
            console.error(error);
            throw new Error(error.error.message);
          }
          }

        )
    }
  }
}
