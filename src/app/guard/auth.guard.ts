import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";


export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const token = sessionStorage.getItem('authToken')

  if (token){
    return true
  } else {
    router.navigate(['signIn'])
    return false;
  }

};
