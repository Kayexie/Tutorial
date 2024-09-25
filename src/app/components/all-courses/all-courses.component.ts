import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../services/course/course.service";
import {NgForOf, NgIf} from "@angular/common";
import {VimeoVideo} from "../../models/course";
import {CourseCardComponent} from "./course-card/course-card.component";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-all-courses',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    CourseCardComponent,MatProgressSpinnerModule
  ],
  templateUrl: './all-courses.component.html',
})
export class AllCoursesComponent implements OnInit{

  constructor(private courService: CourseService) { }
  videoList: VimeoVideo[] = []
  isLoading = true;
  error = ''


  ngOnInit() {

    this.courService.getAllCourses().subscribe({
      next: res => {
        this.videoList = res.videoList
        console.log("----------------", this.videoList)
        this.isLoading = false;
      },
      error: err => {
        this.error = err.error.error
      }
    })


  }
}
