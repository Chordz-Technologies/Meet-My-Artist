import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistsHomePageComponent } from './artists-home-page.component';

describe('ArtistsHomePageComponent', () => {
  let component: ArtistsHomePageComponent;
  let fixture: ComponentFixture<ArtistsHomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistsHomePageComponent]
    });
    fixture = TestBed.createComponent(ArtistsHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
