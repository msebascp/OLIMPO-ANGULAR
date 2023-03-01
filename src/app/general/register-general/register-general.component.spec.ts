import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterGeneralComponent } from './register-general.component';

describe('RegisterGeneralComponent', () => {
  let component: RegisterGeneralComponent;
  let fixture: ComponentFixture<RegisterGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
