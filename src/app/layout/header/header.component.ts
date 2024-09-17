import { Component } from '@angular/core';
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";


@Component({
  selector: 'app-header',
  standalone: true,
    imports: [
        SignInComponent,
        SignUpComponent
    ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
