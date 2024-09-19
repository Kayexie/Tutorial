import {Component, inject} from '@angular/core';
import {Button} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { NgIf } from '@angular/common';
import {UserService} from "../../../../services/user/user.service";

@Component({
  selector: 'app-sign-up',
  standalone: true,
    imports: [
        Button,
        DialogModule,
        InputTextModule,
        ReactiveFormsModule,
        NgIf
    ],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {

    visible: boolean = false;
    showPassword: boolean = false;
    userService = inject(UserService)
    error = ''

    passwordMatchValidator(control: AbstractControl){

        const password = control.get('password')?.value;
        const confirmPassword = control.get('confirmPassword')?.value;

        return password == confirmPassword ? null : {'notMatch':true}
    }


    // 先定义sign up form group:
    signUpForm = new FormGroup({
        userName: new FormControl('', [Validators.minLength(5)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('',[
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        ]),
        confirmPassword: new FormControl('',[
            Validators.required,
            Validators.minLength(8),
        ])
    }, {
        validators: this.passwordMatchValidator,
    })

    showDialog() {
        this.visible = true;
    }

    onSubmit(){
        const formValue = this.signUpForm.value
        this.error = ''
        this.userService.createNewUser(formValue).subscribe({
            next: res => {
                this.signUpForm.reset()
                this.visible = false

            },
            error: err => {
                this.error = err.error.error
            }
        })
    }

    closeDialog(){
        this.error=''
        this.visible = false
        this.signUpForm.reset()
    }

    toggleShow(){
        this.showPassword = !this.showPassword
        
    }
}
