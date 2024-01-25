import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventManageFormComponent } from './event-manage-form.component';

describe('EventManageFormComponent', () => {
  let component: EventManageFormComponent;
  let fixture: ComponentFixture<EventManageFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventManageFormComponent]
    });
    fixture = TestBed.createComponent(EventManageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
