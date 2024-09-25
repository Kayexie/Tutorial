import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {VimeoVideo} from "../../../models/course";
import {PrimeTemplate} from "primeng/api";

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [
    MatCardModule,
    PrimeTemplate
  ],
  templateUrl: './course-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCardComponent {

  @Input() video?: VimeoVideo;



  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

}
