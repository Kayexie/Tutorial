import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment.development";
import {User, UserResponse} from "../../models/user";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  // constructor(private http: HttpClient) {}
  http = inject(HttpClient)

  createNewUser(object: any): Observable<any>{
    return this.http.post(environment.SERVER_URL + 'user/signUp', object)
  }

  signIn(object: any): Observable<any>{
    return this.http.post(environment.SERVER_URL + 'user/signIn', object)
  }

  getOneUser(userId: number): Observable<UserResponse>{
    return this.http.get<UserResponse>(environment.SERVER_URL + `user/${userId}`)
  }

  updateUserInfo(userInfo: User, userId: string): Observable<any>{

    return this.http.put(environment.SERVER_URL + `user/${userId}`, userInfo, {
      headers:{
        'Content-Type': 'application/json'
      }
  })
  }

}
