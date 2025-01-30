import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginNavbarStaffComponent } from './login-navbar-staff.component';

describe('LoginNavbarStaffComponent', () => {
  let component: LoginNavbarStaffComponent;
  let fixture: ComponentFixture<LoginNavbarStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginNavbarStaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginNavbarStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
