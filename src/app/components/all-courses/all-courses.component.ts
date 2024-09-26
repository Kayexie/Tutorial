import {Component, OnChanges, OnInit} from '@angular/core';
import {CourseService} from "../../services/course/course.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {VimeoVideo} from "../../models/course";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {PaginatorComponent} from "../public/paginator/paginator.component";
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-all-courses',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatProgressSpinnerModule,
    PaginatorComponent, DatePipe, DividerModule
  ],
  templateUrl: './all-courses.component.html',
})
export class AllCoursesComponent implements OnInit{

  constructor(private courseService: CourseService, private sanitizer: DomSanitizer) { }
  videoList: (VimeoVideo & {html: SafeResourceUrl})[] = []
  isLoading = true;
  error = ''
  totalRecords = 0
  recordSkips = 0
  pageSize = 3

  onSkipsChange(skips:number){
    this.recordSkips = skips
    this.getCourses()
  }

  getCourses(){
    this.isLoading = true;
    this.courseService.getAllCourses(this.pageSize, this.recordSkips).subscribe({
      next: res => {
        this.totalRecords = res.totalVideo
        this.videoList = res.videoList.map((video: VimeoVideo) => {
          return {
            ...video,
            html: this.sanitizer.bypassSecurityTrustResourceUrl(video.html)
          }
        })
        this.isLoading = false;
        console.log("--------------", this.videoList )
      },
      error: err => {
        this.error = err.error.error
        this.isLoading = false;
      }
    })
  }

  ngOnInit() {
    this.getCourses()
  }
}
