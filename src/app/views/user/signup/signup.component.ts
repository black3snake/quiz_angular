import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginResponseType} from "../../../../types/login-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../core/auth/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SignupResponseType} from "../../../../types/signup-response.type";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[А-Я][а-я]+\s*$/)]),
    lastName: new FormControl('', [Validators.required, Validators.pattern(/^[А-Я][а-я]+\s*$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),
    agree: new FormControl(false, [Validators.required]),
  })

  get name() {
    return this.signupForm.get('name');
  }

  get lastName() {
    return this.signupForm.get('lastName');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get agree() {
    return this.signupForm.get('agree');
  }

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) {
  }

  signup(): void {
    if (this.signupForm.valid && this.signupForm.value.password &&  this.signupForm.value.email
    && this.signupForm.value.name && this.signupForm.value.lastName) {
      this.authService.signup(this.name?.value, this.lastName?.value, this.email?.value, this.password?.value)
        .subscribe({
            next: (data: SignupResponseType) => {
              if (data.error || !data.user) {
                this._snackBar.open('Ошибка при регистрации')
                throw new Error(data.message ? data.message : 'Error with data on signup');
              }
              // login
              this.authService.login(this.email?.value, this.password?.value)
                .subscribe({
                  next: (data: LoginResponseType) => {
                    if (data.error || !data.accessToken || !data.refreshToken
                      || !data.fullName || !data.userId) {
                      this._snackBar.open('Ошибка при авторизации')
                      throw new Error(data.message ? data.message : 'Error with data on login');
                    }
                    // this.authService.setUserInfo({
                    //   fullName: data.fullName,
                    //   userId: data.userId,
                    //   email: this.email?.value
                    // })
                    // this.authService.setTokens(data.accessToken, data.refreshToken);
                    // // console.log(data)
                    this.router.navigate(['/choice']);
                  },
                  error: (error: HttpErrorResponse) => {
                    this._snackBar.open('Ошибка при авторизации')
                    console.error(error);
                    throw new Error(error.error.message);
                  }
                })

            },
            error: (error: HttpErrorResponse) => {
              this._snackBar.open('Ошибка при регистрации')
              throw new Error(error.error.message);
            }
          }
        )
    }


  }
}
