import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerSubscriptionPageComponent } from './organizer-subscription-page.component';

describe('OrganizerSubscriptionPageComponent', () => {
  let component: OrganizerSubscriptionPageComponent;
  let fixture: ComponentFixture<OrganizerSubscriptionPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizerSubscriptionPageComponent]
    });
    fixture = TestBed.createComponent(OrganizerSubscriptionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
