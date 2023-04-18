import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  @Input() placeholder: string = '';
  @Output() send = new EventEmitter<string>();

  sendFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.send.emit(filterValue.trim().toLowerCase())
  }

  clearFilter(input: HTMLInputElement) {
    input.value = '';
    this.send.emit(input.value);
  }

}
