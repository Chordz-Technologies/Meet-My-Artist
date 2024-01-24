import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistProfilePageComponent } from './artist-profile-page.component';

describe('ArtistProfilePageComponent', () => {
  let component: ArtistProfilePageComponent;
  let fixture: ComponentFixture<ArtistProfilePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistProfilePageComponent]
    });
    fixture = TestBed.createComponent(ArtistProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
