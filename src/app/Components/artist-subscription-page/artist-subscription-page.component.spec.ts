import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistSubscriptionPageComponent } from './artist-subscription-page.component';

describe('ArtistSubscriptionPageComponent', () => {
  let component: ArtistSubscriptionPageComponent;
  let fixture: ComponentFixture<ArtistSubscriptionPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistSubscriptionPageComponent]
    });
    fixture = TestBed.createComponent(ArtistSubscriptionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
