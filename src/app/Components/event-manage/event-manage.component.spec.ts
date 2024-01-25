import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventManageComponent } from './event-manage.component';

describe('EventManageComponent', () => {
  let component: EventManageComponent;
  let fixture: ComponentFixture<EventManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventManageComponent]
    });
    fixture = TestBed.createComponent(EventManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
