import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CreateCalendarEvent } from '../../models/calendar.interface';
import { DialogsComponent } from '../../../../shared/dialogs/dialogs.component';
@Component({
  selector: 'lmsx-calendar-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, DialogsComponent],
  templateUrl: './calendar-dialog.component.html',
  styleUrls: ['./calendar-dialog.component.scss'],
})
export class CalendarDialogComponent implements OnInit, OnChanges {
  @Input() visible = false;
  @Input() initialData: CreateCalendarEvent = {
    title: '',
    startDate: '',
    endDate: '',
    description: '',
  };

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<CreateCalendarEvent>();

  dialogForm: FormGroup;
  dialogTitle = 'ახალი ღონისძიება';
  confirmText = 'შენახვა';

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.dialogForm = this.fb.group({
      title: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialData'] && this.dialogForm) {
      this.dialogForm.patchValue(this.initialData);
    }
  }

  onClose() {
    this.close.emit();
  }

  onSave() {
    if (this.dialogForm.invalid) {
      this.dialogForm.markAllAsTouched();
      return;
    }
    this.save.emit(this.dialogForm.value);
  }
}
