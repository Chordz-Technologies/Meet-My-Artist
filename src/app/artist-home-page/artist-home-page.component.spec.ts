import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistHomePageComponent } from './artist-home-page.component';

describe('ArtistHomePageComponent', () => {
  let component: ArtistHomePageComponent;
  let fixture: ComponentFixture<ArtistHomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistHomePageComponent]
    });
    fixture = TestBed.createComponent(ArtistHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
