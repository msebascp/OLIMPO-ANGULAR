import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditTrainingsComponent } from './admin-edit-trainings.component';

describe('AdminEditTrainingsComponent', () => {
  let component: AdminEditTrainingsComponent;
  let fixture: ComponentFixture<AdminEditTrainingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditTrainingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
