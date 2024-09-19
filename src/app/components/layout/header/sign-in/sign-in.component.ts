import {Component, inject} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import {ButtonModule} from "primeng/button";
import { InputTextModule } from 'primeng/inputtext';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../../services/user/user.service";


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, ReactiveFormsModule, NgIf],
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {

  visible: boolean = false;
  showPassword = false;
  http = inject(HttpClient)
  userService = inject(UserService)
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
  }
}
