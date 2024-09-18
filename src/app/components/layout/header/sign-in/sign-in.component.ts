import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import {ButtonModule} from "primeng/button";
import { InputTextModule } from 'primeng/inputtext';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, ReactiveFormsModule, NgIf],
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {

  visible: boolean = false;
  showPassword = false;

  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ]),
  })

  showDialog() {
    this.visible = true;
  }

  toggleShow(){
    this.showPassword = !this.showPassword
  }

  onSubmit(){
    console.log("this.sign in form value", this.signInForm.value)
  }

}
