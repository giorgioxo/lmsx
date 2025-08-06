import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lmsx-dialogs',
  imports: [CommonModule, FormsModule],
  templateUrl: './dialogs.component.html',
  styleUrl: './dialogs.component.scss',
})
export class DialogsComponent {
  @Input() showCheckbox = false;
  @Input() confirmText: string = 'დადასტურება';
  @Input() title: string = '';
  @Input() showButton: boolean = false;

  @Output() close = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<void>();

  @ViewChild('contentContainer') contentContainer!: ElementRef<HTMLDivElement>;
  constructor() {}
  isChecked = false;
  isScrolledBottom = false;

  onClose() {
    this.close.emit();
  }

  onConfirm() {
    if (this.showCheckbox && !this.isChecked) return;
    this.confirmed.emit();
  }
}
