import {Component, inject, OnInit} from '@angular/core';
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {AsyncPipe, NgIf} from "@angular/common";
import {SignOutComponent} from "./sign-out/sign-out.component";
import {AuthTokenService} from "../../../services/authToken/auth-token.service";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-header',
  standalone: true,
    imports: [
        SignInComponent,
        SignUpComponent,
        NgIf,
        SignOutComponent,
        AsyncPipe,
        RouterLink
    ],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit{

    authServer = inject(AuthTokenService)
    token: string | null = null

    ngOnInit() {
        this.authServer.getToken().subscribe( token => {
            this.token = token
        })
    }
}
