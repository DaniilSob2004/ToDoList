import { Component, EventEmitter, OnChanges, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.css'
})
export class FilterPanelComponent {
  @Output() searchTextChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() searchByValueChanged: EventEmitter<string> = new EventEmitter<string>();

  searchByArr: string[] = [
    'title',
    'description',
    'tags',
    'priority'
  ];

  onInputChanged(event: any): void {
    this.searchTextChanged.emit(event.target.value);
  }

  onSelectChanged(event: any): void {
    this.searchByValueChanged.emit(event.target.value);
  }
}
