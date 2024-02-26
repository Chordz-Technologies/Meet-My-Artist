import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSubscriptionPageComponent } from './user-subscription-page.component';

describe('UserSubscriptionPageComponent', () => {
  let component: UserSubscriptionPageComponent;
  let fixture: ComponentFixture<UserSubscriptionPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSubscriptionPageComponent]
    });
    fixture = TestBed.createComponent(UserSubscriptionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
