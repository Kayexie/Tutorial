import { Routes } from '@angular/router';
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {SignInComponent} from "./components/layout/header/sign-in/sign-in.component";
import {SignUpComponent} from "./components/layout/header/sign-up/sign-up.component";
import {authGuard} from "./guard/auth.guard";
import {AllCoursesComponent} from "./components/all-courses/all-courses.component";

export const routes: Routes = [
    {
        path:'',
        redirectTo:'signIn',
        pathMatch: 'full',
    },
    {
        path:'signIn',
        component: SignInComponent
    },
    {
        path:'signUp',
        component: SignUpComponent
    },
    {
        path:'user-profile',
        component: UserProfileComponent,
        canActivate: [authGuard]
    },
    {
        path:'all-courses',
        component: AllCoursesComponent,
        canActivate:[authGuard]
    }
];
