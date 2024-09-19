import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient)
  // constructor(private http: HttpClient) {}

  createNewUser(object: any): Observable<any>{
    return this.http.post(environment.SERVER_URL + 'user/signUp', object)
  }

  signIn(object: any): Observable<any>{
    return this.http.post(environment.SERVER_URL + 'user/signIn', object)
  }
}
