import {Component, inject} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import {ButtonModule} from "primeng/button";
import { InputTextModule } from 'primeng/inputtext';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../../services/user/user.service";
import {AuthTokenService} from "../../../../services/authToken/auth-token.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, ReactiveFormsModule, NgIf],
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {

  http = inject(HttpClient)
  userService = inject(UserService)
  authService = inject(AuthTokenService)
  router = inject(Router)

  visible: boolean = false;
  showPassword = false;
  error = ''

  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ]),
  })

  showDialog() {
    this.visible = true;
    this.router.navigate(['/signIn'])
  }

  toggleShow() {
    this.showPassword = !this.showPassword
  }

  onSubmit() {

    const formValue = this.signInForm.value
    this.error = ''
    this.userService.signIn(formValue).subscribe({

      next: res => {
        this.visible = false;
        this.signInForm.reset()
        this.authService.setToken(res.token)

        const expireTime = JSON.parse(atob(res.token.split('.')[1])).exp*1000
        const currentTime = Date.now()
        const expIn = expireTime - currentTime

        if(expIn > 0){
          this.authService.autoRemoveToken(expIn)
        } else {
          this.authService.removeToken()
        }
      },
      error: err => {
        this.error = err.error.error
      }
    })

  }

  closeDialog(){
    this.error=''
    this.signInForm.reset()
    this.visible = false;
    this.router.navigate([''])
  }
}
