import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerProfilePageComponent } from './organizer-profile-page.component';

describe('OrganizerProfilePageComponent', () => {
  let component: OrganizerProfilePageComponent;
  let fixture: ComponentFixture<OrganizerProfilePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizerProfilePageComponent]
    });
    fixture = TestBed.createComponent(OrganizerProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
