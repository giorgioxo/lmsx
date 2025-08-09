import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEditContainerComponent } from './calendar-edit-container.component';

describe('CalendarEditContainerComponent', () => {
  let component: CalendarEditContainerComponent;
  let fixture: ComponentFixture<CalendarEditContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarEditContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
