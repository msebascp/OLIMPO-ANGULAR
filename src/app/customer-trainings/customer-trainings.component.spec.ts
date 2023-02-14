import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTrainingsComponent } from './customer-trainings.component';

describe('CustomerTrainingsComponent', () => {
  let component: CustomerTrainingsComponent;
  let fixture: ComponentFixture<CustomerTrainingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerTrainingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
