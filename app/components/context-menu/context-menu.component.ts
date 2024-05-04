import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { Project } from '../../interfaces/project';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.css'
})
export class ContextMenuComponent implements AfterViewChecked {
  @Input() contextMenuCoords: any | undefined;
  @Output() editElement: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteElement: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('contextMenu') contextMenu!: ElementRef;

  ngAfterViewChecked(): void {
    if (this.contextMenu) {
      this.contextMenu.nativeElement.focus();
    }
  }

  hide(): void {
    this.contextMenuCoords = undefined;
  }
}
