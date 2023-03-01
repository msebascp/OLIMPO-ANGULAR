import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordTrainerComponent } from './reset-password-trainer.component';

describe('ResetPasswordTrainerComponent', () => {
  let component: ResetPasswordTrainerComponent;
  let fixture: ComponentFixture<ResetPasswordTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordTrainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
