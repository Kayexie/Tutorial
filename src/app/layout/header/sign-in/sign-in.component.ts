import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import {ButtonModule} from "primeng/button";
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

}
