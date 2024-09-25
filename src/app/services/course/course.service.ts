import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getAllCourses(pageSize:number, recordSkips:number): Observable<any>{
   return this.http.get(`${environment.SERVER_URL}vimeo?pageSize=${pageSize}&skips=${recordSkips}`)
  }
}
