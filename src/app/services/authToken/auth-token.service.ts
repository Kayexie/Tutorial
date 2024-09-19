import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  //初始设定这个token的值为null;
  private token = new BehaviorSubject<string | null>(null);

  constructor() {
    //当页面首次加载的时候，检查session里面是否有token，有的话就拿过来
    const storedToken = sessionStorage.getItem('authToken');
    if (storedToken) {
      this.token.next(storedToken);  // 初始化时将 sessionStorage 的 token 存储到 BehaviorSubject 中
    }
  }

  getToken(): Observable<string | null>{
    return this.token.asObservable()
  }

  removeToken(): void{
    sessionStorage.removeItem('authToken');
    this.token.next(null)
  }

  setToken(token:string){
    sessionStorage.setItem('authToken', token)
    this.token.next(token)
  }
}
