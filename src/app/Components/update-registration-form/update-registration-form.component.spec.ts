import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRegistrationFormComponent } from './update-registration-form.component';

describe('UpdateRegistrationFormComponent', () => {
  let component: UpdateRegistrationFormComponent;
  let fixture: ComponentFixture<UpdateRegistrationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateRegistrationFormComponent]
    });
    fixture = TestBed.createComponent(UpdateRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
