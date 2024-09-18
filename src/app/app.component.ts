import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./components/layout/header/header.component";
import {SideBarComponent} from "./components/layout/side-bar/side-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, HeaderComponent, SideBarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Online Learning Education';

}
