import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordTrainerComponent } from './forgot-password-trainer.component';

describe('ForgotPasswordTrainerComponent', () => {
  let component: ForgotPasswordTrainerComponent;
  let fixture: ComponentFixture<ForgotPasswordTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordTrainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
