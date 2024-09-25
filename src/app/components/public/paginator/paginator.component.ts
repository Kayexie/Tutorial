import {Component, EventEmitter, Input, Output} from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'paginator-basic-demo',
  templateUrl: 'paginator.component.html',
  standalone: true,
  imports: [PaginatorModule]
})
export class PaginatorComponent {
  @Input() totalRecords = 0;
  @Input() pageSize = 0

  //创建新的event emitter
  @Output() pageEmitter: EventEmitter<number> = new EventEmitter<number>()

  first = 0;

  //然后emit东西
  onPageChange(event: any) {
    console.log("-----------page change event", event)
    this.first = event.first
    this.pageEmitter.emit(this.first)
  }
}
