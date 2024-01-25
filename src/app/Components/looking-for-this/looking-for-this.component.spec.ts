import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookingForThisComponent } from './looking-for-this.component';

describe('LookingForThisComponent', () => {
  let component: LookingForThisComponent;
  let fixture: ComponentFixture<LookingForThisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LookingForThisComponent]
    });
    fixture = TestBed.createComponent(LookingForThisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
