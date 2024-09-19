import {Component, inject} from '@angular/core';
import {AuthTokenService} from "../../../../services/authToken/auth-token.service";

@Component({
  selector: 'app-sign-out',
  standalone: true,
  imports: [],
  templateUrl: './sign-out.component.html',
})
export class SignOutComponent {

  authService = inject(AuthTokenService)

  signOut(){
    this.authService.removeToken()
  }
}
