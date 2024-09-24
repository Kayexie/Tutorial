import {Component, inject, OnInit} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {UserService} from "../../services/user/user.service";
import {User} from "../../models/user";
import {DatePipe} from "@angular/common";
import {AuthTokenService} from "../../services/authToken/auth-token.service";

/**
 * @title Inputs in a form
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: 'user-profile.component.html',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, DatePipe],
})

export class UserProfileComponent implements OnInit{

    userObject = new User()
    constructor(private userService: UserService) {}

    updateInfo(){

        this.userService.updateUserInfo(this.userObject, this.userObject.userId)
            .subscribe( res => {
                console.log("--------------update response", res)
            })
    }

 ngOnInit() {

      //get the token first and decode it
     const token = sessionStorage.getItem('authToken');

     if(token){
         const userId = JSON.parse(atob(token.split(".")[1])).userId
         this.userService.getOneUser(userId).subscribe(res => {
             this.userObject.userId = res._id
             this.userObject.userName = res.userName
             this.userObject.email = res.email
             this.userObject.role = res.role
             this.userObject.createdAt = res.createdAt
             this.userObject.updatedAt = res.updatedAt
         })
     }else{
         console.error("Failed to load token")
     }
 }
 
}
